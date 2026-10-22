<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    // Defines which fields can be mass-assigned when creating a new booking
    protected $fillable = [
        'tour_id',
        'customer_name',
        'customer_email',
        'travel_date',
        'total_price',
        'status'
    ];

    // Establishes the relationship: A booking belongs to a specific tour
    public function tour()
    {
        return $this->belongsTo(Tour::class);
    }
}