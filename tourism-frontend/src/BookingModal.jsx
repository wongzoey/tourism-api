import React, { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';

// The GraphQL mutation to send data to your Laravel backend
const CREATE_BOOKING_MUTATION = gql`
  mutation CreateBooking($tour_id: ID!, $customer_name: String!, $customer_email: String!, $start_date: Date!, $total_price: Float!) {
    createBooking(
      tour_id: $tour_id
      customer_name: $customer_name
      customer_email: $customer_email
      start_date: $start_date
      total_price: $total_price
      status: "pending_payment"
    ) {
      id
      status
    }
  }
`;

export default function BookingModal({ tour, onClose }) {
  const [formData, setFormData] = useState({ name: '', email: '', date: '' });
  
  // Hook up the mutation
  const [createBooking, { loading, error, data }] = useMutation(CREATE_BOOKING_MUTATION);

// Inside your BookingModal component:
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBooking({
        variables: {
          tour_id: tour.id,
          customer_name: formData.name,
          customer_email: formData.email,
          start_date: formData.date, // Mapped to start_date
          total_price: tour.price
        }
      });
    } catch (err) {
      console.error("Booking failed", err);
    }
  };


  // If successful, show a confirmation message
  if (data) {
    return (
      <div style={modalOverlayStyle}>
        <div style={modalContentStyle}>
          <i className="fa-solid fa-circle-check" style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem' }}></i>
          <h2>Booking Confirmed!</h2>
          <p>Thank you, {formData.name}. Your request for {tour.title} is pending review.</p>
          <button className="btn btn-secondary" onClick={onClose} style={{ marginTop: '20px' }}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ margin: 0, color: 'var(--primary)' }}>Book {tour.title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
        </div>
        
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Price: {tour.formatted_price}</p>

        {error && <p style={{ color: 'var(--accent-coral)' }}>Error: {error.message}</p>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' }}>
          <div>
            <label style={labelStyle}>Full Name</label>
            <input required type="text" style={inputStyle} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div>
            <label style={labelStyle}>Email Address</label>
            <input required type="email" style={inputStyle} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div>
            <label style={labelStyle}>Travel Date</label>
            <input required type="date" style={inputStyle} value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
          </div>
          
          <button type="submit" className="btn btn-gold" disabled={loading} style={{ marginTop: '10px', justifyContent: 'center' }}>
            {loading ? 'Processing...' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  );
}

// Simple inline styles for the modal
const modalOverlayStyle = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 };
const modalContentStyle = { backgroundColor: '#fff', padding: '30px', borderRadius: '16px', width: '90%', maxWidth: '500px', textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' };
const inputStyle = { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #edf2f7', marginTop: '5px', boxSizing: 'border-box' };
const labelStyle = { fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' };