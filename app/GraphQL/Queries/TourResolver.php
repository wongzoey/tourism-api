<?php

namespace App\GraphQL\Queries;

use App\Models\Tour;
use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Database\Eloquent\Builder;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class TourResolver
{
    /**
     * Builds the Eloquent query for paginated tours.
     * Lighthouse passes this builder to its paginator automatically.
     *
     * @param  mixed  $root Always null for top-level query fields.
     * @param  array{}|array{filter?: array<string, mixed>}  $args
     * @param  \Nuwave\Lighthouse\Support\Contracts\GraphQLContext  $context
     * @param  \GraphQL\Type\Definition\ResolveInfo  $resolveInfo
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function tours($root, array $args, GraphQLContext $context, ResolveInfo $resolveInfo): Builder
    {
        // 1. Start with only active tours
        $query = Tour::query()->where('is_active', true);

        // 2. Extract input filters if provided
        $filter = $args['filter'] ?? [];

        // Destination Filter (case-insensitive substring match)
        if (!empty($filter['destination'])) {
            $query->where('destination', 'LIKE', '%' . trim($filter['destination']) . '%');
        }

        // Minimum Price Filter
        if (isset($filter['min_price'])) {
            $query->where('price', '>=', $filter['min_price']);
        }

        // Maximum Price Filter
        if (isset($filter['max_price'])) {
            $query->where('price', '<=', $filter['max_price']);
        }

        // Featured Filter
        if (isset($filter['is_featured'])) {
            $query->where('is_featured', $filter['is_featured']);
        }

        // Duration Days Filter
        if (isset($filter['duration_days'])) {
            $query->where('duration_days', $filter['duration_days']);
        }

        // Sorting by Price (default to latest if not specified)
        if (!empty($filter['sort_by_price'])) {
            $query->orderBy('price', $filter['sort_by_price']);
        } else {
            $query->latest('id');
        }

        return $query;
    }

    /**
     * Resolve a single tour by ID or Slug.
     *
     * @param  mixed  $root
     * @param  array{id?: string|int, slug?: string}  $args
     * @return \App\Models\Tour|null
     */
    public function find($root, array $args): ?Tour
    {
        if (!empty($args['id'])) {
            return Tour::where('is_active', true)->find($args['id']);
        }

        if (!empty($args['slug'])) {
            return Tour::where('is_active', true)->where('slug', $args['slug'])->first();
        }

        return null;
    }
}