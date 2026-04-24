import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppStore } from '@/stores/useAppStore'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { ShieldCheck, Users, Key, Award, Activity } from 'lucide-react'

export default function AdminPage() {
  const { currentUser, users, staffPassword, changePassword } = useAppStore()
  const { toast } = useToast()
  const [newPassword, setNewPassword] = useState(staffPassword)

  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/" />
  }

  const staffUsers = users.filter((u) => u.role === 'staff')

  const handleSavePassword = () => {
    changePassword(newPassword)
    toast({ title: 'Sucesso', description: 'Senha da equipe atualizada.' })
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-3 border-b pb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <ShieldCheck className="text-primary w-6 h-6" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">
          Painel Administrativo
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-slate-500" /> Estatísticas da Equipe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">{staffUsers.length}</div>
            <p className="text-sm text-slate-500 mt-1 font-medium">Profissionais registrados</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Key className="w-5 h-5 text-slate-500" /> Controle de Acesso
            </CardTitle>
            <CardDescription>Gerencie a senha compartilhada da equipe.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 max-w-sm">
              <Input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="text"
              />
              <Button onClick={handleSavePassword} variant="secondary">
                Atualizar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md border-slate-200">
        <CardHeader className="bg-slate-50/50 border-b">
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="w-5 h-5 text-slate-500" /> Progresso e Avaliações
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 sm:p-6 overflow-x-auto">
          <div className="rounded-md border min-w-[700px]">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="font-bold text-slate-700">Profissional</TableHead>
                  <TableHead className="font-bold text-slate-700">Progresso</TableHead>
                  <TableHead className="font-bold text-slate-700">Avaliação Final</TableHead>
                  <TableHead className="font-bold text-slate-700">Tentativas</TableHead>
                  <TableHead className="font-bold text-slate-700">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {staffUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                      Nenhum profissional acessou o curso ainda.
                    </TableCell>
                  </TableRow>
                ) : (
                  staffUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-slate-50">
                      <TableCell className="font-medium text-slate-800">{user.name}</TableCell>
                      <TableCell>{user.completedModules.length} / 8</TableCell>
                      <TableCell>
                        {user.quizScore !== null ? (
                          <span className="font-semibold text-slate-700">
                            {user.quizScore * 10}%
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400 font-medium">Pendente</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {user.quizAttempts > 0 ? (
                          <span className="font-medium text-slate-600">{user.quizAttempts}/2</span>
                        ) : (
                          <span className="text-slate-300">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {user.quizScore !== null && user.quizScore >= 7 ? (
                          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-none px-2 py-0.5 shadow-none font-medium flex items-center gap-1 w-fit">
                            <Award className="w-3 h-3" /> Certificado
                          </Badge>
                        ) : (user.quizAttempts || 0) >= 2 ? (
                          <Badge
                            variant="destructive"
                            className="border-none px-2 py-0.5 shadow-none font-medium"
                          >
                            Reprovado
                          </Badge>
                        ) : (
                          <span className="text-slate-300">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
