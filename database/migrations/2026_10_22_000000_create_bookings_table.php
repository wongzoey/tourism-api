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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('booking_reference')->unique();
            $table->foreignId('tour_id')->constrained()->cascadeOnDelete();
            
            $table->string('customer_name');
            $table->string('customer_email');
            $table->string('customer_phone');
            
            $table->date('start_date')->index();
            $table->date('end_date')->index();
            $table->unsignedSmallInteger('guests_count');
            
            $table->decimal('unit_price', 10, 2);
            $table->decimal('total_price', 10, 2);
            $table->char('currency', 3)->default('MYR');
            
            $table->enum('status', ['pending_payment', 'confirmed', 'cancelled'])->default('confirmed')->index();
            $table->text('special_notes')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};