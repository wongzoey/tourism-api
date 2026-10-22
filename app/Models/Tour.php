<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Tour extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * Mass-assignable attributes.
     */
    protected $fillable = [
        'title',
        'slug',
        'summary',
        'description',
        'destination',
        'region',
        'duration_days',
        'duration_nights',
        'max_group_size',
        'price',
        'currency',
        'itinerary',
        'inclusions',
        'exclusions',
        'featured_image',
        'gallery',
        'is_featured',
        'is_active',
    ];

    /**
     * Attribute casting (Modern Laravel cast method).
     */
    protected function casts(): array
    {
        return [
            'duration_days'   => 'integer',
            'duration_nights' => 'integer',
            'max_group_size'  => 'integer',
            'price'           => 'decimal:2',
            'itinerary'       => 'array',
            'inclusions'      => 'array',
            'exclusions'      => 'array',
            'gallery'         => 'array',
            'is_featured'     => 'boolean',
            'is_active'       => 'boolean',
        ];
    }

    /**
     * Automatically generate a unique slug when creating a tour.
     */
    protected static function booted(): void
    {
        static::creating(function (Tour $tour) {
            if (empty($tour->slug)) {
                $tour->slug = Str::slug($tour->title) . '-' . Str::random(5);
            }
        });
    }

    /* =========================================================================
       Scopes (Query Filters)
       ========================================================================= */

    /**
     * Scope to retrieve only active tours.
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to filter by destination (e.g. Langkawi, Penang).
     */
    public function scopeDestination(Builder $query, string $destination): Builder
    {
        return $query->where('destination', 'LIKE', "%{$destination}%");
    }

    /**
     * Scope for featured tours to showcase on the landing page.
     */
    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('is_featured', true);
    }

    /* =========================================================================
       Accessors
       ========================================================================= */

    /**
     * Formats duration into a readable format (e.g., "3 Days 2 Nights").
     */
    protected function formattedDuration(): Attribute
    {
        return Attribute::make(
            get: fn () => sprintf(
                '%d %s %d %s',
                $this->duration_days,
                Str::plural('Day', $this->duration_days),
                $this->duration_nights,
                Str::plural('Night', $this->duration_nights)
            )
        );
    }

    /**
     * Formats price with currency prefix (e.g., "RM 1,250.00").
     */
    protected function formattedPrice(): Attribute
    {
        return Attribute::make(
            get: fn () => sprintf(
                '%s %s',
                $this->currency === 'MYR' ? 'RM' : $this->currency,
                number_format($this->price, 2)
            )
        );
    }

    public function getFormattedPriceAttribute()
    {
        return $this->currency . ' ' . number_format($this->price, 2);
    }

    public function getFormattedDurationAttribute()
    {
        if ($this->duration_nights == 0) {
            return $this->duration_days . ' Day Tour';
        }
        return $this->duration_days . ' Days, ' . $this->duration_nights . ' Nights';
    }
}