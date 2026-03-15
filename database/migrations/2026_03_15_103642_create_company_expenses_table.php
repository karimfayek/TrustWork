<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('company_expenses', function (Blueprint $table) {
            $table->id();

            $table->foreignId('category_id')
                ->constrained('expense_categories')
                ->cascadeOnDelete();

            $table->decimal('amount', 10, 2);

            $table->string('description')->nullable();

            $table->date('expense_date');

            $table->enum('payment_method', ['cash', 'bank', 'wallet', 'insta'])
                ->default('cash');

            $table->string('reference_no')->nullable();

            $table->foreignId('project_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            $table->foreignId('stored_by')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->string('file_path')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_expenses');
    }
};
