import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import { mainRouter } from 'router/mainRouter';

import { store } from 'redux/store';

import './App.css';

const tg = window.Telegram.WebApp;

tg.ready();
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <Suspense fallback="">
            <RouterProvider router={mainRouter} />
        </Suspense>
    </Provider>
);
