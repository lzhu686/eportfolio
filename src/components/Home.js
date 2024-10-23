import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { PageContainer } from '../styles/CommonStyles';

const HomeContainer = styled(PageContainer)`
  text-align: center;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const Subtitle = styled(motion.h2)`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 2rem;
`;

const Bio = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const Highlight = styled(motion.p)`
  font-style: italic;
  color: ${props => props.theme.colors.accent};
  margin-top: 2rem;
  font-size: 1.2rem;
`;

function Home() {
  const { t } = useTranslation();

  return (
    <HomeContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Title
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
      >
        {t('home.name')}
      </Title>
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
