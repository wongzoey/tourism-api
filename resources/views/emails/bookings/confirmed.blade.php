<x-mail::message>
# Booking Confirmed, {{ $booking->customer_name }}!

Thank you for choosing to explore Malaysia with us. Your booking is currently pending review, and our team will reach out shortly.

**Booking Reference:** {{ $booking->booking_reference }}  
**Travel Date:** {{ \Carbon\Carbon::parse($booking->start_date)->format('F j, Y') }}  
**Total Price:** {{ $booking->currency }} {{ number_format($booking->total_price, 2) }}

<x-mail::button :url="config('app.url')">
View Your Itinerary
</x-mail::button>

Terima Kasih,<br>
{{ config('app.name') }}
</x-mail::message>