import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
    @media (max-width: 768px) {
      font-size: 14px;
    }
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
    padding: 1rem;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.heading};
    color: ${props => props.theme.colors.primary};
  }

  @media (max-width: 768px) {
    h1 { font-size: 2rem; }
    h2 { font-size: 1.5rem; }
    h3 { font-size: 1.2rem; }
  }
`;

export default GlobalStyle;
