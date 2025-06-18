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
  position: relative;
  @media (max-width: 768px) {
    overflow: visible;
  }
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
    overflow: visible;
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
    width: 100vw;
    display: ${props => props.$isOpen ? 'flex' : 'none'};
    background: ${props => props.theme.colors.primary};
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    padding: 1rem;
    border-radius: 0 0 8px 8px;
    margin-top: 1rem;
    max-width: 100vw;
    box-sizing: border-box;
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
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: block;
    width: 100%;
    
    &:last-child {
      border-bottom: none;
    }
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
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
  }
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 70px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1001;
    padding: 0.5rem;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    
    &:active {
      background: rgba(255, 255, 255, 0.1);
    }
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

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <Nav>
      <NavContent>
        <Title>{t('header.title')}</Title>
        <MenuButton onClick={toggleMenu}>☰</MenuButton>
        <NavLinks $isOpen={isOpen}>
          <NavLink to="/" onClick={closeMenu}>{t('navigation.home')}</NavLink>
          <NavLink to="/skills" onClick={closeMenu}>{t('navigation.skills')}</NavLink>
          <NavLink to="/projects" onClick={closeMenu}>{t('navigation.projects')}</NavLink>
          <NavLink to="/education" onClick={closeMenu}>{t('navigation.education')}</NavLink>
          <NavLink to="/contact" onClick={closeMenu}>{t('navigation.contact')}</NavLink>
        </NavLinks>
        <LanguageButton onClick={() => changeLanguage(i18n.language === 'en' ? 'zh' : 'en')}>
          {i18n.language === 'en' ? '中文' : 'English'}
        </LanguageButton>
      </NavContent>
    </Nav>
  );
}

export default Header;
