<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setting;
use Inertia\Inertia;

class SettingController extends Controller
{
    //
    public function index()
    {
        $setting = Setting::first(); // Ambil data pertama
        return Inertia::render('Settings/Index', ['setting' => $setting]);
    }
    public function storeOrUpdate(Request $request)
    {
        // Validasi input data
        $request->validate([
            'ip_controller' => 'required|ip|unique:settings,ip_controller,' . $request->id,
            'name' => 'nullable|string',
            'status' => 'nullable|string',
        ]);

        // Cek jika pengaturan sudah ada
        $setting = Setting::first();

        // Jika pengaturan ada, lakukan update
        if ($setting) {
            $setting->update([
                'ip_controller' => $request->ip_controller,
                'name' => $request->name,
                'status' => $request->status,
            ]);
            return redirect()->back()->with('success', 'Pengaturan berhasil diperbarui.');
        } else {
            // Jika pengaturan belum ada, buat pengaturan baru
            Setting::create([
                'ip_controller' => $request->ip_controller,
                'name' => $request->name,
                'status' => $request->status,
            ]);
            return redirect()->back()->with('success', 'Pengaturan berhasil disimpan.');
        }
    }
}
