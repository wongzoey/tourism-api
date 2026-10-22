
import React from 'react';
import ToursCatalog from './ToursCatalog.jsx';
import { topMarkup, bottomMarkup } from './landingpagemarkup.js';
import './LandingPage.css';

export default function LandingPage({ onSelectTour }) {
  return (
    <>
      {/* Navigation, hero and iconic landmarks */}
      <div dangerouslySetInnerHTML={{ __html: topMarkup }} />

      {/* Tours Catalog connected to the GraphQL-backed component */}
      <section id="tours" className="tours-section">
        <div className="tours-section-inner">
          <div className="section-header">
            <span className="section-subtitle">
              Find Your Next Adventure
            </span>

            <h2 className="section-title">
              Explore Malaysia Tours
            </h2>

            <p className="section-description">
              Discover guided experiences, cultural journeys,
              nature escapes and unforgettable destinations
              across Malaysia.
            </p>
          </div>

          <ToursCatalog onSelectTour={onSelectTour} />
        </div>
      </section>

      {/* Peninsular and Borneo showcase, plus footer */}
      <div dangerouslySetInnerHTML={{ __html: bottomMarkup }} />
    </>
  );
}
