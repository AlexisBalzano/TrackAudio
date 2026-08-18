import { createRoot } from 'react-dom/client';
import Navbar from './components/navbar';
import RadioContainer from './components/radio/radio-container';

import ErrorDialog from './components/error';
import Mini from './components/mini';

import './index.scss';
import './style/app.scss';
import FocusBar from './components/focusBar';
import { useEffect, useState } from 'react';
import IPCInterface from './interfaces/IPCInterface';
import Updater from './components/updater/Updater';
import { UpdateInfo } from 'electron-updater';
import useUtilStore from './store/utilStore';
import { Configuration } from '../../shared/config.type';

function App() {
  const [updateAvailable, setUpdateAvailable] = useState<UpdateInfo | null>(null);
  const [styleTheme, setStyleTheme] = useUtilStore((state) => [
    state.styleTheme,
    state.setStyleTheme
  ]);

  useEffect(() => {
    IPCInterface.init();
    window.api.log.info('IPCInterface initialized');
    return () => {
      window.api.log.info('IPCInterface destroyed');
      IPCInterface.destroy();
    };
  }, []);

  // The settings modal is only mounted while it is open, so the saved theme is
  // loaded here instead to make sure it is applied on startup.
  useEffect(() => {
    window.api
      .getConfig()
      .then((config: Configuration) => {
        setStyleTheme(config.styleTheme);
      })
      .catch((err: unknown) => {
        window.api.log.error(`Error loading style theme: ${String(err)}`);
      });
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = styleTheme;
  }, [styleTheme]);

  return (
    <div className="absolute">
      <div>
        <Navbar updateAvailable={updateAvailable !== null} />
        <ErrorDialog />
        <div className="structure">
          <Mini />
          <div className="position-relative structure hide-main-block">
            <div className={`blur-overlay ${updateAvailable ? 'active' : ''}`} />
            <Updater onUpdateFound={setUpdateAvailable} />
            <div className="sub-structure d-flex flex-column h-full">
              <RadioContainer />
              <FocusBar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');

if (rootElement) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const root = createRoot(rootElement);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  root.render(<App />);
} else {
  console.error("Could not find element with id 'root'");
}
