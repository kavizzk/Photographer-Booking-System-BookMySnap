import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);

// Wrap the render in a try-catch to handle any initialization errors
try {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error('Error rendering app:', error);
  // You might want to show a fallback UI here
  root.render(
    <div style={{ 
      padding: '20px', 
      color: 'red', 
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>Something went wrong</h1>
      <p>Please try refreshing the page</p>
    </div>
  );
}
