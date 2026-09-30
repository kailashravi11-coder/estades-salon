import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';

export type Page = 'home' | 'services' | 'pricing' | 'gallery' | 'about' | 'contact';

export default function App() {
  const getInitialPage = (): Page => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (['home', 'services', 'pricing', 'gallery', 'about', 'contact'].includes(hash)) {
      return hash as Page;
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<Page>(getInitialPage);

  // Sync state with hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'services', 'pricing', 'gallery', 'about', 'contact'].includes(hash)) {
        setCurrentPage(hash as Page);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
    window.location.hash = page;
  };

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setPage={handlePageChange} />;
      case 'services':
        return <Services setPage={handlePageChange} />;
      case 'pricing':
        return <Pricing />;
      case 'gallery':
        return <Gallery />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return <Home setPage={handlePageChange} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-gold selection:text-white">
      <Header currentPage={currentPage} setPage={handlePageChange} />
      <main className="flex-grow pt-24">
        {renderPage()}
      </main>
      <Footer setPage={handlePageChange} />
    </div>
  );
}
