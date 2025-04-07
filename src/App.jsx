import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { Provider } from 'react-redux';
import { Theme } from '@radix-ui/themes';
import store from './store/store';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import GameDetails from './pages/GameDetails';
import Library from './pages/Library';
import '@radix-ui/themes/styles.css';

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  if (!CLERK_PUBLISHABLE_KEY) {
    throw new Error('Missing Publishable Key');
  }

  return (
    <ClerkProvider 
      publishableKey={CLERK_PUBLISHABLE_KEY}
      navigate={(to) => window.location.href = to}
    >
      <Provider store={store}>
        <Theme appearance="dark" accentColor="violet" radius="medium">
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game/:id" element={<GameDetails />} />
                <Route path="/library" element={<Library />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </Theme>
      </Provider>
    </ClerkProvider>
  );
}

export default App;