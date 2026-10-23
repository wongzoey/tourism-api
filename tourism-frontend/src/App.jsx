import { useState } from 'react';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import LandingPage from './LandingPage.jsx';
// import ToursCatalog from './ToursCatalog.jsx';
import BookingModal from './BookingModal.jsx';
import Chatbot from './Chatbot.jsx';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://127.0.0.1:8000/graphql',
  }),
  cache: new InMemoryCache(),
});

export default function App() {
  // State to track which tour the user wants to book
  const [selectedTour, setSelectedTour] = useState(null);

  // Triggered when the "Book Now" button is clicked inside LandingPage
  const handleBooking = (tour) => {
    setSelectedTour(tour);
  };

  return (
    <ApolloProvider client={client}>
      {/* Your main landing page */}
      <LandingPage onSelectTour={handleBooking} />
      
      {/* Render the modal overlay only if a tour is currently selected */}
      {selectedTour && (
        <BookingModal 
          tour={selectedTour} 
          onClose={() => setSelectedTour(null)} 
        />
      )}
      <Chatbot />
    </ApolloProvider>
  );
}
