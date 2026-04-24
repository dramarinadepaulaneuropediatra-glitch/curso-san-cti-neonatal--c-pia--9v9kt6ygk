import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

import Layout from './components/Layout'
import NotFound from './pages/NotFound'
import Index from './pages/Index'
import Module1 from './pages/modules/Module1'
import Module2 from './pages/modules/Module2'
import Module3 from './pages/modules/Module3'
import Module4 from './pages/modules/Module4'
import Module5 from './pages/modules/Module5'
import Module6 from './pages/modules/Module6'
import Module7 from './pages/modules/Module7'
import Module8 from './pages/modules/Module8'
import AdminPage from './pages/AdminPage'
import { AppProvider } from '@/stores/useAppStore'

const App = () => (
  <AppProvider>
    <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/module/1" element={<Module1 />} />
            <Route path="/module/2" element={<Module2 />} />
            <Route path="/module/3" element={<Module3 />} />
            <Route path="/module/4" element={<Module4 />} />
            <Route path="/module/5" element={<Module5 />} />
            <Route path="/module/6" element={<Module6 />} />
            <Route path="/module/7" element={<Module7 />} />
            <Route path="/module/8" element={<Module8 />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </AppProvider>
)

export default App
