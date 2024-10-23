import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Header from './components/Header';
import Home from './components/Home';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import AIChat from './components/AIChat';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import styled from 'styled-components';

const MainContent = styled.div`
  min-height: calc(100vh - 60px); // 假设头部高度为60px
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <div className="App">
          <Header />
          <MainContent>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/education" element={<Education />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </MainContent>
          <AIChat />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
