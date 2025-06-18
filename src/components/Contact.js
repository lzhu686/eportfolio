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

const ContactContainer = styled(PageContainer)`
  padding: 2rem 1rem;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ContactHeader = styled.div`
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

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ContactCard = styled.div`
  background: ${props => props.theme.colors.cardBackground};
  border-radius: 16px;
  padding: 2rem;
  box-shadow: ${props => props.theme.shadows.medium};
  transition: all 0.3s ease;
  animation: ${fadeInUp} 0.8s ease-out;
  animation-delay: ${props => props.delay || '0s'};
  animation-fill-mode: both;
  border: 1px solid rgba(52, 73, 94, 0.1);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${props => props.theme.shadows.large};
    border-color: ${props => props.theme.colors.accent};
  }
`;

const ContactIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.primary});
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: white;
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
`;

const ContactType = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.3rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const ContactValue = styled.div`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text};
  line-height: 1.6;
`;

const ContactLink = styled.a`
  color: ${props => props.theme.colors.accent};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    transform: translateX(4px);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, ${props => props.theme.colors.accent}, ${props => props.theme.colors.primary});
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const SocialSection = styled.div`
  background: ${props => props.theme.colors.cardBackground};
  border-radius: 16px;
  padding: 2rem;
  box-shadow: ${props => props.theme.shadows.medium};
  text-align: center;
  animation: ${fadeInUp} 0.8s ease-out 0.6s both;
  border: 1px solid rgba(52, 73, 94, 0.1);
`;

const SocialTitle = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1.5rem;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${props => props.theme.colors.background};
  border-radius: 25px;
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  
  &:hover {
    background: ${props => props.theme.colors.accent};
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(52, 152, 219, 0.3);
  }
`;

const ContactNote = styled.div`
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, ${props => props.theme.colors.background}, #ecf0f1);
  border-radius: 16px;
  margin-top: 2rem;
  animation: ${fadeInUp} 0.8s ease-out 0.8s both;
`;

const NoteText = styled.p`
  font-style: italic;
  color: ${props => props.theme.colors.lightText};
  font-size: 1rem;
  line-height: 1.6;
`;

function Contact() {
  const { t } = useTranslation();

  return (
    <ContactContainer>
      <ContactHeader>
        <Title>{t('contact.title')}</Title>
        <Subtitle>
          {t('contact.subtitle')}
        </Subtitle>
      </ContactHeader>

      <ContactGrid>
        <ContactCard delay="0.2s">
          <ContactIcon>📧</ContactIcon>
          <ContactType>{t('contact.email')}</ContactType>
          <ContactValue>
            <ContactLink href="mailto:lzhu686@connect.hkust-gz.edu.cn">
              lzhu686@connect.hkust-gz.edu.cn
            </ContactLink>
          </ContactValue>
        </ContactCard>

        <ContactCard delay="0.4s">
          <ContactIcon>📱</ContactIcon>
          <ContactType>{t('contact.phone')}</ContactType>
          <ContactValue>
            <ContactLink href="tel:+8613056352551">
              +86 13056352551
            </ContactLink>
          </ContactValue>
        </ContactCard>
      </ContactGrid>

      <SocialSection>
        <SocialTitle>
          {t('contact.findMeOnline')}
        </SocialTitle>
        <SocialLinks>
          <SocialLink 
            href="https://github.com/lzhu686" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <span>💻</span>
            GitHub
          </SocialLink>
          <SocialLink 
            href="mailto:lzhu686@connect.hkust-gz.edu.cn"
          >
            <span>✉️</span>
            Email
          </SocialLink>
          <SocialLink 
            href="tel:+8613056352551"
          >
            <span>📞</span>
            {t('contact.callButton')}
          </SocialLink>
        </SocialLinks>
      </SocialSection>

      <ContactNote>
        <NoteText>
          {t('contact.note')}
        </NoteText>
      </ContactNote>
    </ContactContainer>
  );
}

export default Contact;
