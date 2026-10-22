import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import ToursCatalog from './ToursCatalog';

const client = new ApolloClient({
  uri: 'http://your-laravel-domain.test/graphql',
  cache: new InMemoryCache(),
});

export default function App() {
  const handleBooking = (tour) => {
    alert(`Starting booking reservation for: ${tour.title}`);
  };

  return (
    <ApolloProvider client={client}>
      <main style={{ backgroundColor: '#faf8f5', minHeight: '100vh' }}>
        <ToursCatalog onSelectTour={handleBooking} />
      </main>
    </ApolloProvider>
  );
}