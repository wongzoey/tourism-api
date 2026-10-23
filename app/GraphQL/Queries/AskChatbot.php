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
        $model = config('services.gemini.model', 'gemini-3.6-flash');

        if (!is_string($apiKey) || trim($apiKey) === '') {
            Log::error('Gemini API key is missing from configuration.');

            return 'The chatbot is not configured correctly. Please try again later.';
        }

        $message = trim($args['message'] ?? '');

        if ($message === '') {
            return 'Please enter a message so I can help you plan your trip.';
        }

        $systemPrompt = "You are a helpful Malaysian tourism guide for the Truly Asia app. "
            . "Keep answers brief, format them clearly, and provide specific Malaysian "
            . "travel recommendations. Answer the user's question directly.";

        try {
            $response = Http::timeout(30)
                ->withHeaders([
                    'x-goog-api-key' => trim($apiKey),
                    'Content-Type' => 'application/json',
                ])
                ->post(
                    "https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent",
                    [
                        'system_instruction' => [
                            'parts' => [
                                ['text' => $systemPrompt],
                            ],
                        ],
                        'contents' => [
                            [
                                'role' => 'user',
                                'parts' => [
                                    ['text' => $message],
                                ],
                            ],
                        ],
                        'generationConfig' => [
                            'temperature' => 0.7,
                            'maxOutputTokens' => 2048,
                        ],
                    ]
                );

            if ($response->successful()) {
                $answer = $response->json(
                    'candidates.0.content.parts.0.text'
                );

                if (is_string($answer) && trim($answer) !== '') {
                    return trim($answer);
                }

                Log::warning('Gemini returned a successful response without text.', [
                    'model' => $model,
                    'finish_reason' => $response->json(
                        'candidates.0.finishReason'
                    ),
                    'prompt_feedback' => $response->json('promptFeedback'),
                ]);

                return 'Sorry, I could not generate an answer. Please try asking another question.';
            }

            Log::error('Gemini API request failed.', [
                'status' => $response->status(),
                'model' => $model,
                'error' => $response->json('error.message')
                    ?? 'Unknown Gemini API error',
            ]);

            return 'The travel assistant is temporarily unavailable. Please try again later.';

        } catch (\Throwable $e) {
            Log::error('Gemini API request exception.', [
                'exception' => get_class($e),
                'message' => $e->getMessage(),
                'model' => $model,
            ]);

            return 'The travel assistant is temporarily unavailable. Please try again later.';
        }
    }
}