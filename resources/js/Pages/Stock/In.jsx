import React, { useState, useEffect, useRef } from 'react';
import { Head, usePage } from '@inertiajs/react';

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
export default function StockInMulti({ warehouses = [], suppliers = [] }) {
  const [warehouseId, setWarehouseId] = useState(warehouses[0]?.id || '');
  const [lines, setLines] = useState([emptyLine()]);
  const [suggestions, setSuggestions] = useState({}); // productId -> suggestions array
  const [loading, setLoading] = useState(false);
  const debounceRefs = useRef({});

  function emptyLine() {
    return { id: Date.now() + Math.random(), product: null, query: '', quantity: '', supplier_id: '', note: '' };
  }

  // handlers
  function addLine() { setLines(l => [...l, emptyLine()]); }
  function removeLine(id) { setLines(l => l.filter(x => x.id !== id)); }

  function updateLine(id, patch) {
    setLines(prev => prev.map(r => r.id === id ? { ...r, ...patch } : r));
  }

  // search per line (debounced)
  function searchProducts(lineId, q) {
    if (!q || q.length < 1) { setSuggestions(s => ({ ...s, [lineId]: [] })); return; }
    if (debounceRefs.current[lineId]) clearTimeout(debounceRefs.current[lineId]);
    debounceRefs.current[lineId] = setTimeout(() => {
      fetch(`/api/products/search?q=${encodeURIComponent(q)}`)
        .then(r => r.json())
        .then(json => setSuggestions(s => ({ ...s, [lineId]: json })))
        .catch(() => setSuggestions(s => ({ ...s, [lineId]: [] })));
    }, 250);
  }

  // pick product for line
  function pickProduct(lineId, p) {
    updateLine(lineId, { product: p, query: `${p.name} (${p.code})` });
    setSuggestions(s => ({ ...s, [lineId]: [] }));
  }

  // fetch current qty for a product in selected warehouse (optional helper)
  function fetchCurrentQty(productId, onResult) {
    if (!warehouseId || !productId) return onResult(0);
    fetch(`/api/stock/${warehouseId}/${productId}`)
      .then(r => r.json())
      .then(j => onResult(Number(j.quantity || 0)))
      .catch(() => onResult(0));
  }

  // submit batch
  async function submit(e) {
    e.preventDefault();
    // validate
    const payloadLines = lines
      .map(l => ({ product_id: l.product?.id || null, quantity: parseFloat(l.quantity || 0), note: l.note || null, supplier_id: l.supplier_id || null }))
      .filter(l => l.product_id && l.quantity && l.quantity > 0);

    if (!warehouseId) return alert('اختر مخزن');
    if (payloadLines.length === 0) return alert('أضف صنف واحد على الأقل وادخل كمية صحيحة');

    setLoading(true);
    try {
      const res = await fetch('/stock/in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content },
        body: JSON.stringify({ warehouse_id: warehouseId, items: payloadLines })
      });

      if (!res.ok) {
        const text = await res.text();
        let msg = text;
        try { const j = JSON.parse(text); msg = j.message || JSON.stringify(j); } catch (e){}
        throw new Error(msg || 'فشل في عملية التوريد');
      }

      // success: reset lines
      alert('تم إضافة الأصناف إلى المخزن بنجاح');
      setLines([emptyLine()]);
    } catch (err) {
      alert('خطأ: ' + (err.message || 'فشل غير معروف'));
    } finally { setLoading(false); }
  }

  return (
    
        <AuthenticatedLayout>
    <div className="max-w-4xl mx-auto p-6">
      <Head title="توريد — إضافة عدة أصناف" />
      <h1 className="text-2xl font-semibold mb-4">توريد — إضافة عدة أصناف للمخزن</h1>

      <div className="mb-4">
        <label className="block text-sm mb-1">المخزن</label>
        <select value={warehouseId} onChange={e => setWarehouseId(e.target.value)} className="w-full border rounded px-3 py-2 bg-white">
          {warehouses.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
        </select>
      </div>

      <form onSubmit={submit} className="space-y-4">
        {lines.map((line, idx) => (
          <div key={line.id} className="grid grid-cols-12 gap-3 items-end bg-white p-3 border rounded">
            <div className="col-span-5 relative">
              <label className="text-xs text-gray-600">المنتج</label>
              <input
                value={line.query}
                onChange={(e) => { updateLine(line.id, { query: e.target.value, product: null }); searchProducts(line.id, e.target.value); }}
                placeholder="ابحث بالاسم أو الكود أو الصق الباركود"
                className="w-full border rounded px-3 py-2"
              />
              {suggestions[line.id]?.length > 0 && (
                <ul className="absolute left-0 right-0 mt-1 border rounded bg-white max-h-48 overflow-auto z-40 shadow">
                  {suggestions[line.id].map(p => (
                    <li key={p.id} onClick={() => pickProduct(line.id, p)} className="p-2 hover:bg-gray-100 cursor-pointer">
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-gray-600">{p.code} — {p.unit}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="col-span-2">
              <label className="text-xs text-gray-600">الكمية</label>
              <input type="number" step="0.0001" value={line.quantity} onChange={e => updateLine(line.id, { quantity: e.target.value })} className="w-full border rounded px-3 py-2" />
            </div>

        

            <div className="col-span-1">
              <label className="text-xs text-gray-600">إظهار</label>
              <button type="button" onClick={() => {
                if (!line.product) return alert('اختر منتج أولا');
                fetchCurrentQty(line.product.id, (q) => alert(`الرصيد الحالي في المخزن: ${q}`));
              }} className="w-full border rounded px-2 py-2">رصيد</button>
            </div>

            <div className="col-span-2 flex justify-end gap-1">
              <button type="button" onClick={() => removeLine(line.id)} className="text-red-600">حذف</button>
              {idx === lines.length - 1 && <button type="button" onClick={addLine} className="text-blue-600">إضافة سطر</button>}
            </div>

            <div className="col-span-12 mt-2">
              <label className="text-xs text-gray-600">ملاحظة (اختياري)</label>
              <input value={line.note} onChange={e => updateLine(line.id, { note: e.target.value })} className="w-full border rounded px-3 py-2" />
            </div>
          </div>
        ))}

        <div className="flex gap-3">
          <button disabled={loading} type="submit" className="px-4 py-2 bg-green-600 text-white rounded">{loading ? 'جاري الحفظ...' : 'سجل التوريد'}</button>
          <button type="button" onClick={() => setLines([emptyLine()])} className="px-3 py-2 border rounded">إفراغ</button>
        </div>
      </form>

      
    </div>
    </AuthenticatedLayout>
  );
}
