<?php

namespace App\Models;

use App\Mail\BookingConfirmed;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class Booking extends Model
{
    use HasFactory;

    // Defines which fields can be mass-assigned when creating a new booking
    protected $fillable = [
        'tour_id',
        'customer_name',
        'customer_email',
        'start_date',
        'total_price',
        'status'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($booking) {
            // Generate unique reference
            if (empty($booking->booking_reference)) {
                $booking->booking_reference = 'BKG-' . strtoupper(Str::random(8));
            }
            
            // Auto-fill missing required database fields to prevent MySQL crashes
            $booking->customer_phone = $booking->customer_phone ?? 'Not Provided';
            $booking->end_date = $booking->end_date ?? $booking->start_date;
            $booking->guests_count = $booking->guests_count ?? 1;
            $booking->unit_price = $booking->unit_price ?? $booking->total_price;
            $booking->currency = $booking->currency ?? 'MYR';

            static::created(function ($booking) {
            Mail::to($booking->customer_email)->send(new BookingConfirmed($booking));
        });
        });
    }

    // Establishes the relationship: A booking belongs to a specific tour
    public function tour()
    {
        return $this->belongsTo(Tour::class);
    }
}