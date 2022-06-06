import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Page from './components/Page';
import Shell from './components/Shell';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Shell>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/:slug' element={<Page />} />
        </Routes>
      </Shell>
    </BrowserRouter>
  );
};

export default App;
