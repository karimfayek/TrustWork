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
        Schema::create('extraction_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('extraction_id')->constrained()->onDelete('cascade');            
            $table->string('title');
            $table->string('unit');
            $table->decimal('quantity', 10, 2);
            $table->decimal('previous_done', 10, 2);
            $table->decimal('current_done', 10, 2);
            $table->decimal('total_done', 10, 2);
            $table->decimal('unit_price', 15, 2);
            $table->decimal('progress_percentage', 5, 2);
            $table->decimal('total', 15, 2);
        
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
