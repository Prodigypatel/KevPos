<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        return response()->json(Product::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'price' => 'required|numeric',
            'cost' => 'required|numeric',
            'units_per_case' => 'nullable|integer',
            'case_cost' => 'nullable|numeric',
            'barcode' => 'required|unique:products',
        ]);
        
        if ($request->units_per_case && $request->cost) {
            $validated['case_cost'] = $request->units_per_case * $request->cost;
        }

        $product = Product::create($validated);
        return response()->json($product, 201);
    }

    public function show($id)
    {
        return response()->json(Product::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'required',
            'price' => 'required|numeric',
            'cost' => 'required|numeric',
            'units_per_case' => 'nullable|integer',
            'case_cost' => 'nullable|numeric',
            'barcode' => 'required|unique:products,barcode,' . $id,
        ]);

        if ($request->units_per_case && $request->cost) {
            $validated['case_cost'] = $request->units_per_case * $request->cost;
        }

        $product->update($validated);
        return response()->json($product);
    }

    public function destroy($id)
    {
        Product::destroy($id);
        return response()->json(['message' => 'Product deleted successfully']);
    }
}