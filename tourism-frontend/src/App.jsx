
import React from 'react';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import ToursCatalog from './ToursCatalog.jsx';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://127.0.0.1:8000/graphql',
  }),
  cache: new InMemoryCache(),
});

export default function App() {
  const handleBooking = (tour) => {
    alert(`Starting booking reservation for: ${tour.title}`);
  };

  return (
    <ApolloProvider client={client}>
      <main
        style={{
          backgroundColor: '#faf8f5',
          minHeight: '100vh',
        }}
      >
        <ToursCatalog onSelectTour={handleBooking} />
      </main>
    </ApolloProvider>
  );
}
