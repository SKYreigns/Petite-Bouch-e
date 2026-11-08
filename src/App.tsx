import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { Contact } from './pages/Contact';
import { CustomCakes } from './pages/CustomCakes';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { NotFound } from './pages/NotFound';
import { OurStory } from './pages/OurStory';
import { Privacy } from './pages/Privacy';

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppShell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/custom-cakes" element={<CustomCakes />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}

export default App;
