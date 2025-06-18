import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '../styles/CommonStyles';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const skillsAppear = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const SkillsContainer = styled(PageContainer)`
  padding: 2rem 1rem;
`;

const SkillsHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const Title = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.lightText};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const SkillCategory = styled.div`
  background: ${props => props.theme.colors.cardBackground};
  border-radius: 16px;
  padding: 2rem;
  box-shadow: ${props => props.theme.shadows.medium};
  transition: all 0.3s ease;
  animation: ${fadeInUp} 0.8s ease-out;
  animation-delay: ${props => props.delay || '0s'};
  animation-fill-mode: both;
  border: 1px solid rgba(52, 73, 94, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.primary});
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${props => props.theme.shadows.large};
    border-color: ${props => props.theme.colors.accent};
    
    &::before {
      transform: scaleX(1);
    }
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const CategoryIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: linear-gradient(135deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.primary});
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  font-size: 1.3rem;
  color: white;
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
`;

const CategoryTitle = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  color: ${props => props.theme.colors.primary};
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
`;

const SkillList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const SkillItem = styled.li`
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
  color: ${props => props.theme.colors.text};
  padding: 0.5rem 0;
  border-bottom: 1px solid ${props => props.theme.colors.background};
  transition: all 0.3s ease;
  animation: ${skillsAppear} 0.5s ease-out;
  animation-delay: ${props => (props.index * 0.1)}s;
  animation-fill-mode: both;
  display: flex;
  align-items: center;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    transform: translateX(8px);
    background: ${props => props.theme.colors.background};
    border-radius: 8px;
    padding-left: 0.75rem;
  }

  &::before {
    content: '▸';
    color: ${props => props.theme.colors.accent};
    font-weight: bold;
    margin-right: 0.5rem;
    transition: all 0.3s ease;
  }

  &:hover::before {
    color: ${props => props.theme.colors.primary};
    transform: scale(1.2);
  }
`;

const SkillsStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
  animation: ${fadeInUp} 0.8s ease-out 0.6s both;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.background}, #ecf0f1);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid rgba(52, 73, 94, 0.1);
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.lightText};
  font-weight: 500;
`;

function Skills() {
  const { t } = useTranslation();

  const skillCategories = [
    { key: 'robotics', icon: '🤖', delay: '0.1s' },
    { key: 'programming', icon: '💻', delay: '0.2s' },
    { key: 'development', icon: '🛠️', delay: '0.3s' },
    { key: 'simulation', icon: '🎮', delay: '0.4s' },
    { key: 'tools', icon: '⚙️', delay: '0.5s' },
    { key: 'softSkills', icon: '🧠', delay: '0.6s' }
  ];

  const stats = [
    { number: '6+', label: t('skills.stats.categories') },
    { number: '50+', label: t('skills.stats.technologies') },
    { number: '5+', label: t('skills.stats.experience') }
  ];

  return (
    <SkillsContainer>
      <SkillsHeader>
        <Title>{t('skills.title')}</Title>
        <Subtitle>
          {t('skills.subtitle')}
        </Subtitle>
      </SkillsHeader>

      <SkillsGrid>
        {skillCategories.map((category) => {
          const skills = t(`skills.list.${category.key}`, { returnObjects: true });
          return (
            <SkillCategory key={category.key} delay={category.delay}>
              <CategoryHeader>
                <CategoryIcon>{category.icon}</CategoryIcon>
                <CategoryTitle>{t(`skills.categories.${category.key}`)}</CategoryTitle>
              </CategoryHeader>
              <SkillList>
                {Array.isArray(skills) && skills.map((skill, index) => (
                  <SkillItem key={index} index={index}>{skill}</SkillItem>
                ))}
              </SkillList>
            </SkillCategory>
          );
        })}
      </SkillsGrid>

      <SkillsStats>
        {stats.map((stat, index) => (
          <StatCard key={index}>
            <StatNumber>{stat.number}</StatNumber>
            <StatLabel>{stat.label}</StatLabel>
          </StatCard>
        ))}
      </SkillsStats>
    </SkillsContainer>
  );
}

export default Skills;
