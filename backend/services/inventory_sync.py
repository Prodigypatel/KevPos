import psycopg2
import time

# Database connection setup
def connect_db():
    return psycopg2.connect(
        dbname="wallacepos",
        user="postgres",
        password="yourpassword",
        host="localhost",
        port="5432"
    )

# Function to update inventory levels
def update_inventory(product_id, quantity_sold):
    conn = connect_db()
    cur = conn.cursor()
    cur.execute("UPDATE products SET stock_quantity = stock_quantity - %s WHERE id = %s", (quantity_sold, product_id))
    conn.commit()
    cur.close()
    conn.close()

# Real-time sync listener
def listen_for_sales():
    conn = connect_db()
    cur = conn.cursor()
    cur.execute("LISTEN sales_update;")  # PostgreSQL trigger
    print("Listening for inventory updates...")

    while True:
        conn.poll()
        while conn.notifies:
            notify = conn.notifies.pop()
            product_id, quantity_sold = map(int, notify.payload.split(","))
            update_inventory(product_id, quantity_sold)
            print(f"Updated inventory for Product ID: {product_id}")

if __name__ == "__main__":
    listen_for_sales()
