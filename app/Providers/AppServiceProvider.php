<?php

namespace App\Providers;

use App\Models\Tour;
use App\Observers\TourObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        Tour::observe(TourObserver::class);
    }
}
