import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { PageContainer } from '../styles/CommonStyles';

const EducationItem = styled(motion.div)`
  margin-bottom: 2rem;
  background: linear-gradient(145deg, ${props => props.theme.colors.cardBackground}, rgba(255, 255, 255, 0.95));
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  min-height: auto;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const Degree = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const School = styled.h3`
  color: ${props => props.theme.colors.secondary};
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Year = styled.p`
  font-style: italic;
  color: ${props => props.theme.colors.lightText};
  font-size: 1rem;
  margin-bottom: 0.75rem;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Major = styled.p`
  color: ${props => props.theme.colors.accent};
  font-weight: 500;
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Highlight = styled.p`
  color: ${props => props.theme.colors.text};
  line-height: 1.6;
  font-size: 0.9rem;
  background: rgba(52, 152, 219, 0.08);
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid ${props => props.theme.colors.accent};
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.8rem;
    line-height: 1.5;
  }
`;

function Education() {
  const { t } = useTranslation();

  const educationData = [
    { id: 1, delay: 0.1 },
    { id: 2, delay: 0.2 },
    { id: 3, delay: 0.3 }
  ];

  return (
    <PageContainer>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {t('education.title')}
      </motion.h1>
      
      {educationData.map((edu) => (
        <EducationItem
          key={edu.id}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: edu.delay }}
          whileHover={{ scale: 1.02 }}
        >
          <Degree>{t(`education.degree${edu.id}`)}</Degree>
          <School>{t(`education.school${edu.id}`)}</School>
          <Year>{t(`education.year${edu.id}`)}</Year>
          <Major>{t(`education.major${edu.id}`)}</Major>
          <Highlight>{t(`education.highlight${edu.id}`)}</Highlight>
        </EducationItem>
      ))}
    </PageContainer>
  );
}

export default Education;
