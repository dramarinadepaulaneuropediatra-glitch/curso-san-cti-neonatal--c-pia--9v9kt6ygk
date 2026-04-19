import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { ModuleFooter } from '@/components/ModuleFooter'
import { AlertCircle, FileText } from 'lucide-react'

export default function Module3() {
  const [answer, setAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = () => {
    if (!answer.trim()) return
    setSubmitted(true)
    toast({ title: 'Reflexão salva!', description: 'Confira o gabarito sugerido abaixo.' })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b pb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <AlertCircle className="text-primary w-6 h-6" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">
          Módulo 3: Fatores Predisponentes
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        <div className="flex-1 space-y-4 text-slate-600 prose max-w-none text-base md:text-lg leading-relaxed">
          <p>
            A gravidade e o momento de início da SAN dependem de múltiplos fatores maternos,
            placentários e fetais. O metabolismo imaturo do recém-nascido atrasa a excreção das
            substâncias.
          </p>
          <p>
            Um dos maiores desafios atuais no CTI Neonatal é o <strong>Poliuso Materno</strong>. A
            exposição intrauterina a uma combinação de opioides com outras drogas (ex: nicotina,
            ISRS, benzodiazepínicos ou gabapentina) altera significativamente a apresentação
            clássica da síndrome.
          </p>
          <p>
            Essas combinações frequentemente resultam em uma síndrome mista de abstinência e
            toxicidade, prolongando o tempo de internação e dificultando a titulação da medicação de
            resgate.
          </p>
        </div>
        <div className="lg:w-1/3 bg-blue-50/50 rounded-2xl p-6 flex flex-col items-center justify-center border border-blue-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/40 rounded-bl-full -z-10"></div>
          <img
            src="https://img.usecurling.com/i?q=maternal%20care&color=blue&shape=lineal-color"
            alt="Fatores Maternos"
            className="w-24 h-24 object-contain opacity-80 mb-4"
          />
          <span className="text-center font-medium text-slate-700">Fatores Maternos & Poliuso</span>
        </div>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50">
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" /> Reflexão Clínica
          </CardTitle>
          <CardDescription className="text-base text-slate-600 mt-2">
            Descreva brevemente: Como a poliuso materna pode complicar o quadro clínico da SAN?
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <Textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Sua análise profissional aqui..."
            disabled={submitted}
            className={`min-h-[140px] text-base resize-none ${submitted ? 'bg-slate-50 text-slate-500' : 'bg-white'}`}
          />
          {!submitted ? (
            <div className="flex justify-end">
              <Button onClick={handleSubmit} className="px-8">
                Enviar Análise
              </Button>
            </div>
          ) : (
            <div className="mt-6 p-5 bg-emerald-50 border border-emerald-100 rounded-xl space-y-3 animate-fade-in-up">
              <h4 className="font-bold text-emerald-800 flex items-center gap-2">
                Gabarito Baseado em Evidências
              </h4>
              <p className="text-emerald-700 leading-relaxed text-sm md:text-base">
                A poliuso complica a avaliação porque sobrepõe diferentes quadros de abstinência
                (ex: abstinência de opioides + síndrome de descontinuação de ISRS).
                Farmacologicamente, ela frequentemente resulta em sintomas refratários à monoterapia
                com morfina, exigindo precocemente a introdução de medicamentos adjuvantes, como o
                Fenobarbital, e prolongando substancialmente o período de internação do
                recém-nascido.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <ModuleFooter prev="/module/2" next="/module/4" moduleId={3} />
    </div>
  )
}
