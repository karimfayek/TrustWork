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
        Schema::create('rewards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // الموظف المستحق
            $table->date('reward_date'); // تاريخ المكافأة
            $table->string('type'); // نوع المكافأة (مثلاً: 'حضور مبكر', 'انتظام')
            $table->text('reason')->nullable(); // سبب/تفاصيل المكافأة
            $table->integer('points')->default(0); // نقاط المكافأة
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rewards');
    }
};
