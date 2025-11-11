<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\StockMovement;
use App\Models\WarehouseProduct;

class StockMovementController extends Controller
{
    public function storeIn(Request $request)
    {
        $data = $request->validate([
            'warehouse_id' => 'required|exists:warehouses,id',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|numeric|min:0.0001',
            'items.*.note' => 'nullable|string',
            'items.*.supplier_id' => 'nullable|exists:suppliers,id',
        ]);

        DB::beginTransaction();
        try {
            $warehouseId = $data['warehouse_id'];

            foreach ($data['items'] as $it) {
                // create movement
                StockMovement::create([
                    'warehouse_id' => $warehouseId,
                    'product_id' => $it['product_id'],
                    'type' => 'in',
                    'quantity' => $it['quantity'],
                    'supplier_id' => $it['supplier_id'] ?? null,
                    'note' => $it['note'] ?? null,
                ]);

                // update pivot atomically
                WarehouseProduct::updateOrCreate(
                    ['warehouse_id' => $warehouseId, 'product_id' => $it['product_id']],
                    ['quantity' => DB::raw("COALESCE(quantity,0) + {$it['quantity']}")]
                );
            }

            DB::commit();
            return response()->json(['message' => 'تم التوريد بنجاح']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'فشل في تسجيل التوريد: ' . $e->getMessage()], 500);
        }
    }
   public function batchQty(Request $request)
    {
        $warehouseId = $request->query('warehouse_id');
        $productIds = array_filter(explode(',', $request->query('product_ids','')));

        if (!$warehouseId || empty($productIds)) {
            return response()->json(['message' => 'warehouse_id and product_ids required'], 400);
        }

        $rows = WarehouseProduct::where('warehouse_id', $warehouseId)
            ->whereIn('product_id', $productIds)
            ->get()
            ->keyBy('product_id');

        $result = [];
        foreach ($productIds as $pid) {
            $result[(int)$pid] = isset($rows[$pid]) ? (float)$rows[$pid]->quantity : 0.0;
        }

        return response()->json(['quantities' => $result]);
    }
    // صرف بضاعة (out) — مرتبط بمشروع اختياري
    public function storeOut(Request $request)
    {
         $data = $request->validate([
            'warehouse_id' => 'required|exists:warehouses,id',
            'project_id'   => 'nullable|exists:projects,id', // مشروع دفعة (اختياري)
            'items'        => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity'   => 'required|numeric|min:0.0001',
            'items.*.project_id' => 'nullable|exists:projects,id', // optional per-line override
            'items.*.note'       => 'nullable|string',
        ]);

        $warehouseId = $data['warehouse_id'];
        $batchProjectId = $data['project_id'] ?? null;

        // اجمع الكميات لكل منتج لو ظهر مكرر في الدفعة
        $required = []; // product_id => totalQty
        foreach ($data['items'] as $it) {
            $pid = (int)$it['product_id'];
            $qty = (float)$it['quantity'];
            if (!isset($required[$pid])) $required[$pid] = 0;
            $required[$pid] += $qty;
        }

        DB::beginTransaction();
        try {
            $productIds = array_keys($required);

            // قفل صفوف ال pivot حتى لا يحدث تغيير متزامن
            $pivots = WarehouseProduct::where('warehouse_id', $warehouseId)
                ->whereIn('product_id', $productIds)
                ->lockForUpdate()
                ->get()
                ->keyBy('product_id');

            // تحقق الكميات المطلوبة مقابل المتاح
            $insufficient = [];
            foreach ($required as $pid => $reqQty) {
                $available = $pivots->has($pid) ? (float)$pivots[$pid]->quantity : 0.0;
                if ($available < $reqQty) {
                    $product = Product::find($pid);
                    $insufficient[] = [
                        'product_id' => $pid,
                        'product_name' => $product ? $product->name : null,
                        'required' => $reqQty,
                        'available' => $available,
                    ];
                }
            }

            if (!empty($insufficient)) {
                DB::rollBack();
                return response()->json([
                    'message' => 'كمية غير كافية لبعض الأصناف',
                    'insufficient' => $insufficient
                ], 422);
            }

            // كل شيء جاهز — نسجل الحركات وسننقص الرصيد
            foreach ($data['items'] as $it) {
                $pid = (int)$it['product_id'];
                $qty = (float)$it['quantity'];
                $lineProject = $it['project_id'] ?? $batchProjectId ?? null;
                $note = $it['note'] ?? null;

                StockMovement::create([
                    'warehouse_id' => $warehouseId,
                    'product_id'   => $pid,
                    'type'         => 'out',
                    'quantity'     => $qty,
                    'project_id'   => $lineProject,
                    'note'         => $note,
                ]);

                // ننقص من pivot
                WarehouseProduct::updateOrCreate(
                    ['warehouse_id' => $warehouseId, 'product_id' => $pid],
                    ['quantity' => DB::raw("quantity - {$qty}")]
                );
            }

            DB::commit();
            return response()->json(['message' => 'تم صرف الأصناف بنجاح']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'فشل في عملية الصرف: '.$e->getMessage()], 500);
        }
    }
   

    // جلب الرصيد الحالي لصنف معين في مخزن
    public function getStock($warehouseId, $productId)
    {
        $pivot = WarehouseProduct::where('warehouse_id',$warehouseId)
            ->where('product_id',$productId)
            ->first();

        return response()->json(['quantity' => $pivot ? (float)$pivot->quantity : 0]);
    }
}
