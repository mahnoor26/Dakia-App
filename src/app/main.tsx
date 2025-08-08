import React, { Suspense } from 'react';
import './tailwind.css';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import router from './router';
import { MantineProvider } from '@mantine/core';
import { store } from './store';
import '@mantine/core/styles.layer.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Suspense>
        <MantineProvider>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </MantineProvider>
    </Suspense>
);
