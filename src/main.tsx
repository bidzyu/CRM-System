import App from './App';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store';
import StylesConfigProvider from './components/StylesConfigProvider/StylesConfigProvider';
import { StrictMode } from 'react';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <StylesConfigProvider>
        <App />
      </StylesConfigProvider>
    </BrowserRouter>
  </Provider>
);
