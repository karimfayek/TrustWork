<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            
            $table->foreignId('extraction_id')->nullable()->constrained()->onDelete('cascade'); // قد تكون مرتبطة بمستخلص
            $table->foreignId('project_id')->nullable()->constrained()->onDelete('cascade');    // أو بمشروع عام
            
            $table->string('invoice_number')->unique();
            $table->date('invoice_date')->nullable();

            $table->decimal('amount', 15, 2)->default(0);
            $table->decimal('tax', 15, 2)->default(0);
            $table->decimal('total_amount', 15, 2)->default(0); // amount + tax

            $table->text('notes')->nullable();

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('invoices');
    }
};
