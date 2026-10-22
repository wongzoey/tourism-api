<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookingRequest;
use App\Models\Booking;
use App\Models\Tour;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;

class BookingController extends Controller
{
    /**
     * Store and confirm a new tour reservation.
     */
    public function store(StoreBookingRequest $request): JsonResponse
    {
        $validated = $request->validated();

        try {
            // Run inside a database transaction to ensure atomicity
            $booking = DB::transaction(function () use ($validated) {
                
                // 1. Lock the tour row to prevent race conditions during concurrent checkouts
                $tour = Tour::where('id', $validated['tour_id'])
                    ->where('is_active', true)
                    ->lockForUpdate()
                    ->firstOrFail();

                // 2. Compute date windows based on tour duration
                $startDate = Carbon::parse($validated['start_date'])->startOfDay();
                // If it's a 3-day tour starting Friday, it runs Friday, Saturday, Sunday (add 2 days)
                $endDate = (clone $startDate)->addDays(max(0, $tour->duration_days - 1))->endOfDay();
                $requestedGuests = (int) $validated['guests_count'];

                // 3. Check for capacity conflicts during this date window
                // Standard overlap condition: (start_date <= $endDate) AND (end_date >= $startDate)
                $bookedGuestsCount = Booking::where('tour_id', $tour->id)
                    ->whereIn('status', ['confirmed', 'pending_payment'])
                    ->where(function ($query) use ($startDate, $endDate) {
                        $query->where('start_date', '<=', $endDate)
                              ->where('end_date', '>=', $startDate);
                    })
                    ->lockForUpdate()
                    ->sum('guests_count');

                // 4. Verify that capacity is not exceeded
                $availableSlots = $tour->max_group_size 
                    ? ($tour->max_group_size - $bookedGuestsCount) 
                    : \PHP_INT_MAX;

                if ($requestedGuests > $availableSlots) {
                    throw ValidationException::withMessages([
                        'start_date' => [
                            $availableSlots <= 0
                                ? 'The selected tour is fully booked for these dates.'
                                : "Only {$availableSlots} seat(s) remaining for the selected dates."
                        ],
                    ]);
                }

                // 5. Calculate total pricing
                $totalPrice = $tour->price * $requestedGuests;

                // 6. Persist the booking record
                return Booking::create([
                    'booking_reference' => 'MY-' . strtoupper(Str::random(8)),
                    'tour_id'           => $tour->id,
                    'customer_name'     => $validated['customer_name'],
                    'customer_email'    => $validated['customer_email'],
                    'customer_phone'    => $validated['customer_phone'],
                    'start_date'        => $startDate->toDateString(),
                    'end_date'          => $endDate->toDateString(),
                    'guests_count'      => $requestedGuests,
                    'unit_price'        => $tour->price,
                    'total_price'       => $totalPrice,
                    'currency'          => $tour->currency,
                    'special_notes'     => $validated['special_notes'] ?? null,
                    'status'            => 'confirmed', // or 'pending_payment'
                ]);
            });

            return response()->json([
                'success' => true,
                'message' => 'Tour reservation successfully confirmed!',
                'data'    => $booking->load('tour:id,title,destination'),
            ], Response::HTTP_CREATED);

        } catch (ValidationException $e) {
            // Rethrow so Laravel sends the standard 422 JSON validation response
            throw $e;
        } catch (\Exception $e) {
            report($e);

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while reserving your tour. Please try again.',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}