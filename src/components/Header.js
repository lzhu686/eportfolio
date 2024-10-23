import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Nav = styled.nav`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.background};
  padding: 1rem 0;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const NavContent = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  color: ${props => props.theme.colors.background};
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    display: ${props => props.isOpen ? 'flex' : 'none'};
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.background};
  text-decoration: none;
  margin-right: 1.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
  &:hover {
    color: ${props => props.theme.colors.accent};
  }
  @media (max-width: 768px) {
    margin: 0.5rem 0;
  }
`;

const LanguageButton = styled.button`
  background: #006064;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 4px;
  &:hover {
    background: #00363a;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.background};
  font-size: 1.5rem;
  cursor: pointer;
  @media (max-width: 768px) {
    display: block;
  }
`;

function Header() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Nav>
      <NavContent>
        <Title>{t('header.title')}</Title>
        <MenuButton onClick={toggleMenu}>☰</MenuButton>
        <NavLinks isOpen={isOpen}>
          <NavLink to="/">{t('navigation.home')}</NavLink>
          <NavLink to="/skills">{t('navigation.skills')}</NavLink>
          <NavLink to="/projects">{t('navigation.projects')}</NavLink>
          <NavLink to="/education">{t('navigation.education')}</NavLink>
          <NavLink to="/contact">{t('navigation.contact')}</NavLink>
        </NavLinks>
        <LanguageButton onClick={() => changeLanguage(i18n.language === 'en' ? 'zh' : 'en')}>
          {i18n.language === 'en' ? '中文' : 'English'}
        </LanguageButton>
      </NavContent>
    </Nav>
  );
}

export default Header;
