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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->enum('name', [
                'president',
                'vice president',
                'secretary general',
                'vice secretary general',
                'financial secretary',
                'treasurer',
                'academic affairs officer',
                'public relation officer',
                'auditor 1',
                'auditor 2',
                'sports coordinator 1',
                'sports coordinator 2',
                'welfare officer',
                'general organizer',
            ]);
            $table->text('description');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
