import * as React from 'react';
import { SettingsContextProvider } from './context/settings_context';
import { WSContextProvider } from './context/websocket_context';
import TabNavigation from './router/tabNavigation';

const App = () => {
  return (
    <SettingsContextProvider>
      <WSContextProvider>
        <TabNavigation />
      </WSContextProvider>
    </SettingsContextProvider>
  )
}

export default App