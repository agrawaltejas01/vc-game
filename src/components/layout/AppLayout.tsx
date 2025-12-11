import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {location.pathname !== '/' && <Header />}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
