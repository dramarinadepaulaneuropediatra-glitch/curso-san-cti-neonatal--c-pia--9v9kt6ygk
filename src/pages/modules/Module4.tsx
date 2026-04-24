import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ModuleFooter } from '@/components/ModuleFooter'
import { Activity, Stethoscope, CheckCircle2, AlertCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { useAppStore } from '@/stores/useAppStore'

export default function Module4() {
  const { saveAnswer, currentUser } = useAppStore()

  const [selectedCase1, setSelectedCase1] = useState<string | null>(
    currentUser?.answers?.case1 || null,
  )
  const [selectedCase2, setSelectedCase2] = useState<string | null>(
    currentUser?.answers?.case2 || null,
  )

  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogContent, setDialogContent] = useState<{
    title: string
    desc: string
    correct: boolean
  } | null>(null)

  const handleDecision1 = (decision: string) => {
    setSelectedCase1(decision)
    saveAnswer('case1', decision)

    const correct = decision === 'non-pharma'
    setDialogContent({
      title: correct ? 'Conduta Correta' : 'Conduta Inadequada',
      desc: correct
        ? 'Excelente decisão! Otimizar rigorosamente as medidas não-farmacológicas (ambiente escuro, swaddling, alimentação) é a primeira linha de tratamento antes da farmacoterapia, reduzindo a necessidade de opioides.'
        : 'Iniciar morfina prematuramente prolonga o tempo de internação. A recomendação atual baseada na abordagem ESC é otimizar exaustivamente o conforto não-farmacológico primeiro.',
      correct,
    })
    setDialogOpen(true)
  }

  const handleDecision2 = (decision: string) => {
    setSelectedCase2(decision)
    saveAnswer('case2', decision)

    const correct = decision === 'transition'
    setDialogContent({
      title: correct ? 'Conduta Correta' : 'Conduta Inadequada',
      desc: correct
        ? 'A transição farmacológica estruturada e o desmame gradual são essenciais em casos de uso prolongado de Fentanil, considerando a alta potência e o risco de abstinência grave.'
        : 'A suspensão abrupta ou manutenção sem planejamento de desmame expõe o neonato a um alto risco de SAN grave. Um protocolo de transição farmacológica deve ser iniciado.',
      correct,
    })
    setDialogOpen(true)
  }

  return (
    <div className="space-y-8 pb-8">
      <div className="flex items-center gap-3 border-b pb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Activity className="text-primary w-6 h-6" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">
          Módulo 4: Simulação de Casos Clínicos
        </h2>
      </div>

      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-800 text-white p-6">
          <div className="flex items-center gap-2 mb-2">
            <Stethoscope className="w-5 h-5 text-blue-400" />
            <span className="font-semibold text-blue-400 tracking-wider uppercase text-sm">
              Caso 1: RN de 34 semanas
            </span>
          </div>
          <h3 className="text-xl font-bold leading-relaxed">
            Recém-nascido pré-termo (34w), 48h de vida, apresentando hipertonia e tremores leves.
            Escore de Finnegan atual: 6.
          </h3>
        </div>
        <CardContent className="p-6 space-y-6">
          <div className="pt-2 border-t border-slate-100">
            <p className="text-center text-slate-600 mb-6 font-medium">
              Qual deve ser a sua conduta primária neste momento?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant={selectedCase1 === 'pharma' ? 'default' : 'outline'}
                className={`w-full sm:w-auto ${selectedCase1 === 'pharma' ? 'bg-rose-600 hover:bg-rose-700 text-white border-none' : 'border-rose-200 text-rose-700 hover:bg-rose-50'}`}
                onClick={() => handleDecision1('pharma')}
              >
                <AlertCircle className="w-5 h-5 mr-2" /> Iniciar Morfina 0.05mg/kg
              </Button>
              <Button
                size="lg"
                variant={selectedCase1 === 'non-pharma' ? 'default' : 'outline'}
                className={`w-full sm:w-auto ${selectedCase1 === 'non-pharma' ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-none' : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'}`}
                onClick={() => handleDecision1('non-pharma')}
              >
                <CheckCircle2 className="w-5 h-5 mr-2" /> Otimizar rigorosamente as medidas
                não-farmacológicas
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-800 text-white p-6">
          <div className="flex items-center gap-2 mb-2">
            <Stethoscope className="w-5 h-5 text-blue-400" />
            <span className="font-semibold text-blue-400 tracking-wider uppercase text-sm">
              Caso 2: RN de 37 semanas (Transição de Fentanil)
            </span>
          </div>
          <h3 className="text-xl font-bold leading-relaxed">
            Recém-nascido a termo (37w) em uso contínuo de Fentanil há 8 dias no CTI, apresentando
            sinais iniciais de agitação na tentativa de redução da dose.
          </h3>
        </div>
        <CardContent className="p-6 space-y-6">
          <div className="pt-2 border-t border-slate-100">
            <p className="text-center text-slate-600 mb-6 font-medium">
              Qual a conduta mais segura baseada em evidências?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant={selectedCase2 === 'suspend' ? 'default' : 'outline'}
                className={`w-full sm:w-auto ${selectedCase2 === 'suspend' ? 'bg-rose-600 hover:bg-rose-700 text-white border-none' : 'border-rose-200 text-rose-700 hover:bg-rose-50'}`}
                onClick={() => handleDecision2('suspend')}
              >
                <AlertCircle className="w-5 h-5 mr-2" /> Suspender Fentanil abruptamente
              </Button>
              <Button
                size="lg"
                variant={selectedCase2 === 'transition' ? 'default' : 'outline'}
                className={`w-full sm:w-auto ${selectedCase2 === 'transition' ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-none' : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'}`}
                onClick={() => handleDecision2('transition')}
              >
                <CheckCircle2 className="w-5 h-5 mr-2" /> Iniciar protocolo de transição
                farmacológica
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              {dialogContent?.correct ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" /> {dialogContent.title}
                </>
              ) : (
                <>
                  <AlertCircle className="w-6 h-6 text-rose-500" /> {dialogContent?.title}
                </>
              )}
            </DialogTitle>
            <DialogDescription className="pt-4 text-slate-700 text-base leading-relaxed">
              {dialogContent?.desc}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setDialogOpen(false)}>Fechar e Continuar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ModuleFooter prev="/module/3" next="/module/5" moduleId={4} />
    </div>
  )
}
