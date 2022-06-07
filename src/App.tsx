import { FC, StrictMode } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Page from './components/Page';
import Shell from './components/Shell';

const App: FC = () => {
  return (
    <StrictMode>
      <HashRouter>
        <Shell>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/:slug' element={<Page />} />
          </Routes>
        </Shell>
      </HashRouter>
    </StrictMode>
  );
};

export default App;
