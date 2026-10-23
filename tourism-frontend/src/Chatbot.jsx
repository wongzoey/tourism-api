import React, { useState, useRef, useEffect } from 'react';
import { gql } from '@apollo/client';
import { useLazyQuery } from '@apollo/client/react';

const ASK_CHATBOT = gql`
  query AskChatbot($message: String!) {
    askChatbot(message: $message)
  }
`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { text: "Hi! Need recommendations in Malaysia? Ask me anything.", isBot: true }
  ]);
  const messagesEndRef = useRef(null);

  const [askAi, { loading }] = useLazyQuery(ASK_CHATBOT, {
    fetchPolicy: 'network-only', // Prevents Apollo from caching old errors
    onCompleted: (data) => {
      console.log("Backend Response:", data);
      if (data && data.askChatbot) {
        setMessages(prev => [...prev, { text: data.askChatbot, isBot: true }]);
      } else {
        setMessages(prev => [...prev, { text: "Received an empty response from the server.", isBot: true }]);
      }
    },
    onError: (err) => {
      console.error("GraphQL Error:", err);
      setMessages(prev => [...prev, { text: `Error: ${err.message}`, isBot: true }]);
    }
  });

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to UI
    setMessages(prev => [...prev, { text: input, isBot: false }]);
    
    // Call Laravel GraphQL endpoint
    askAi({ variables: { message: input } });
    setInput('');
  };

  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 9999 }}>
      {isOpen ? (
        <div style={{ width: '350px', height: '500px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          
          {/* Header */}
          <div style={{ backgroundColor: 'var(--primary)', color: '#fff', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '1rem' }}><i className="fa-solid fa-robot"></i> AI Travel Guide</h3>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.2rem' }}>&times;</button>
          </div>

          {/* Chat Window */}
          <div style={{ flex: 1, padding: '15px', overflowY: 'auto', backgroundColor: '#faf8f5', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ alignSelf: msg.isBot ? 'flex-start' : 'flex-end', backgroundColor: msg.isBot ? '#fff' : 'var(--accent-gold)', color: msg.isBot ? '#333' : '#000', padding: '10px 14px', borderRadius: '12px', maxWidth: '80%', fontSize: '0.9rem', border: msg.isBot ? '1px solid #eee' : 'none' }}>
                {msg.text}
              </div>
            ))}
            {loading && <div style={{ alignSelf: 'flex-start', color: '#888', fontSize: '0.8rem' }}>Typing...</div>}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} style={{ display: 'flex', padding: '10px', borderTop: '1px solid #eee', backgroundColor: '#fff' }}>
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="E.g. Where to eat near KLCC?" 
              style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '20px', outline: 'none' }}
              disabled={loading}
            />
            <button type="submit" disabled={loading} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '1.2rem', marginLeft: '10px', cursor: 'pointer' }}>
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#fff', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', cursor: 'pointer', fontSize: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <i className="fa-solid fa-comment-dots"></i>
        </button>
      )}
    </div>
  );
}