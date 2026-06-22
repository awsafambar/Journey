import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as ReactDOM from 'react-dom'
import { RouterProvider } from 'react-router-dom'
import router from './router/Router'
import './index.css'
import React from 'react'
import { ThemeProvider } from './theme/ThemeProvider'

if (import.meta.env.MODE !== 'production') {
  import('@axe-core/react').then((axe) => {
    axe.default(React, ReactDOM, 1000);
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
