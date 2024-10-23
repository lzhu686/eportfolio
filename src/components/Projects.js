import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '../styles/CommonStyles';

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Project = styled.div`
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

const ProjectTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const ProjectDescription = styled.p`
  font-size: 0.9rem;
  line-height: 1.4;
  color: ${props => props.theme.colors.text};
`;

function Projects() {
  const { t } = useTranslation();

  const projects = t('projects.list', { returnObjects: true });

  return (
    <PageContainer>
      <h1>{t('projects.title')}</h1>
      <ProjectsGrid>
        {projects.map((project, index) => (
          <Project key={index}>
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectDescription>{project.description}</ProjectDescription>
          </Project>
        ))}
      </ProjectsGrid>
    </PageContainer>
  );
}

export default Projects;
