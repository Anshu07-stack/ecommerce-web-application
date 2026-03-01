import { Suspense, lazy, useMemo, memo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { store } from './store';
import { darkTheme, lightTheme } from './theme';
import Toast from './components/ui/Toast';

// ─── Lazy load routes ONCE at module level ───────────────────────────────────
const AppRoutes = lazy(() => import('./routes/AppRoutes'));

// ─── Static loader — no Redux, no re-render on theme change ──────────────────
const PageLoader = () => (
  <div style={{
    minHeight: '100vh', display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    background: '#0A0806', gap: 16,
  }}>
    <div className="loader-ring" />
    <span style={{
      fontFamily: '"Cormorant Garamond",serif', fontSize: '1.1rem',
      color: 'rgba(240,237,230,0.3)', letterSpacing: '0.1em',
    }}>CartAura</span>
  </div>
);

// ─── Routes wrapped in Suspense — completely outside theme 
const StableRoutes = memo(() => (
  <Suspense fallback={<PageLoader />}>
    <AppRoutes />
  </Suspense>
));

// ─── Only ThemeProvider + CssBaseline re-render on theme toggle ───────────────
const ThemedShell = () => {
  const isDark = useSelector(s => s.ui.themeMode) === 'dark';
  const theme  = useMemo(() => isDark ? darkTheme : lightTheme, [isDark]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StableRoutes />
      <Toast />
    </ThemeProvider>
  );
};

// ─── Root ─────────────────────────────────────────────────────────────────────
const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <ThemedShell />
    </BrowserRouter>
  </Provider>
);

export default App;
