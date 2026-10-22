import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import './ToursCatalog.css';

// GraphQL query matching our schema and filter inputs
export const GET_TOURS_QUERY = gql`
  query GetAvailableTours(
    $destination: String
    $minPrice: Float
    $maxPrice: Float
    $sortByPrice: SortOrder
    $page: Int
  ) {
    tours(
      first: 9
      page: $page
      filter: {
        destination: $destination
        min_price: $minPrice
        max_price: $maxPrice
        sort_by_price: $sortByPrice
      }
    ) {
      paginatorInfo {
        currentPage
        lastPage
        total
        hasMorePages
      }
      data {
        id
        title
        slug
        summary
        destination
        region
        formatted_duration
        formatted_price
        price
        featured_image
        max_group_size
      }
    }
  }
`;

export default function ToursCatalog({ onSelectTour }) {
  // Filter States
  const [destination, setDestination] = useState('');
  const [maxPrice, setMaxPrice] = useState(3000);
  const [sortByPrice, setSortByPrice] = useState('ASC');
  const [page, setPage] = useState(1);

  // Execute GraphQL Query with reactive variables
  const { data, loading, error } = useQuery(GET_TOURS_QUERY, {
    variables: {
      destination: destination || null,
      maxPrice: parseFloat(maxPrice) || null,
      sortByPrice,
      page,
    },
    fetchPolicy: 'cache-and-network',
  });

  const tours = data?.tours?.data || [];
  const paginator = data?.tours?.paginatorInfo;

  return (
    <section className="section-container tours-catalog-section">
      {/* Section Header */}
      <div className="section-header">
        <span className="section-subtitle">Curated Malaysian Experiences</span>
        <h2 className="section-title">Explore Available Tours</h2>
        <p className="section-description">
          Find your next getaway across Peninsular Malaysia and Borneo, tailored to your budget and travel style.
        </p>
      </div>

      {/* Floating Filter / Discovery Bar */}
      <div className="discovery-bar tour-filter-bar">
        <div className="disc-item">
          <i className="fa-solid fa-location-dot"></i>
          <div>
            <label>Destination</label>
            <select
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Destinations</option>
              <option value="Langkawi">Langkawi, Kedah</option>
              <option value="Penang">Penang Island</option>
              <option value="Kuala Lumpur">Kuala Lumpur</option>
              <option value="Kinabalu">Sabah (Mount Kinabalu)</option>
              <option value="Sarawak">Sarawak (Borneo)</option>
            </select>
          </div>
        </div>

        <div className="disc-item">
          <i className="fa-solid fa-wallet"></i>
          <div>
            <label>Max Budget: RM {maxPrice}</label>
            <input
              type="range"
              min="200"
              max="5000"
              step="100"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        <div className="disc-item">
          <i className="fa-solid fa-arrow-down-wide-short"></i>
          <div>
            <label>Price Order</label>
            <select
              value={sortByPrice}
              onChange={(e) => setSortByPrice(e.target.value)}
            >
              <option value="ASC">Lowest to Highest</option>
              <option value="DESC">Highest to Lowest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Error Notice */}
      {error && (
        <div className="state-notice error">
          <i className="fa-solid fa-circle-exclamation"></i>
          <p>Failed to load tours: {error.message}</p>
        </div>
      )}

      {/* Loading Skeletons */}
      {loading && !data && (
        <div className="landmarks-grid">
          {[1, 2, 3].map((skeleton) => (
            <div key={skeleton} className="card skeleton-card">
              <div className="skeleton-media"></div>
              <div className="skeleton-body">
                <div className="skeleton-line title"></div>
                <div className="skeleton-line text"></div>
                <div className="skeleton-line text short"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && tours.length === 0 && !error && (
        <div className="state-notice empty">
          <i className="fa-solid fa-compass"></i>
          <h3>No tours found</h3>
          <p>Try widening your budget range or choosing another destination.</p>
        </div>
      )}

      {/* Tours Grid */}
      <div className="landmarks-grid">
        {tours.map((tour) => (
          <article key={tour.id} className="card tour-card">
            <div className="card-media">
              <img
                src={
                  tour.featured_image ||
                  'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80'
                }
                alt={tour.title}
                loading="lazy"
              />
              <span className="tag-badge">
                <i className="fa-regular fa-clock"></i> {tour.formatted_duration}
              </span>
              <span className="region-badge">{tour.destination}</span>
            </div>

            <div className="card-body">
              <div className="card-meta">
                <span>
                  <i className="fa-solid fa-map-pin"></i> {tour.region || 'Malaysia'}
                </span>
                {tour.max_group_size && (
                  <span>
                    <i className="fa-solid fa-users"></i> Max {tour.max_group_size} pax
                  </span>
                )}
              </div>

              <h3 className="card-title">{tour.title}</h3>
              <p className="card-text">{tour.summary || 'Experience this unforgettable Malaysian journey.'}</p>

              <div className="card-footer">
                <div className="tour-price-box">
                  <span className="price-label">Starting from</span>
                  <span className="price-value">{tour.formatted_price}</span>
                </div>

                <button
                  className="btn btn-gold"
                  onClick={() => onSelectTour && onSelectTour(tour)}
                >
                  Book Now <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination Controls */}
      {paginator && paginator.lastPage > 1 && (
        <div className="pagination-bar">
          <button
            className="btn btn-secondary"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          >
            <i className="fa-solid fa-chevron-left"></i> Previous
          </button>
          <span>
            Page <strong>{paginator.currentPage}</strong> of {paginator.lastPage} ({paginator.total} tours)
          </span>
          <button
            className="btn btn-secondary"
            disabled={!paginator.hasMorePages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      )}
    </section>
  );
}