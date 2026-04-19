import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ModuleFooter } from '@/components/ModuleFooter'
import { useToast } from '@/hooks/use-toast'
import { Stethoscope } from 'lucide-react'

export default function Module1() {
  const [feedback, setFeedback] = useState('')
  const { toast } = useToast()

  const handleSubmit = () => {
    if (!feedback.trim()) return
    toast({
      title: 'Feedback registrado com sucesso!',
      description: 'Obrigado por compartilhar sua perspectiva clínica.',
    })
    setFeedback('')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b pb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Stethoscope className="text-primary w-6 h-6" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">
          Módulo 1: Introdução
        </h2>
      </div>

      <div className="prose max-w-none text-slate-600 leading-relaxed text-base md:text-lg space-y-4">
        <p>
          A <strong>Síndrome de Abstinência Neonatal (SAN)</strong> é um conjunto de problemas que
          afetam recém-nascidos expostos a drogas prescritas ou ilícitas durante a gestação,
          principalmente os opioides.
        </p>
        <p>
          Com o aumento global da prescrição e uso indevido de opioides, a incidência da SAN nos CTI
          Neonatais aumentou dramaticamente, exigindo protocolos robustos para garantir o bem-estar
          do bebê e reduzir o tempo de internação.
        </p>
      </div>

      <Card className="mt-8 border-primary/20 shadow-sm bg-blue-50/30">
        <CardHeader>
          <CardTitle className="text-primary text-xl">
            Interatividade: Quebra-gelo Clínico
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <label className="text-sm font-medium text-slate-700 block">
            Qual a maior dificuldade que você já enfrentou ao lidar com um caso de SAN?
          </label>
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Ex: Distinguir choro de fome do choro neurológico..."
            className="min-h-[120px] bg-white resize-none"
          />
          <div className="flex justify-end">
            <Button onClick={handleSubmit} disabled={!feedback.trim()}>
              Enviar Relato
            </Button>
          </div>
        </CardContent>
      </Card>

      <ModuleFooter prev="/" next="/module/2" moduleId={1} />
    </div>
  )
}
