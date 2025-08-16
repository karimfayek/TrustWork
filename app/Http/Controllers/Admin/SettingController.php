<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Setting;

use Inertia\Inertia;
class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return [
            'advance_request_notify' => Setting::where('key', 'advance_request_notify')->value('value'),
            'visit_request_notify' => Setting::where('key', 'visit_request_notify')->value('value'),
            'loan_notify' => Setting::where('key', 'loan_notify')->value('value'),
            'pricing_notify' => Setting::where('key', 'pricing_notify')->value('value'),
            'att_notify' => Setting::where('key', 'att_notify')->value('value'),
            'leave_request_notify' => Setting::where('key', 'leave_request_notify')->value('value'),
        ];
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Setting::updateOrCreate(['key' => 'advance_request_notify'], [
            'value' => $request->advance_request_notify
        ]);

        Setting::updateOrCreate(['key' => 'visit_request_notify'], [
            'value' => $request->visit_request_notify
        ]);
        Setting::updateOrCreate(['key' => 'loan_notify'], [
            'value' => $request->loan_notify
        ]);
        Setting::updateOrCreate(['key' => 'pricing_notify'], [
            'value' => $request->pricing_notify
        ]);
        Setting::updateOrCreate(['key' => 'att_notify'], [
            'value' => $request->att_notify
        ]);
        Setting::updateOrCreate(['key' => 'leave_request_notify'], [
            'value' => $request->leave_request_notify
        ]);

        return response()->json(['message' => 'تم الحفظ بنجاح']);
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        return Inertia::render('Admin/Settings/Index', [
            'settings' => Setting::all(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
