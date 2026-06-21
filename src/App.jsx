import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from '@/pages/Home';
import { LanguageProvider } from '@/lib/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />

          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>

          <Toaster />
        </Router>
      </QueryClientProvider>
    </LanguageProvider>
  );
}

export default App;