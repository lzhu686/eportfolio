import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { PageContainer } from '../styles/CommonStyles';

const HomeContainer = styled(PageContainer)`
  text-align: center;
`;

const AnimatedContainer = styled(motion.div)`
  // 样式保持不变
`;

const AnimatedTitle = styled(motion.h1)`
  font-size: 3rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled(motion.h2)`
  font-size: 1.4rem;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 2rem;
  font-weight: 500;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const Bio = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 2rem;
  text-align: justify;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.6;
    text-align: left;
  }
`;

const Highlight = styled(motion.p)`
  font-style: italic;
  color: ${props => props.theme.colors.accent};
  margin-top: 2rem;
  font-size: 1.1rem;
  line-height: 1.6;
  background: rgba(52, 152, 219, 0.05);
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 4px solid ${props => props.theme.colors.accent};
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 1.2rem;
    margin-top: 1.5rem;
  }
`;

function Home() {
  const { t } = useTranslation();

  return (
    <HomeContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <AnimatedContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <AnimatedTitle
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
        >
          {t('home.name')}
        </AnimatedTitle>
      </AnimatedContainer>
      <Subtitle
        initial={{ y: -30 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 120 }}
      >
        {t('home.title')}
      </Subtitle>
      <Bio
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {t('home.bio')}
      </Bio>
      <Highlight
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        {t('home.highlight')}
      </Highlight>
    </HomeContainer>
  );
}

export default Home;
