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
        Schema::create('tours', function (Blueprint $table) {
            $table->id();
            
            // Tour Identification
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('summary')->nullable();
            $table->longText('description')->nullable();

            // Destination & Location
            // Indexed to ensure rapid search queries (e.g., Penang, Langkawi, Sabah)
            $table->string('destination')->index(); 
            $table->string('region')->nullable(); // e.g., 'Peninsular West Coast', 'Borneo'
            
            // Duration & Capacity
            $table->unsignedSmallInteger('duration_days')->default(1);
            $table->unsignedSmallInteger('duration_nights')->default(0);
            $table->unsignedSmallInteger('max_group_size')->nullable();

            // Pricing (Defaults to Malaysian Ringgit - MYR)
            $table->decimal('price', 10, 2);
            $table->char('currency', 3)->default('MYR');

            // Rich & Structured Itinerary (Stored as JSON in MySQL)
            $table->json('itinerary')->nullable();
            $table->json('inclusions')->nullable(); // e.g., ["Hotel", "Breakfast", "Guide"]
            $table->json('exclusions')->nullable();

            // Media
            $table->string('featured_image')->nullable();
            $table->json('gallery')->nullable();

            // Status flags
            $table->boolean('is_featured')->default(false)->index();
            $table->boolean('is_active')->default(true)->index();

            // Timestamps & Soft Deletes
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tours');
    }
};