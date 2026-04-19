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

export default function Module5() {
  const { saveAnswer, currentUser } = useAppStore()
  const [showFeedback, setShowFeedback] = useState(false)
  const [selectedOption, setSelectedOption] = useState<
    'pharmacological' | 'non-pharmacological' | null
  >((currentUser?.answers?.module5 as 'pharmacological' | 'non-pharmacological') || null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleDecision = (decision: 'pharmacological' | 'non-pharmacological') => {
    setSelectedOption(decision)
    saveAnswer('module5', decision)
    setDialogOpen(true)
    setShowFeedback(true)
  }

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center gap-3 border-b pb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Activity className="text-primary w-6 h-6" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">
          Módulo 5: Simulação de Caso Clínico
        </h2>
      </div>

      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-800 text-white p-6">
          <div className="flex items-center gap-2 mb-2">
            <Stethoscope className="w-5 h-5 text-blue-400" />
            <span className="font-semibold text-blue-400 tracking-wider uppercase text-sm">
              Cenário Clínico
            </span>
          </div>
          <h3 className="text-xl font-bold leading-relaxed">
            Recém-nascido, 48h de vida, apresentando hipertonia e dificuldade alimentar (má
            aceitação da dieta).
          </h3>
        </div>
        <CardContent className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                1. Avaliação via FNAST (Finnegan)
              </h4>
              <p className="text-sm text-slate-600">
                Ao aplicar a escala de Finnegan, o recém-nascido pontua para hipertonia (2) e má
                alimentação (2), além de tremores leves ao manuseio (1). O escore atual isolado é 5,
                porém com viés de crescimento se não houver manejo correto.
              </p>
            </div>

            <div className="space-y-4 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
              <h4 className="font-semibold text-emerald-800 flex items-center gap-2">
                2. Abordagem ESC (Eat, Sleep, Console)
              </h4>
              <p className="text-sm text-slate-600">
                Avaliando pela funcionalidade: a criança está com dificuldade de mamar (Eat
                comprometido), mas ainda é possível consolá-la em menos de 10 minutos com técnicas
                adequadas, e consegue dormir após ser enrolada e mantida em ambiente calmo.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <h4 className="text-lg font-bold text-slate-800 mb-4 text-center">Decisão Final</h4>
            <p className="text-center text-slate-500 mb-6 text-sm">
              Com base nas evidências atuais e no protocolo institucional, qual deve ser a sua
              conduta primária neste momento?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant={selectedOption === 'pharmacological' ? 'default' : 'outline'}
                className={`w-full sm:w-auto ${selectedOption === 'pharmacological' ? 'bg-rose-600 hover:bg-rose-700 text-white border-none' : 'border-rose-200 text-rose-700 hover:bg-rose-50'}`}
                onClick={() => handleDecision('pharmacological')}
              >
                <AlertCircle className="w-5 h-5 mr-2" />
                Iniciar Morfina (Farmacológico)
              </Button>
              <Button
                size="lg"
                variant={selectedOption === 'non-pharmacological' ? 'default' : 'outline'}
                className={`w-full sm:w-auto ${selectedOption === 'non-pharmacological' ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-none' : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'}`}
                onClick={() => handleDecision('non-pharmacological')}
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Aumentar Medidas de Conforto
              </Button>
            </div>
          </div>

          {selectedOption && showFeedback && (
            <div className="mt-4 text-center">
              <Button
                variant="link"
                onClick={() => setDialogOpen(true)}
                className="text-primary font-medium"
              >
                Rever Feedback da Decisão
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              {selectedOption === 'non-pharmacological' ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" /> Conduta Correta
                </>
              ) : (
                <>
                  <AlertCircle className="w-6 h-6 text-rose-500" /> Conduta Inadequada
                </>
              )}
            </DialogTitle>
            <DialogDescription className="pt-4 text-slate-700 text-base leading-relaxed">
              {selectedOption === 'non-pharmacological' ? (
                <>
                  <p className="mb-3">
                    <strong>Excelente decisão!</strong> Otimizar as medidas não-farmacológicas
                    (ambiente escuro, contato pele a pele, swaddling e alimentação fracionada) é a
                    primeira linha de tratamento.
                  </p>
                  <p>
                    Segundo o estudo <strong>ESC-NOW</strong>, focar na capacidade funcional da
                    criança (comer, dormir, consolar) antes de instituir farmacoterapia reduz
                    significativamente a necessidade de opioides e o tempo de internação, sem
                    aumentar eventos adversos.
                  </p>
                </>
              ) : (
                <>
                  <p className="mb-3">
                    <strong>Atenção:</strong> Iniciar morfina prematuramente pode prolongar
                    desnecessariamente o tempo de internação e expor o neonato aos riscos do
                    opioide.
                  </p>
                  <p>
                    Embora apresente hipertonia e dificuldade alimentar, o escore de Finnegan é
                    baixo (&lt; 8) e a criança ainda é consolável (ESC). A recomendação atual
                    baseada no estudo <strong>ESC-NOW</strong> é otimizar exaustivamente o conforto
                    não-farmacológico antes da farmacoterapia.
                  </p>
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setDialogOpen(false)}>Fechar e Continuar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ModuleFooter prev="/module/4" next="/module/6" moduleId={5} />
    </div>
  )
}
