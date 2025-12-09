import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GameProvider, useGameContext } from './context/GameContext';
import { AppLayout } from './components/layout/AppLayout';
import { Landing } from './routes/Landing';
import { Intake } from './routes/Intake';
import { Game } from './routes/Game';
import { Summary } from './routes/Summary';

// Protected route wrapper
function ProtectedRoute({ children, requireCompleted = false }: { children: React.ReactNode; requireCompleted?: boolean }) {
  const { gameId, gameState } = useGameContext();

  if (!gameId) {
    return <Navigate to="/intake" replace />;
  }

  if (requireCompleted && !gameState.is_completed) {
    return <Navigate to="/game" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
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
