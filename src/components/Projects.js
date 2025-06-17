import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { PageContainer } from '../styles/CommonStyles';

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const DownloadSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const DownloadButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const Project = styled(motion.div)`
  background: linear-gradient(145deg, ${props => props.theme.colors.cardBackground}, rgba(255, 255, 255, 0.95));
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-height: 300px;
  display: flex;
  flex-direction: column;

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
    transform: translateY(-5px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 768px) {
    padding: 1.2rem;
    min-height: 250px;
  }
`;

const ProjectTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 0.6rem;
  }
`;

const ProjectDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
  flex: 1;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Tag = styled.span`
  background: linear-gradient(135deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.primary});
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const DownloadIcon = styled.span`
  font-size: 1.2rem;
`;

function Projects() {
  const { t } = useTranslation();

  const projects = t('projects.list', { returnObjects: true });

  // 为每个项目添加标签
  const projectsWithTags = projects.map((project, index) => ({
    ...project,
    tags: getProjectTags(index, t)
  }));

  return (
    <PageContainer>
      <HeaderSection>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t('projects.title')}
        </motion.h1>
        
        <DownloadSection>
          <DownloadButton
            href="/portfolio.pdf"
            download="朱亮_作品集.pdf"
            target="_blank"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <DownloadIcon>📁</DownloadIcon>
            {t('projects.downloadPortfolio') || '下载完整作品集'}
          </DownloadButton>
          
          <DownloadButton
            href="/resume.pdf"
            download="朱亮_个人简历.pdf"
            target="_blank"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <DownloadIcon>📄</DownloadIcon>
            {t('projects.downloadResume') || '下载个人简历'}
          </DownloadButton>
        </DownloadSection>
      </HeaderSection>

      <ProjectsGrid>
        {projectsWithTags.map((project, index) => (
          <Project
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectDescription>{project.description}</ProjectDescription>
            <ProjectTags>
              {project.tags.map((tag, tagIndex) => (
                <Tag key={tagIndex}>{tag}</Tag>
              ))}
            </ProjectTags>
          </Project>
        ))}
      </ProjectsGrid>
    </PageContainer>
  );
}

// 为项目添加相关技术标签
function getProjectTags(index, t) {
  const tagSets = [
    ['humanoidRobot', 'vrTeleoperation', 'motionCapture', 'projectManagement'], // 人形机器人多模态训练平台
    ['intelligentRobot', 'welding', 'webDevelopment', 'computerVision'], // 智能焊接机器人
    ['webDevelopment', 'gis', 'navigationSystem', 'campusService'], // 京师司南校园导航
    ['ue5', 'geoEducation', 'virtualSimulation', 'educationInnovation'], // 地理实习仿真平台
    ['virtualSimulation', 'educationInnovation', 'systemIntegration', 'algorithmDevelopment'] // 创业仿真平台
  ];
  
  const projectTags = tagSets[index] || ['robotSimulation', 'systemIntegration'];
  return projectTags.map(tagKey => t(`projects.tags.${tagKey}`));
}

export default Projects;
