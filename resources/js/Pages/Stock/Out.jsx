import React, { useState, useEffect, useRef } from 'react';
import { Head } from '@inertiajs/react';

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
export default function StockOutMulti({ warehouses = [], projects = [] }) {
  const [warehouseId, setWarehouseId] = useState(warehouses[0]?.id || '');
  const [batchProjectId, setBatchProjectId] = useState('');
  const [lines, setLines] = useState([emptyLine()]);
  const [suggestions, setSuggestions] = useState({});
  const [quantitiesCache, setQuantitiesCache] = useState({}); // productId => qty
  const [loading, setLoading] = useState(false);
  const debounceRefs = useRef({});

  function emptyLine() {
    return { id: Date.now() + Math.random(), product: null, query: '', quantity: '', project_id: '', note: '', available: null, localError: null };
  }

  // add/remove/update
  function addLine() { setLines(l => [...l, emptyLine()]); }
  function removeLine(id) { setLines(l => l.filter(x => x.id !== id)); }
  function updateLine(id, patch) { setLines(prev => prev.map(r => r.id === id ? {...r, ...patch} : r)); }

  // debounce search per-line
  function searchProducts(lineId, q) {
    if (!q || q.length < 1) { setSuggestions(s => ({ ...s, [lineId]: [] })); return; }
    if (debounceRefs.current[lineId]) clearTimeout(debounceRefs.current[lineId]);
    debounceRefs.current[lineId] = setTimeout(() => {
      fetch(`/api/products/search?q=${encodeURIComponent(q)}`)
        .then(r => r.json())
        .then(json => setSuggestions(s => ({ ...s, [lineId]: json })))
        .catch(() => setSuggestions(s => ({ ...s, [lineId]: [] })));
    }, 200);
  }

  function pickProduct(lineId, p) {
    updateLine(lineId, { product: p, query: `${p.name} (${p.code})`, available: null, localError: null });
    setSuggestions(s => ({ ...s, [lineId]: [] }));
  }

  // when warehouse changes or products selected, fetch quantities for all selected product ids
  useEffect(() => {
    const productIds = lines.map(l => l.product?.id).filter(Boolean);
    if (!warehouseId || productIds.length === 0) {
      // clear availabilities
      setLines(prev => prev.map(l => ({ ...l, available: l.product ? 0 : null, localError: null })));
      setQuantitiesCache({});
      return;
    }

    // only unique ids
    const uniq = [...new Set(productIds)];
    fetch(`/api/stock/batch-qty?warehouse_id=${warehouseId}&product_ids=${uniq.join(',')}`)
      .then(r => r.json())
      .then(json => {
        const qmap = json.quantities || {};
        setQuantitiesCache(qmap);
        // update lines availabilities and local errors
        setLines(prev => prev.map(l => {
          if (!l.product) return { ...l, available: null, localError: null };
          const av = qmap[l.product.id] ?? 0;
          const qtyNum = parseFloat(l.quantity || 0);
          const err = qtyNum > av ? `المطلوب (${qtyNum}) أكبر من المتاح (${av})` : null;
          return { ...l, available: av, localError: err };
        }));
      })
      .catch(() => {
        // ignore failures: set avail to 0
        setQuantitiesCache({});
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [warehouseId, lines.map(l => l.product?.id).join(',')]);

  // when user edits a quantity, check against cached available
  function onQuantityChange(lineId, val) {
    updateLine(lineId, { quantity: val });
    const line = lines.find(l => l.id === lineId);
    const pid = line?.product?.id;
    const av = pid ? (quantitiesCache[pid] ?? 0) : null;
    const n = parseFloat(val || 0);
    const err = (av !== null && n > av) ? `المطلوب (${n}) أكبر من المتاح (${av})` : null;
    updateLine(lineId, { localError: err });
  }

  // helper: verify all lines OK before submit
  function validateBeforeSubmit() {
    const payload = lines.map(l => ({ product: l.product, qty: parseFloat(l.quantity || 0) }))
      .filter(x => x.product); // only lines with product selected

    if (payload.length === 0) { alert('أضف صنف واحد على الأقل مع كمية صحيحة'); return false; }
    for (const l of lines) {
      if (!l.product) { alert('هناك سطر بدون منتج'); return false; }
      const n = parseFloat(l.quantity || 0);
      if (!n || n <= 0) { alert('تأكد من إدخال كمية صحيحة أكبر من صفر لكل سطر'); return false; }
      const av = quantitiesCache[l.product.id] ?? 0;
      if (n > av) {
        alert(`الكمية المطلوبة للمنتج ${l.product.name} أكبر من المتاح (${av})`); 
        return false;
      }
    }
    return true;
  }

  // submit batch out
  async function submit(e) {
    e.preventDefault();
    if (!warehouseId) return alert('اختر مخزن');
    if (!validateBeforeSubmit()) return;

    // prepare payload: allow per-line project override; if not set use batchProjectId
    const items = lines.map(l => ({
      product_id: l.product.id,
      quantity: parseFloat(l.quantity),
      project_id: l.project_id || null,
      note: l.note || null,
    }));

    setLoading(true);
    try {
      const res = await fetch('/stock/out', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '' },
        body: JSON.stringify({ warehouse_id: warehouseId, project_id: batchProjectId || null, items })
      });

      if (res.status === 422) {
        const j = await res.json();
        if (j.insufficient) {
          // show detailed insufficients
          const msg = j.insufficient.map(x => `${x.product_name ?? 'id:'+x.product_id} — المطلوب: ${x.required} — المتاح: ${x.available}`).join('\\n');
          alert('فشل الصرف — الكميات غير كافية:\\n' + msg);
        } else {
          alert('فشل في عملية الصرف: ' + (j.message || 'خطأ غير معروف'));
        }
        setLoading(false);
        return;
      }

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || 'خطأ من السيرفر');
      }

      alert('تم صرف الأصناف بنجاح');
      setLines([emptyLine()]);
      setQuantitiesCache({});
    } catch (err) {
      alert('خطأ: ' + (err.message || 'فشل الاتصال'));
    } finally {
      setLoading(false);
    }
  }

  // helper pick product for line
  function pickProduct(lineId, p) {
    updateLine(lineId, { product: p, query: `${p.name} (${p.code})`, available: null, localError: null });
    setSuggestions(s => ({ ...s, [lineId]: [] }));
    // fetch updated batch qty for this product (will be handled by useEffect because product id changed)
  }

  // UI
  return (
    
        <AuthenticatedLayout> 
    <div className="max-w-5xl mx-auto p-6">
      <Head title="صرف  — مخزن" />
      <h1 className="text-2xl font-semibold mb-4">صرف  — إخراج عدة أصناف من مخزن</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm mb-1">المخزن</label>
          <select value={warehouseId} onChange={e => setWarehouseId(e.target.value)} className="w-full border rounded px-3 py-2 bg-white">
            {warehouses.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm mb-1">مشروع ال (اختياري)</label>
          <select value={batchProjectId} onChange={e => setBatchProjectId(e.target.value)} className="w-full border rounded px-3 py-2 bg-white">
            <option value="">— لا يوجد —</option>
            {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
           </div>
      </div>

      <form onSubmit={submit} className="space-y-4">
        {lines.map((line, idx) => (
          <div key={line.id} className="grid grid-cols-12 gap-3 items-start bg-white p-3 border rounded">
            <div className="col-span-5 relative">
              <label className="text-xs text-gray-600">المنتج</label>
              <input value={line.query} onChange={e => { updateLine(line.id, { query: e.target.value, product: null }); searchProducts(line.id, e.target.value); }} placeholder="ابحث بالاسم أو الكود" className="w-full border rounded px-3 py-2" />
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
              <input type="number" step="0.0001" value={line.quantity} onChange={e => onQuantityChange(line.id, e.target.value)} className="w-full border rounded px-3 py-2" />
            </div>

          

            <div className="col-span-1">
              <label className="text-xs text-gray-600">الرصيد</label>
              <div className="mt-1 text-sm">{line.product ? (line.available ?? (quantitiesCache[line.product.id] ?? '...')) : '-'}</div>
            </div>

            <div className="col-span-1 flex justify-end gap-1">
              <button type="button" onClick={() => removeLine(line.id)} className="text-red-600">حذف</button>
              {idx === lines.length - 1 && <button type="button" onClick={addLine} className="text-blue-600">إضافة سطر</button>}
            </div>

            <div className="col-span-12 mt-2">
              <label className="text-xs text-gray-600">ملاحظة (اختياري)</label>
              <input value={line.note} onChange={e => updateLine(line.id, { note: e.target.value })} className="w-full border rounded px-3 py-2" />
              {line.localError && <div className="text-sm text-red-600 mt-1">{line.localError}</div>}
            </div>
          </div>
        ))}

        <div className="flex gap-3">
          <button disabled={loading} type="submit" className="px-4 py-2 bg-red-600 text-white rounded">{loading ? 'جاري التنفيذ...' : 'سجل الصرف'}</button>
          <button type="button" onClick={() => setLines([emptyLine()])} className="px-3 py-2 border rounded">إفراغ</button>
        </div>
      </form>
    </div>
    
       </AuthenticatedLayout>
  );
}
