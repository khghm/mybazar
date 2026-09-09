import { useState } from 'react';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import AdDetailPage from './pages/AdDetailPage';
import CreateAdPage from './pages/CreateAdPage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import MapPage from './pages/MapPage';
import ArchitecturePage from './pages/ArchitecturePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export type Page = 'home' | 'search' | 'detail' | 'create' | 'chat' | 'profile' | 'map' | 'architecture';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedAdId, setSelectedAdId] = useState<string | null>(null);

  const navigate = (page: Page, adId?: string) => {
    setCurrentPage(page);
    if (adId) setSelectedAdId(adId);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigate={navigate} />;
      case 'search':
        return <SearchPage navigate={navigate} />;
      case 'detail':
        return <AdDetailPage navigate={navigate} adId={selectedAdId} />;
      case 'create':
        return <CreateAdPage navigate={navigate} />;
      case 'chat':
        return <ChatPage navigate={navigate} />;
      case 'profile':
        return <ProfilePage navigate={navigate} />;
      case 'map':
        return <MapPage navigate={navigate} />;
      case 'architecture':
        return <ArchitecturePage navigate={navigate} />;
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar currentPage={currentPage} navigate={navigate} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}

export default App;
