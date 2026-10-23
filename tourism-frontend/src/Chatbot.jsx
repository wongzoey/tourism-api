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
    {
      text: 'Hi! Need recommendations in Malaysia? Ask me anything.',
      isBot: true,
    },
  ]);

  const messagesEndRef = useRef(null);

  const [askAi, { loading }] = useLazyQuery(ASK_CHATBOT, {
    fetchPolicy: 'network-only',
    errorPolicy: 'none',
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();

    const question = input.trim();

    if (!question || loading) return;

    setMessages((prev) => [
      ...prev,
      { text: question, isBot: false },
    ]);

    setInput('');

    try {
      console.log('Sending chatbot question:', question);

      const result = await askAi({
        variables: { message: question },
      });

      console.log('Full GraphQL result:', result);

      const answer = result.data?.askChatbot;

      if (typeof answer === 'string' && answer.trim()) {
        setMessages((prev) => [
          ...prev,
          { text: answer.trim(), isBot: true },
        ]);
      } else {
        console.error('Unexpected GraphQL response:', result.data);

        setMessages((prev) => [
          ...prev,
          {
            text: 'The server responded, but no answer was returned. Please try again.',
            isBot: true,
          },
        ]);
      }
    } catch (error) {
      console.error('Chatbot request failed:', error);

      setMessages((prev) => [
        ...prev,
        {
          text: `Sorry, I could not get a response. ${error.message || 'Please try again.'}`,
          isBot: true,
        },
      ]);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 9999,
      }}
    >
      {isOpen ? (
        <div
          style={{
            width: '350px',
            height: '500px',
            backgroundColor: '#fff',
            borderRadius: '16px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--primary)',
              color: '#fff',
              padding: '15px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h3 style={{ margin: 0, fontSize: '1rem' }}>
              <i className="fa-solid fa-robot" /> AI Travel Guide
            </h3>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '1.2rem',
              }}
              aria-label="Close chatbot"
            >
              &times;
            </button>
          </div>

          <div
            style={{
              flex: 1,
              padding: '15px',
              overflowY: 'auto',
              backgroundColor: '#faf8f5',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.isBot ? 'flex-start' : 'flex-end',
                  backgroundColor: msg.isBot
                    ? '#fff'
                    : 'var(--accent-gold)',
                  color: msg.isBot ? '#333' : '#000',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  maxWidth: '80%',
                  fontSize: '0.9rem',
                  border: msg.isBot ? '1px solid #eee' : 'none',
                  whiteSpace: 'pre-wrap',
                  overflowWrap: 'anywhere',
                }}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div
                style={{
                  alignSelf: 'flex-start',
                  color: '#888',
                  fontSize: '0.8rem',
                }}
              >
                Typing...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSend}
            style={{
              display: 'flex',
              padding: '10px',
              borderTop: '1px solid #eee',
              backgroundColor: '#fff',
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="E.g. Where to eat near KLCC?"
              style={{
                flex: 1,
                minWidth: 0,
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '20px',
                outline: 'none',
              }}
              disabled={loading}
              aria-label="Ask the AI travel guide"
            />

            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                fontSize: '1.2rem',
                marginLeft: '10px',
                cursor: loading ? 'wait' : 'pointer',
                opacity: loading || !input.trim() ? 0.5 : 1,
              }}
            >
              <i className="fa-solid fa-paper-plane" />
            </button>
          </form>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI travel guide"
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary)',
            color: '#fff',
            border: 'none',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
            cursor: 'pointer',
            fontSize: '1.5rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <i className="fa-solid fa-comment-dots" />
        </button>
      )}
    </div>
  );
}