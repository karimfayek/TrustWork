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
        Schema::create('extractions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->onDelete('cascade');

            $table->enum('type', ['partial_1', 'partial_2_3', 'final']);
            $table->date('date')->nullable();

            $table->decimal('total_before_deductions', 15, 2)->default(0);
            $table->decimal('total_deductions', 15, 2)->default(0);
            $table->decimal('previous_payments', 15, 2)->default(0);
            $table->decimal('net_total', 15, 2)->default(0);

            $table->json('deductions_json')->nullable(); // كل الخصومات بنسبها أو قيمها
            $table->text('notes')->nullable();

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('extractions');
    }
};
