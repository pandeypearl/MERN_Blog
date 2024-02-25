import Header from './Header';
import { Outlet } from 'react-router-dom';
import ToggleButton from './ToggleButton';
import { useLightDarkMode } from '../utils/LightDarkModeContext';
import { useEffect } from 'react';

export default function Layout () {
  const { isLightMode } = useLightDarkMode();

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
    }
  }, [isLightMode]);

  return (
    <main>
      <ToggleButton />
      <Header />
      <Outlet />
    </main>
  );
}