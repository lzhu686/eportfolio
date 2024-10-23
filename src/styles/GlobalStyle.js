import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body, html {
    min-height: 101vh;
    
    &::-webkit-scrollbar {
      width: 12px !important;
    }

    &::-webkit-scrollbar-track {
      background: ${props => props.theme.colors.background} !important;
      border-radius: 6px !important;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(44, 62, 80, 0.4) !important;
      border-radius: 6px !important;
      border: 3px solid ${props => props.theme.colors.background} !important;
      background-image: linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.1) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.1) 50%,
        rgba(255, 255, 255, 0.1) 75%,
        transparent 75%,
        transparent
      ) !important;
      transition: all 0.3s ease !important;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: rgba(44, 62, 80, 0.6) !important;
    }

    scrollbar-width: thin !important;
    scrollbar-color: rgba(44, 62, 80, 0.4) ${props => props.theme.colors.background} !important;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .content {
    flex: 1;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.heading};
    color: ${props => props.theme.colors.primary};
  }
`;

export default GlobalStyle;
