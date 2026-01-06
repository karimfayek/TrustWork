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
       Schema::create('salaries', function (Blueprint $table) {
    echo "Creating 'salaries' table\n";
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->string('month');
    $table->decimal('base_salary', 10, 2);
    $table->integer('task_score_percentage');
    $table->integer('attendance_score_percentage');
    $table->decimal('final_salary', 10, 2);
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('salaries');
    }
};
