// App.jsx
import { BrowserRouter } from 'react-router-dom';
import AppRouter from '@/app/router';
import StartupSplash from '@/features/startup/components/StartupSplash';
import RoomIntervalProvider from '@/features/room/components/RoomIntervalProvider';
import ErrorModalProvider from '@/shared/components/error-modal/ErrorModalProvider';

export default function App() {
  return (
    <ErrorModalProvider>
      <BrowserRouter>
        <RoomIntervalProvider>
          <AppRouter />
          <StartupSplash />
        </RoomIntervalProvider>
      </BrowserRouter>
    </ErrorModalProvider>
  );
}
