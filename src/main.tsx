import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Test from './component/test.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Test />
  </StrictMode>
);
