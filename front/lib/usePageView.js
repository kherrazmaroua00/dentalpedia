'use client';
import { useEffect } from 'react';
import { apiFetch } from './api';

export function usePageView(path) {
  useEffect(() => {
    apiFetch('/api/pageviews', { method: 'POST', body: JSON.stringify({ path }) }).catch(() => {});
  }, [path]);
}
