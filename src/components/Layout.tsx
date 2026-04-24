import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Progress } from '@/components/ui/progress'
import useCourseStore from '@/stores/useCourseStore'
import { useAppStore } from '@/stores/useAppStore'
import { CheckCircle2, BookOpen, Stethoscope, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function Layout() {
  const { completedModules } = useCourseStore()
  const { currentUser, logout } = useAppStore()
  const location = useLocation()
  const navigate = useNavigate()
  const progress = (completedModules.length / 8) * 100

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (!currentUser) {
    return (
      <main className="min-h-screen bg-slate-50 relative">
        <div className="w-full max-w-5xl mx-auto py-8">
          <Outlet />
        </div>
      </main>
    )
  }

  const modules = [
    { id: 1, title: 'Introdução & Tabela', path: '/module/1' },
    { id: 2, title: 'Quadro Clínico', path: '/module/2' },
    { id: 3, title: 'Escala Finnegan', path: '/module/3' },
    { id: 4, title: 'Casos Clínicos', path: '/module/4' },
    { id: 5, title: 'Guia Visual (ESC)', path: '/module/5' },
    { id: 6, title: 'Guia de Medicações', path: '/module/6' },
    { id: 7, title: 'Protocolos de Transição', path: '/module/7' },
    { id: 8, title: 'Avaliação Final', path: '/module/8' },
  ]

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-slate-200">
        <SidebarHeader className="p-6 border-b border-slate-100 h-16 flex justify-center">
          <div className="flex items-center gap-2 font-bold text-primary text-lg">
            <Stethoscope className="w-6 h-6 text-secondary" />
            <span className="truncate">CTI Neonatal HJK</span>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-4">
          <SidebarMenu>
            <SidebarMenuItem className="mb-4">
              <SidebarMenuButton asChild isActive={location.pathname === '/'}>
                <Link to="/">
                  <BookOpen className="w-4 h-4" />
                  <span>Início do Curso</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {modules.map((m) => {
              const isActive = location.pathname === m.path
              const isCompleted = completedModules.includes(m.id)

              return (
                <SidebarMenuItem key={m.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className={cn(
                      'transition-all duration-200',
                      isActive ? 'font-semibold text-primary' : 'text-slate-600',
                    )}
                  >
                    <Link to={m.path} className="flex items-center justify-between w-full">
                      <span className="truncate">
                        {m.id}. {m.title}
                      </span>
                      {isCompleted && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 ml-2" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarContent>
        <div className="p-6 border-t border-slate-100 mt-auto bg-slate-50/50 space-y-4">
          <div>
            <div className="flex justify-between items-center text-xs mb-2 text-slate-500 font-medium">
              <span>Progresso de {currentUser.name.split(' ')[0]}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-slate-200" />
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-slate-500 hover:text-rose-600 hover:bg-rose-50"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" /> Sair
          </Button>
        </div>
      </Sidebar>
      <main className="flex-1 flex flex-col min-h-screen relative bg-slate-50 overflow-hidden">
        <header className="h-auto min-h-16 py-3 border-b border-slate-200 bg-white flex items-center justify-between px-4 sticky top-0 z-10 shadow-sm print:hidden">
          <div className="flex items-center gap-4 overflow-hidden">
            <SidebarTrigger className="text-slate-500 hover:text-primary transition-colors shrink-0" />
            <div className="flex flex-col overflow-hidden">
              <h1 className="font-semibold text-slate-800 text-sm md:text-base truncate tracking-tight">
                SAN: Manejo Baseado em Evidências no CTI Neonatal
              </h1>
              <span className="text-[10px] md:text-xs text-slate-500 truncate mt-0.5 hidden sm:block">
                Elaboradora: Dra Marina de Paula Lima Oliveira - FHEMIG.
              </span>
            </div>
          </div>
        </header>
        <div className="flex-1 p-4 md:p-8 w-full max-w-4xl mx-auto overflow-y-auto">
          <div className="animate-fade-in-up">
            <Outlet />
          </div>
        </div>
      </main>
    </SidebarProvider>
  )
}
