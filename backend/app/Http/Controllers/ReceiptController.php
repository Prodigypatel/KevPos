<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade as PDF;
use App\Models\Order;

class ReceiptController extends Controller
{
    public function generateReceipt($orderId)
    {
        $order = Order::with('items')->findOrFail($orderId);
        $pdf = PDF::loadView('receipts.order', compact('order'));

        return $pdf->download("receipt_{$orderId}.pdf");
    }
}
