<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
    $table->string('name');
    $table->string('unit'); // مثال: كيلو، علبة، قطعة
    $table->decimal('quantity', 10, 2)->default(0); // كميات عشرية
    $table->decimal('alert_quantity', 10, 2)->nullable(); // للتنبيه في حال قربت تخلص
    $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};
