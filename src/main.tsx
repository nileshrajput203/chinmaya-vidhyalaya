import ReactDOM from 'react-dom/client';
import { AppProviders } from './app/providers';
import { AppRouter } from './app/router';
import './styles/globals.css';
import './styles/theme.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppProviders>
    <AppRouter />
  </AppProviders>
);
