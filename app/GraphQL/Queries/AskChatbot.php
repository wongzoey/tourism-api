<?php

namespace App\GraphQL\Queries;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

final class AskChatbot
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
public function __invoke($_, array $args)
    {
        $apiKey = config('services.gemini.api_key');
        $model = config('services.gemini.model');

        \Illuminate\Support\Facades\Log::info(
            'Gemini key configuration check',
            [
                'present' => is_string($apiKey)
                    && trim($apiKey) !== '',
                'length' => is_string($apiKey)
                    ? strlen(trim($apiKey))
                    : 0,
            ]
        );

        if (empty($apiKey)) {
            Log::error('Gemini API key is missing from Laravel configuration.');

            return 'The chatbot is not configured correctly. Please try again later.';
        }

        $message = $args['message'] ?? '';

        $response = Http::timeout(30)
            ->withHeaders([
                'x-goog-api-key' => $apiKey,
                'Content-Type' => 'application/json',
            ])
            ->post(
                // "https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent",
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={$apiKey}",
                [
                    'system_instruction' => [
                        'parts' => [[
                            'text' => "You are a helpful Malaysian tourism guide for the Truly Asia app. Keep answers brief, format them clearly, and provide specific Malaysian travel recommendations."
                        ]]
                    ],
                    'contents' => [
                        [
                            'role' => 'user',
                            'parts' => [['text' => $message]],
                        ]
                    ],
                ]
            );

        if ($response->successful()) {
            return $response->json('candidates.0.content.parts.0.text')
                ?? 'Sorry, I could not generate a response.';
        }

        Log::error('Gemini API request failed', [
            'status' => $response->status(),
            'error' => $response->json('error.message')
                ?? 'Unknown Gemini API error',
        ]);

        return 'The travel assistant is temporarily unavailable. Please try again later.';
    }
}