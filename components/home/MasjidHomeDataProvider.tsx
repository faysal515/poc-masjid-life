'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { MasjidHomeJson } from '@/lib/masjid-home-scrape';

type MasjidHomeCtx = {
  data: MasjidHomeJson | null;
  loading: boolean;
  error: string | null;
  reload: () => void;
};

const MasjidHomeContext = createContext<MasjidHomeCtx | null>(null);

export function MasjidHomeDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<MasjidHomeJson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  const reload = useCallback(() => setNonce((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch("/api/scrape/home")
      .then(async (r) => {
        const j = await r.json();
        if (!r.ok) throw new Error(j.error ?? r.statusText);
        return j as MasjidHomeJson;
      })
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch((err: unknown) => {
        if (!cancelled)
          setError(err instanceof Error ? err.message : 'Load failed');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [nonce]);

  const value = useMemo(
    () => ({ data, loading, error, reload }),
    [data, loading, error, reload],
  );

  return (
    <MasjidHomeContext.Provider value={value}>
      {children}
    </MasjidHomeContext.Provider>
  );
}

export function useMasjidHomeData(): MasjidHomeCtx {
  const ctx = useContext(MasjidHomeContext);
  if (!ctx)
    throw new Error('useMasjidHomeData must be used within MasjidHomeDataProvider');
  return ctx;
}
