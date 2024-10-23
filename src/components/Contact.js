import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '../styles/CommonStyles';

const ContactInfo = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
`;

const ContactLink = styled.a`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

function Contact() {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <h1>{t('contact.title')}</h1>
      <ContactInfo>{t('contact.email')}: <ContactLink href="mailto:lzhu686@connect.hkust-gz.edu.cn">lzhu686@connect.hkust-gz.edu.cn</ContactLink></ContactInfo>
      <ContactInfo>{t('contact.phone')}: +86 13056352551</ContactInfo>
      <ContactInfo>GitHub: <ContactLink href="https://github.com/lzhu686" target="_blank" rel="noopener noreferrer">github.com/lzhu686</ContactLink></ContactInfo>
    </PageContainer>
  );
}

export default Contact;
