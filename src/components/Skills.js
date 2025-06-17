import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '../styles/CommonStyles';

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SkillCategory = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const CategoryTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const SkillList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const SkillItem = styled.li`
  margin-bottom: 0.3rem;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text};
`;

function Skills() {
  const { t } = useTranslation();

  const skillCategories = ['robotics', 'programming', 'development', 'simulation', 'tools', 'softSkills'];

  return (
    <PageContainer>
      <h1>{t('skills.title')}</h1>
      <SkillsGrid>
        {skillCategories.map((category) => {
          const skills = t(`skills.list.${category}`, { returnObjects: true });
          return (
            <SkillCategory key={category}>
              <CategoryTitle>{t(`skills.categories.${category}`)}</CategoryTitle>
              <SkillList>
                {Array.isArray(skills) && skills.map((skill, index) => (
                  <SkillItem key={index}>{skill}</SkillItem>
                ))}
              </SkillList>
            </SkillCategory>
          );
        })}
      </SkillsGrid>
    </PageContainer>
  );
}

export default Skills;
