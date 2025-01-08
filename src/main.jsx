import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './components/Home.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import Layout from './components/Layouts/Layout.jsx'
import History from './components/History.jsx'
import { SupabaseProvider } from './context/SupabaseContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <SupabaseProvider>

    <Routes>

    <Route path='/' element={<Layout />} >
      <Route index element={<Home />} />
      <Route path='history' element={<History />} />
    </Route>

    </Routes>

    </SupabaseProvider>
    </BrowserRouter>
  </StrictMode>,
)
