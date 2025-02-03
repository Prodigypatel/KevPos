<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->decimal('cost', 10, 2);
            $table->decimal('avg_cost', 10, 2)->nullable();
            $table->decimal('margin', 10, 2)->nullable();
            $table->string('category')->nullable();
            $table->string('supplier')->nullable();
            $table->string('size')->nullable();
            $table->integer('units_per_case')->nullable();
            $table->decimal('case_cost', 10, 2)->nullable();
            $table->string('barcode')->unique();
            $table->boolean('tax')->default(true);
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->integer('stock_quantity');
            $table->timestamps();

            $table->foreign('parent_id')->references('id')->on('products')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('products');
    }
};