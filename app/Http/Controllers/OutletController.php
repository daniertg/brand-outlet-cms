<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Outlet;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OutletController extends Controller
{
    public function index(): Response
    {
        $outlets = Outlet::with('brand')->latest()->paginate(10);

        return Inertia::render('outlets/index', [
            'outlets' => $outlets,
        ]);
    }

    public function create(): Response
    {
        $brands = Brand::all(['id', 'name']);

        return Inertia::render('outlets/create', [
            'brands' => $brands,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'brand_id' => 'required|exists:brands,id',
            'name' => 'required|string|max:255',
            'address' => 'nullable|string',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
            'phone' => 'nullable|string|max:50',
        ]);

        Outlet::create($validated);

        return redirect()->route('outlets.index')->with('success', 'Outlet created successfully.');
    }

    public function edit(Outlet $outlet): Response
    {
        $brands = Brand::all(['id', 'name']);

        return Inertia::render('outlets/edit', [
            'outlet' => $outlet->load('brand'),
            'brands' => $brands,
        ]);
    }

    public function update(Request $request, Outlet $outlet): RedirectResponse
    {
        $validated = $request->validate([
            'brand_id' => 'required|exists:brands,id',
            'name' => 'required|string|max:255',
            'address' => 'nullable|string',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
            'phone' => 'nullable|string|max:50',
        ]);

        $outlet->update($validated);

        return redirect()->route('outlets.index')->with('success', 'Outlet updated successfully.');
    }

    public function destroy(Outlet $outlet): RedirectResponse
    {
        $outlet->delete();

        return redirect()->route('outlets.index')->with('success', 'Outlet deleted successfully.');
    }
}
