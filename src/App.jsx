// App.jsx
import { BrowserRouter } from 'react-router-dom';
import AppRouter from '@/app/router';
import ErrorModalProvider from '@/shared/components/error-modal/ErrorModalProvider';

export default function App() {
  return (
    <ErrorModalProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ErrorModalProvider>
  );
}
