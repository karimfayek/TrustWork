<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Warehouse;
use App\Models\Product;
use App\Models\WarehouseProduct;
use App\Models\StockMovement;
use Illuminate\Support\Facades\DB;

class StockController extends Controller
{
    public function in()
        {

        $warehouses = Warehouse::select('id','name')->get();
      
        $projects = DB::table('projects')->select('id','name')->get();
 // dd($projects);

        return Inertia::render('Stock/In', [
        'warehouses' => $warehouses,
        'projects' => $projects,
        ]);
        }
          public function out()
        {

        $warehouses = Warehouse::select('id','name')->get();
      
        $projects = DB::table('projects')->select('id','name')->get();
 // dd($projects);

        return Inertia::render('Stock/Out', [
        'warehouses' => $warehouses,
        'projects' => $projects,
        ]);
        }


// search products by name/code/barcode
public function searchProducts(Request $request)
{
$q = $request->get('q','');


$products = Product::where('name', 'like', "%{$q}%")
->orWhere('code', 'like', "%{$q}%")
->limit(20)
->get(['id','name','code','unit']);


return response()->json($products);
}


// return current stock for product in warehouse (from pivot)
public function getStock($warehouseId, $productId)
{
$pivot = WarehouseProduct::where('warehouse_id',$warehouseId)
->where('product_id',$productId)
->first();

$qty = $pivot ? (float)$pivot->quantity  : 0.0;


return response()->json(['quantity' => $qty]);
}


// list recent movements (for the table)
    public function movements(Request $request)
    {
    $perPage = min(50, (int)$request->get('per_page', 15));


    $query = StockMovement::with(['product:id,name,code','warehouse:id,name','project:id,name'])
    ->orderBy('created_at','desc');


    if ($request->filled('warehouse_id')) {
    }
    }
}
