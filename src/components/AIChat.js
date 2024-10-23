import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const slideIn = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

const ChatContainer = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  height: 400px;
  background-color: rgba(44, 62, 80, 0.9);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  animation: ${slideIn} 0.3s ease-out;
`;

const ChatHeader = styled.div`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MinimizeButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 15px;
  display: flex;
  flex-direction: column;
`;

const ChatInputContainer = styled.div`
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0 0 15px 15px;
  display: flex;
  align-items: center;
`;

const ChatInput = styled.textarea`
  flex: 1;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 14px;
  resize: none;
  min-height: 40px;
  max-height: 100px;
  overflow-y: auto;
  line-height: 1.4;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const SendButton = styled.button`
  background-color: ${props => props.theme.colors.accent};
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

const Message = styled(motion.div)`
  max-width: 80%;
  padding: 10px 15px;
  border-radius: 18px;
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 1.4;
  word-wrap: break-word;
  ${props => props.isAI ? `
    align-self: flex-start;
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  ` : `
    align-self: flex-end;
    background-color: ${props.theme.colors.accent};
    color: white;
  `}
`;

const AIAvatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const ToggleButton = styled(motion.button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const TypewriterText = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const index = useRef(0);

  useEffect(() => {
    if (index.current < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayText((prev) => prev + text[index.current]);
        index.current += 1;
      }, 30);
      return () => clearTimeout(timeoutId);
    }
  }, [displayText, text]);

  return <span>{displayText}</span>;
};

function AIChat() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, isAI: false }]);
      setInput('');
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "这是AI的回复", isAI: true }]);
      }, 1000);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <ChatContainer
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <ChatHeader>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <AIAvatar>AI</AIAvatar>
                {t('aiChat.title')}
              </div>
              <MinimizeButton onClick={() => setIsOpen(false)}>—</MinimizeButton>
            </ChatHeader>
            <ChatMessages>
              {messages.map((msg, index) => (
                <Message
                  key={index}
                  isAI={msg.isAI}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {msg.isAI ? <TypewriterText text={msg.text} /> : msg.text}
                </Message>
              ))}
              <div ref={messagesEndRef} />
            </ChatMessages>
            <ChatInputContainer>
              <ChatInput
                value={input}
                onChange={handleInputChange}
                placeholder={t('aiChat.inputPlaceholder')}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(e);
                  }
                }}
              />
              <SendButton onClick={handleSend}>
                <span role="img" aria-label="send">➤</span>
              </SendButton>
            </ChatInputContainer>
          </ChatContainer>
        )}
      </AnimatePresence>
      {!isOpen && (
        <ToggleButton
          onClick={() => setIsOpen(true)}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          AI
        </ToggleButton>
      )}
    </>
  );
}

export default AIChat;
