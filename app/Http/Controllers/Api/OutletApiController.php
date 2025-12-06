<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Outlet;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OutletApiController extends Controller
{
    public function nearest(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
        ]);

        $userLat = (float) $validated['latitude'];
        $userLon = (float) $validated['longitude'];

        $outlets = Outlet::with('brand')->get();

        if ($outlets->isEmpty()) {
            return response()->json([
                'message' => 'No outlets found.',
                'outlet' => null,
                'distance_km' => null,
            ], 404);
        }

        $nearestOutlet = null;
        $minDistance = PHP_FLOAT_MAX;

        foreach ($outlets as $outlet) {
            $distance = $outlet->distanceFrom($userLat, $userLon);
            if ($distance < $minDistance) {
                $minDistance = $distance;
                $nearestOutlet = $outlet;
            }
        }

        return response()->json([
            'outlet' => [
                'id' => $nearestOutlet->id,
                'name' => $nearestOutlet->name,
                'address' => $nearestOutlet->address,
                'latitude' => $nearestOutlet->latitude,
                'longitude' => $nearestOutlet->longitude,
                'phone' => $nearestOutlet->phone,
                'brand' => [
                    'id' => $nearestOutlet->brand->id,
                    'name' => $nearestOutlet->brand->name,
                ],
            ],
            'distance_km' => round($minDistance, 2),
        ]);
    }
}
