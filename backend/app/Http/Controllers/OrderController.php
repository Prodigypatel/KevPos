<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Product;

class OrderController extends Controller
{
    public function index()
    {
        return response()->json(Order::with('items')->get());
    }

public function updateStatus(Request $request, $id)
{
    $validated = $request->validate([
        'status' => 'required|in:Pending,Completed,Canceled',
    ]);

    $order = Order::findOrFail($id);
    $order->update(['status' => $validated['status']]);

    return response()->json(['message' => 'Order status updated successfully']);
}


    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string',
            'total_price' => 'required|numeric',
            'items' => 'required|array',
        ]);

        $order = Order::create([
            'customer_name' => $validated['customer_name'],
            'total_price' => $validated['total_price'],
        ]);

        foreach ($validated['items'] as $item) {
            $order->items()->create([
                'product_id' => $item['id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
            ]);

            // Deduct stock
            Product::where('id', $item['id'])->decrement('stock_quantity', $item['quantity']);
        }

        return response()->json(['message' => 'Order placed successfully', 'order_id' => $order->id], 201);
    }
}
