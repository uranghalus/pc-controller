<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ESPController extends Controller
{
    //
    public function trigerPC($action)
    {
        $device = Setting::first();

        if (!$device) {
            return response()->json(['error' => 'IP Arduino tidak ditemukan'], 400);
        }

        $arduinoIp = $device->ip_controller;

        $endpoint = match ($action) {
            'power_on' => "http://$arduinoIp/power_on",
            'power_off' => "http://$arduinoIp/power_off",
            'restart' => "http://$arduinoIp/restart",
            default => null,
        };

        if (!$endpoint) {
            return response()->json(['error' => 'Aksi tidak valid'], 400);
        }

        $response = Http::get($endpoint);

        return response()->json(['status' => $response->body()]);
    }
}
