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
  overflow-x: hidden;
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
  position: relative;
  box-sizing: border-box;
  @media (max-width: 768px) {
    padding: 0 0.5rem;
    justify-content: flex-start;
    min-height: 56px;
    max-width: 100vw;
    overflow: hidden;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  color: ${props => props.theme.colors.background};
  flex: 1;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 768px) {
    font-size: 1.1rem;
    text-align: left;
    flex: 1;
    padding-right: 110px;
    box-sizing: border-box;
    max-width: calc(100vw - 130px);
  }
`;

const NavLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    display: ${props => props.$isOpen ? 'flex' : 'none'};
    background: ${props => props.theme.colors.primary};
    position: absolute;
    top: 56px;
    left: 0;
    z-index: 1;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
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
  white-space: nowrap;
  &:hover {
    background: #00363a;
  }
  @media (max-width: 768px) {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    padding: 0.25rem 0.6rem;
    z-index: 2;
    font-size: 0.85rem;
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
    position: absolute;
    right: 65px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    padding: 0.25rem;
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
        <NavLinks $isOpen={isOpen}>
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
