'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import LoadingOverlay from '../components/LoadingOverlay';

const DataContext = createContext<any>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // initial content load
  const [activeRequests, setActiveRequests] = useState(0); // global fetch counter
  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem('adminToken');
    } catch {
      return null;
    }
  });

  // Fetch initial site content
  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/content`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json) setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  // Keep token in sync across tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'adminToken') {
        setToken(e.newValue);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Patch global fetch to maintain activeRequests counter so the UI can show a loader
  useEffect(() => {
    const globalAny: any = window as any;
    if (!globalAny.fetch) return;

    const originalFetch = globalAny.fetch.bind(window);

    const wrappedFetch = (...args: any[]) => {
      // Do not count image fetching endpoints in the global activeRequests
      try {
        const req = args[0];
        const url = typeof req === 'string' ? req : (req && req.url) || '';
        const isImageEndpoint = /\/api\/images/i.test(url) || /\.(png|jpe?g|gif|svg)(\?|$)/i.test(url);
        if (isImageEndpoint) {
          return originalFetch(...args);
        }
      } catch {
        // fall back to counting on error
      }

      setActiveRequests((n) => n + 1);
      const result = originalFetch(...args);
      // Ensure we decrement when the promise settles
      // result is a Promise<Response>
      if (result && typeof result.finally === 'function') {
        result.finally(() => setActiveRequests((n) => Math.max(0, n - 1)));
      } else {
        // fallback: try to handle as promise
        Promise.resolve(result).finally(() => setActiveRequests((n) => Math.max(0, n - 1)));
      }
      return result;
    };

    globalAny.fetch = wrappedFetch;

    return () => {
      try {
        globalAny.fetch = originalFetch;
      } catch {
        // ignore
      }
    };
  }, []);

  const isFetching = activeRequests > 0;

  return (
    <DataContext.Provider value={{ data, loading, isFetching }}>
      {children}
      {/* Show a global loading overlay while initial content or any fetch is in-flight */}
      <LoadingOverlay show={loading || isFetching} />
    </DataContext.Provider>
  );
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
};
