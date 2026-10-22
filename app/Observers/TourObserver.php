<?php

namespace App\Observers;

use App\Models\Tour;
use Illuminate\Support\Facades\Cache;

class TourObserver
{
    /**
     * Clear the Redis cache when a tour is modified or created.
     */
    public function saved(Tour $tour): void
    {
        Cache::tags(['destinations'])->flush();
    }

    /**
     * Clear the Redis cache when a tour is deleted.
     */
    public function deleted(Tour $tour): void
    {
        Cache::tags(['destinations'])->flush();
    }
}