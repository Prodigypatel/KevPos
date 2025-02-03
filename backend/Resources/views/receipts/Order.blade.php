<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Receipt</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; }
        table { width: 100%; margin-top: 20px; border-collapse: collapse; }
        th, td { padding: 10px; border: 1px solid black; }
    </style>
</head>
<body>
    <h2>Receipt for Order #{{ $order->id }}</h2>
    <p>Customer: {{ $order->customer_name }}</p>
    <p>Total Price: ${{ number_format($order->total_price, 2) }}</p>

    <table>
        <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
        </tr>
        @foreach ($order->items as $item)
        <tr>
            <td>{{ $item->product->name }}</td>
            <td>{{ $item->quantity }}</td>
            <td>${{ number_format($item->price, 2) }}</td>
        </tr>
        @endforeach
    </table>

    <p>Thank you for your purchase!</p>
</body>
</html>
