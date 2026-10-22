<?php

namespace App\GraphQL\Queries;

use App\Models\Tour;
use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class PopularDestinationsResolver
{
    /**
     * Cache TTL in seconds (e.g., 24 hours).
     */
    private const CACHE_TTL = 86400;

    /**
     * Resolve and return popular destinations from Redis cache or MySQL fallback.
     *
     * @param  mixed  $root
     * @param  array{limit?: int}  $args
     * @param  \Nuwave\Lighthouse\Support\Contracts\GraphQLContext  $context
     * @param  \GraphQL\Type\Definition\ResolveInfo  $resolveInfo
     * @return array
     */
    public function __invoke($root, array $args, GraphQLContext $context, ResolveInfo $resolveInfo): array
    {
        $limit = $args['limit'] ?? 6;
        $cacheKey = "homepage:popular_destinations:limit_{$limit}";

        // Cache using Redis tags
        return Cache::tags(['destinations', 'homepage'])->remember(
            $cacheKey,
            now()->addSeconds(self::CACHE_TTL),
            function () use ($limit) {
                return $this->computePopularDestinations($limit);
            }
        );
    }

    /**
     * Heavy SQL aggregation running only on cache misses.
     */
    private function computePopularDestinations(int $limit): array
    {
        return Tour::query()
            ->select([
                'destination as name',
                'region',
                'currency',
                DB::raw('COUNT(id) as total_tours'),
                DB::raw('MIN(price) as starting_price'),
                // Pick the first featured image found for the destination
                DB::raw('MAX(featured_image) as image'), 
            ])
            ->where('is_active', true)
            ->groupBy('destination', 'region', 'currency')
            ->orderByDesc('total_tours')
            ->limit($limit)
            ->get()
            ->map(function ($item) {
                return [
                    'name'           => $item->name,
                    'region'         => $item->region ?? 'Malaysia',
                    'image'          => $item->image ?? 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
                    'total_tours'    => (int) $item->total_tours,
                    'starting_price' => (float) $item->starting_price,
                    'currency'       => $item->currency,
                ];
            })
            ->toArray();
    }
}