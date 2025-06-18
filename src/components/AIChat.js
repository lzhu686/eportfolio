import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { aiService } from '../services/aiService';

const slideIn = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

const typingDots = keyframes`
  0%, 60%, 100% {
    transform: initial;
  }
  30% {
    transform: translateY(-10px);
  }
`;

const pulse = keyframes`
  0% {
    opacity: 0.4;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.4;
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
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
  
  /* 自定义滚动条样式 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
    transition: background 0.3s ease;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
  
  /* Firefox 滚动条样式 */
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1);
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

  /* 自定义滚动条样式 */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
  
  /* Firefox 滚动条样式 */
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
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
  
  ${({ $isAI, theme }) => $isAI ? `
    align-self: flex-start;
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  ` : `
    align-self: flex-end;
    background-color: ${theme.colors.accent};
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

const SuggestionButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 10px 0;
`;

const SuggestionButton = styled.button`
  background-color: rgba(52, 152, 219, 0.2);
  color: white;
  border: 1px solid rgba(52, 152, 219, 0.5);
  border-radius: 15px;
  padding: 6px 12px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(52, 152, 219, 0.4);
  }
`;

const MarkdownContent = styled.div`
  h1, h2, h3, h4, h5, h6 {
    color: ${props => props.theme.colors.accent};
    margin: 0.8rem 0 0.4rem 0;
    font-weight: 600;
  }
  
  h1 { font-size: 1.1rem; }
  h2 { font-size: 1rem; }
  h3 { font-size: 0.95rem; }
  h4, h5, h6 { font-size: 0.9rem; }
  
  p {
    margin: 0.5rem 0;
    line-height: 1.5;
  }
  
  ul, ol {
    margin: 0.5rem 0;
    padding-left: 1.2rem;
  }
  
  li {
    margin: 0.3rem 0;
    line-height: 1.4;
  }
  
  strong {
    font-weight: 600;
    color: rgba(255, 255, 255, 0.95);
  }
  
  em {
    color: ${props => props.theme.colors.accent};
    font-style: italic;
  }
  
  code {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
    font-size: 0.85rem;
  }
  
  pre {
    background: rgba(0, 0, 0, 0.2);
    padding: 0.8rem;
    border-radius: 4px;
    overflow-x: auto;
    margin: 0.5rem 0;
    
    code {
      background: none;
      padding: 0;
    }
  }
  
  blockquote {
    border-left: 3px solid ${props => props.theme.colors.accent};
    padding-left: 0.8rem;
    margin: 0.5rem 0;
    color: rgba(255, 255, 255, 0.8);
    font-style: italic;
  }
`;

const ThinkingMessage = styled(motion.div)`
  max-width: 80%;
  padding: 15px 20px;
  border-radius: 18px;
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 1.4;
  align-self: flex-start;
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0.1) 0%, 
    rgba(255, 255, 255, 0.2) 50%, 
    rgba(255, 255, 255, 0.1) 100%
  );
  background-size: 200px 100%;
  animation: ${shimmer} 2s infinite;
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const TypingDots = styled.div`
  display: flex;
  gap: 3px;
  
  span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${props => props.theme.colors.accent};
    animation: ${typingDots} 1.4s infinite ease-in-out;
    
    &:nth-child(1) {
      animation-delay: -0.32s;
    }
    &:nth-child(2) {
      animation-delay: -0.16s;
    }
    &:nth-child(3) {
      animation-delay: 0s;
    }
  }
`;

const ThinkingIcon = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid ${props => props.theme.colors.accent};
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: ${pulse} 2s infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  
  &::before {
    content: '🤔';
    animation: ${pulse} 1.5s infinite;
  }
`;

const TypewriterMarkdown = ({ text, shouldTypewrite = false }) => {
  const [displayText, setDisplayText] = useState(shouldTypewrite ? '' : text);

  useEffect(() => {
    if (!shouldTypewrite) {
      setDisplayText(text);
      return;
    }

    if (!text) return;
    
    let currentIndex = 0;
    const textLength = text.length;
    
    const timer = setInterval(() => {
      if (currentIndex < textLength) {
        setDisplayText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(timer);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [text, shouldTypewrite]);

  return (
    <MarkdownContent>
      <ReactMarkdown>{displayText}</ReactMarkdown>
    </MarkdownContent>
  );
};

function AIChat() {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // 初始化欢迎消息
  useEffect(() => {
    const welcomeMessage = i18n.language === 'zh' 
      ? '您好！我是朱亮的AI助手。朱亮是一位专注于仿真系统工程和人形机器人遥操作的专业工程师，目前在香港科技大学(广州)攻读智能制造硕士学位。您可以问我关于朱亮的教育背景、项目经历、技能专长或职业发展等任何问题！'
      : 'Hello! I am Zhu Liang\'s AI assistant. Zhu Liang is a professional engineer specializing in simulation systems engineering and humanoid robot teleoperation, currently pursuing a Master\'s degree in Intelligent Manufacturing at HKUST(GZ). Feel free to ask me about Zhu Liang\'s educational background, project experience, technical skills, or career development!';
    
    setMessages([{ text: welcomeMessage, isAI: true, shouldTypewrite: false }]);
  }, [i18n.language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      const userMessage = input.trim();
      setInput('');
      setMessages(prev => [...prev, { text: userMessage, isAI: false }]);
      setIsLoading(true);
      setError(null);

      try {
        const response = await aiService.sendMessage(userMessage, i18n.language);
        if (response) {
          setMessages(prev => [...prev, { text: response, isAI: true, shouldTypewrite: true }]);
        } else {
          throw new Error('无效的响应');
        }
      } catch (err) {
        const errorMessage = i18n.language === 'zh' 
          ? '抱歉，发生错误，请稍后重试' 
          : 'Sorry, an error occurred. Please try again later.';
        setError(errorMessage);
        console.error('聊天错误:', err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  const getSuggestions = () => {
    return i18n.language === 'zh' ? [
      '朱亮的机器人技术专长是什么？',
      '朱亮有哪些项目经历？',
      '朱亮的教育背景如何？',
      '朱亮在人形机器人方面的经验？'
    ] : [
      'What are Zhu Liang\'s robotics specialties?',
      'What project experience does Zhu Liang have?',
      'What is Zhu Liang\'s educational background?',
      'What experience does Zhu Liang have with humanoid robots?'
    ];
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
                  $isAI={msg.isAI}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {msg.isAI ? <TypewriterMarkdown text={msg.text} shouldTypewrite={msg.shouldTypewrite} /> : msg.text}
                </Message>
              ))}
              {messages.length === 1 && (
                <SuggestionButtons>
                  {getSuggestions().map((suggestion, index) => (
                    <SuggestionButton
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </SuggestionButton>
                  ))}
                </SuggestionButtons>
              )}
              {isLoading && (
                <ThinkingMessage
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ThinkingIcon />
                  <span>{i18n.language === 'zh' ? '正在思考' : 'Thinking'}</span>
                  <TypingDots>
                    <span></span>
                    <span></span>
                    <span></span>
                  </TypingDots>
                </ThinkingMessage>
              )}
              {error && (
                <Message $isAI style={{color: 'red'}}>
                  {error}
                </Message>
              )}
              <div ref={messagesEndRef} />
            </ChatMessages>
            <ChatInputContainer>
              <ChatInput
                value={input}
                onChange={handleInputChange}
                placeholder={t('aiChat.inputPlaceholder')}
                disabled={isLoading}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(e);
                  }
                }}
              />
              <SendButton 
                onClick={handleSend}
                disabled={isLoading}
              >
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
