import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "@mantine/core/styles.css";
import '@mantine/notifications/styles.css';

import {  MantineProvider, createTheme } from '@mantine/core'
import { Notifications } from '@mantine/notifications';
const theme = createTheme({})
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
    <Notifications />
    <App />
    </MantineProvider>
  </React.StrictMode>,
)
