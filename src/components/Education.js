import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '../styles/CommonStyles';

const EducationItem = styled.div`
  margin-bottom: 2rem;
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Degree = styled.h2`
  color: ${props => props.theme.colors.primary};
`;

const School = styled.h3`
  color: ${props => props.theme.colors.secondary};
`;

const Year = styled.p`
  font-style: italic;
  color: ${props => props.theme.colors.lightText};
`;

function Education() {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <h1>{t('education.title')}</h1>
      <EducationItem>
        <Degree>{t('education.degree1')}</Degree>
        <School>{t('education.school1')}</School>
        <Year>{t('education.year1')}</Year>
      </EducationItem>
      <EducationItem>
        <Degree>{t('education.degree2')}</Degree>
        <School>{t('education.school2')}</School>
        <Year>{t('education.year2')}</Year>
      </EducationItem>
    </PageContainer>
  );
}

export default Education;
