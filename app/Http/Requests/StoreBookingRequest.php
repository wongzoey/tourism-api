<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'tour_id'        => ['required', 'exists:tours,id'],
            'start_date'     => ['required', 'date', 'after_or_equal:today'],
            'guests_count'   => ['required', 'integer', 'min:1', 'max:50'],
            'customer_name'  => ['required', 'string', 'max:255'],
            'customer_email' => ['required', 'email', 'max:255'],
            'customer_phone' => ['required', 'string', 'max:30'],
            'special_notes'  => ['nullable', 'string', 'max:1000'],
        ];
    }

    public function messages(): array
    {
        return [
            'start_date.after_or_equal' => 'The tour start date must be today or a future date.',
            'guests_count.min'          => 'At least 1 guest is required for a reservation.',
        ];
    }
}