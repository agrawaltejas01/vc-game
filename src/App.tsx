import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { GameProvider, useGameContext } from './context/GameContext';
import { AppLayout } from './components/layout/AppLayout';
import { Landing } from './routes/Landing';
import { Intake } from './routes/Intake';
import { Game } from './routes/Game';
import { Summary } from './routes/Summary';
import { trackPageView } from './utils/analytics';

// Protected route wrapper
function ProtectedRoute({ children, requireCompleted = false }: { children: React.ReactNode; requireCompleted?: boolean }) {
  const { gameId, gameState } = useGameContext();

  // Redirect to homepage if user doesn't have required game state
  // (e.g., when refreshing on protected pages)
  if (!gameId) {
    return <Navigate to="/" replace />;
  }

  if (requireCompleted && !gameState.is_completed) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const location = useLocation();

  // Track page views on route change
  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/intake" element={<Intake />} />
        <Route
          path="/game"
          element={
            <ProtectedRoute>
              <Game />
            </ProtectedRoute>
          }
        />
        <Route
          path="/summary"
          element={
            <ProtectedRoute requireCompleted>
              <Summary />
            </ProtectedRoute>
          }
        />
        {/* Catch all 404 routes and redirect to homepage */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;
