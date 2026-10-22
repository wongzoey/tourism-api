// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import { ApolloClient, InMemoryCache } from '@apollo/client';
// import { ApolloProvider } from '@apollo/client/react';

// import App from './App.jsx';
// import './index.css';

// const client = new ApolloClient({
//   uri: 'http://localhost:8000/graphql',
//   cache: new InMemoryCache(),
// });

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <ApolloProvider client={client}>
//       <App />
//     </ApolloProvider>
//   </StrictMode>,
// );



import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
