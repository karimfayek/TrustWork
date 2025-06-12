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
       Schema::create('projects', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->text('description')->nullable();
    $table->date('start_date');
    $table->date('end_date')->nullable();
    $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
    $table->timestamps();
});
Schema::create('project_user', function (Blueprint $table) {
    echo "Creating pivot table 'project_user'\n";
    $table->id();
    $table->foreignId('project_id')->constrained()->onDelete('cascade');
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
