import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, Target, Users, PlayCircle, LogIn, ShieldAlert } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { useAppStore } from '@/stores/useAppStore'

export default function Index() {
  const { currentUser, loginStaff, loginAdmin } = useAppStore()
  const { toast } = useToast()
  const navigate = useNavigate()

  const [staffName, setStaffName] = useState('')
  const [staffPassword, setStaffPassword] = useState('')
  const [adminEmail, setAdminEmail] = useState('')

  const handleStaffLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!staffName.trim()) {
      toast({
        title: 'Atenção',
        description: 'Por favor, insira seu nome completo.',
        variant: 'destructive',
      })
      return
    }
    const success = loginStaff(staffName, staffPassword)
    if (success) {
      toast({ title: 'Bem-vindo', description: `Acesso liberado para ${staffName}.` })
    } else {
      toast({ title: 'Erro', description: 'Senha da equipe incorreta.', variant: 'destructive' })
    }
  }

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const success = loginAdmin(adminEmail)
    if (success) {
      toast({ title: 'Admin', description: 'Acesso administrativo liberado.' })
      navigate('/admin')
    } else {
      toast({ title: 'Erro', description: 'Email não autorizado.', variant: 'destructive' })
    }
  }

  if (!currentUser) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg border-none bg-white/50 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldAlert className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-800">Acesso ao Curso</CardTitle>
            <p className="text-sm text-slate-500 mt-2">Síndrome de Abstinência Neonatal (SAN)</p>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="staff" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="staff">Equipe CTI</TabsTrigger>
                <TabsTrigger value="admin">Administração</TabsTrigger>
              </TabsList>
              <TabsContent value="staff">
                <form onSubmit={handleStaffLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      placeholder="Ex: João da Silva"
                      value={staffName}
                      onChange={(e) => setStaffName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha da Equipe</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Senha do HJK"
                      value={staffPassword}
                      onChange={(e) => setStaffPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    <LogIn className="w-4 h-4 mr-2" /> Entrar no Curso
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="admin">
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email do Administrador</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="dramarinadepaulaneuropediatra@gmail.com"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                    />
                  </div>
                  <Button type="submit" variant="secondary" className="w-full">
                    Acessar Painel
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="relative rounded-2xl overflow-hidden shadow-elevation group">
        <img
          src="https://img.usecurling.com/p/1200/600?q=neonatal%20hospital&color=blue"
          alt="Neonatal Care Context"
          className="w-full h-72 md:h-96 object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/40 flex flex-col justify-center p-6 md:p-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Síndrome de Abstinência Neonatal (SAN): Manejo Baseado em Evidências no CTI Neonatal
          </h1>
          <p className="text-slate-200 max-w-xl mb-8 text-sm md:text-lg leading-relaxed font-medium">
            Dra Marina de Paula Lima Oliveira - neuropediatra da maternidade do Hospital Júlia
            Kubitschek - FHEMIG.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/module/1">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                <PlayCircle className="w-5 h-5 mr-2" /> Começar Curso
              </Button>
            </Link>
            {currentUser.role === 'admin' && (
              <Link to="/admin">
                <Button
                  size="lg"
                  variant="secondary"
                  className="shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 border-none"
                >
                  Painel Administrativo
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 bg-blue-50 text-primary rounded-full flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg text-slate-800">Público-alvo</h3>
            <p className="text-sm text-slate-600">
              Equipe multiprofissional atuante no cuidado intensivo neonatal do HJK.
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 bg-blue-50 text-primary rounded-full flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg text-slate-800">Objetivos</h3>
            <p className="text-sm text-slate-600">
              Padronizar o rastreio (ESC/Finnegan) e o manejo não-farmacológico e medicamentoso da
              SAN.
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 bg-blue-50 text-primary rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg text-slate-800">Tempo Estimado</h3>
            <p className="text-sm text-slate-600">
              Cerca de 90 minutos, divididos em 8 módulos interativos e objetivos.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
