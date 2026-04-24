import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { ModuleFooter } from '@/components/ModuleFooter'
import { FileQuestion, Award, Download, CheckCircle2 } from 'lucide-react'
import { useAppStore } from '@/stores/useAppStore'

const questions = [
  {
    id: 'q1',
    text: 'Sobre a escala FNAST (Finnegan), qual é considerada sua principal limitação?',
    options: [
      { value: 'a', label: 'Avalia apenas sinais gastrointestinais, não medindo a dor.' },
      {
        value: 'b',
        label:
          'Alta complexidade, excessiva subjetividade e tendência a superestimar a necessidade de medicamentos.',
      },
      { value: 'c', label: 'Não tem aplicabilidade para neonatos a termo.' },
    ],
    correct: 'b',
  },
  {
    id: 'q2',
    text: 'Quais são os 3 domínios centrais avaliados pela abordagem ESC?',
    options: [
      { value: 'a', label: 'Eat (Comer), Sleep (Dormir), Console (Consolar).' },
      { value: 'b', label: 'Energy (Energia), Suck (Sugar), Cry (Chorar).' },
      { value: 'c', label: 'Environment (Ambiente), Swaddle (Enrolar), Care (Cuidar).' },
    ],
    correct: 'a',
  },
  {
    id: 'q3',
    text: 'No estudo ESC-NOW (2023), qual foi o impacto clínico documentado ao usar a abordagem ESC em comparação com o cuidado habitual?',
    options: [
      {
        value: 'a',
        label:
          'Nenhuma diferença estatística significativa foi encontrada nos tempos de internação.',
      },
      { value: 'b', label: 'Aumento na ocorrência de convulsões em recém-nascidos prematuros.' },
      {
        value: 'c',
        label:
          'Redução de 6,7 dias no tempo até a alta e expressiva diminuição na necessidade de farmacoterapia.',
      },
    ],
    correct: 'c',
  },
]

export default function Module8() {
  const { currentUser, saveQuizScore } = useAppStore()
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const attempts = currentUser?.quizAttempts || 0
  const score = currentUser?.quizScore || 0
  const passed = score >= 7
  const noMoreAttempts = attempts >= 2 && !passed
  const [submitted, setSubmitted] = useState(passed || noMoreAttempts)

  const handleSelect = (qId: string, val: string) => {
    if (submitted) return
    setAnswers((prev) => ({ ...prev, [qId]: val }))
  }

  const handleSubmit = () => {
    let correctCount = 0
    questions.forEach((q) => {
      if (answers[q.id] === q.correct) correctCount++
    })
    const finalScore = Math.round((correctCount / questions.length) * 10)
    saveQuizScore(finalScore)
    setSubmitted(true)
  }

  const allAnswered = Object.keys(answers).length === questions.length

  if (passed) {
    return (
      <div className="space-y-6 pb-8 text-center animate-fade-in-up">
        <div className="max-w-3xl mx-auto p-8 bg-white border border-slate-200 rounded-lg shadow-sm mt-10 print:mt-0 print:border-2 print:border-black print:shadow-none print:w-full relative">
          <div className="absolute top-8 right-8 print:hidden">
            <Award className="w-16 h-16 text-yellow-500 opacity-20" />
          </div>

          <div className="mb-8 flex justify-center">
            <img
              src="https://img.usecurling.com/i?q=fhemig&color=blue&shape=fill"
              alt="FHEMIG Logo"
              className="h-16 object-contain"
            />
          </div>

          <h2 className="text-3xl font-serif font-bold text-slate-800 mb-6 uppercase tracking-widest text-primary print:text-black">
            Certificado
          </h2>

          <div className="space-y-6 my-10 text-slate-700 print:text-black text-lg leading-relaxed">
            <p>Certificamos que</p>
            <p className="text-4xl font-bold font-serif italic border-b-2 border-slate-200 pb-2 mx-12 inline-block">
              {currentUser?.name}
            </p>
            <p className="max-w-2xl mx-auto mt-6">
              concluiu com sucesso o curso de atualização institucional:
            </p>
            <p className="text-xl font-bold uppercase tracking-wide">
              Curso de Manejo da Síndrome de Abstinência Neonatal (SAN) do CTI do HJK
            </p>
            <p>
              Carga horária: <strong>2 horas</strong> | Aproveitamento:{' '}
              <strong>{score * 10}%</strong>
            </p>
          </div>

          <div className="mt-16 pt-8 px-8 grid grid-cols-3 gap-4">
            <div className="text-center px-2">
              <div className="border-t border-slate-400 w-full mb-2"></div>
              <p className="text-[11px] font-bold text-slate-800 uppercase print:text-black leading-tight">
                Dra. Marina de Paula Lima Oliveira
              </p>
              <p className="text-[9px] text-slate-500 print:text-slate-700 mt-1 leading-tight">
                neuropediatra da maternidade do Hospital Júlia Kubitischek
              </p>
            </div>
            <div className="text-center px-2">
              <div className="border-t border-slate-400 w-full mb-2"></div>
              <p className="text-[11px] font-bold text-slate-800 uppercase print:text-black leading-tight">
                Dra. Letícia Coelho
              </p>
              <p className="text-[9px] text-slate-500 print:text-slate-700 mt-1 leading-tight">
                médica coordenadora da maternidade do Hospital Júlia Kubitischek
              </p>
            </div>
            <div className="text-center px-2">
              <div className="border-t border-slate-400 w-full mb-2"></div>
              <p className="text-[11px] font-bold text-slate-800 uppercase print:text-black leading-tight">
                Nilma Matozinhos
              </p>
              <p className="text-[9px] text-slate-500 print:text-slate-700 mt-1 leading-tight">
                gerente da maternidade do CTI neonatal do Hospital Júlia Kubitischek
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8 print:hidden">
          <Button
            onClick={() => window.print()}
            className="bg-primary hover:bg-primary/90 shadow-md"
          >
            <Download className="w-4 h-4 mr-2" /> Exportar Certificado (PDF)
          </Button>
        </div>

        <div className="print:hidden mt-12 text-left">
          <ModuleFooter prev="/module/7" moduleId={8} />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-8">
      <div className="flex items-center gap-3 border-b pb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <FileQuestion className="text-primary w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold tracking-tight text-slate-800">
          Módulo 8: Avaliação Final e Certificação
        </h3>
      </div>

      <p className="text-slate-600 leading-relaxed mb-6 bg-slate-50 p-4 rounded-lg border border-slate-100">
        Responda às questões abaixo para gerar seu certificado de conclusão. É necessário um acerto
        de no mínimo 70% para aprovação.
        <br />
        <strong className="text-primary">Tentativas utilizadas: {attempts} / 2</strong>
      </p>

      {noMoreAttempts && (
        <div className="p-4 bg-rose-50 text-rose-800 rounded-lg mb-6 border border-rose-200 shadow-sm font-medium flex gap-3">
          <FileQuestion className="w-6 h-6 shrink-0" />
          <div>
            <p>Você atingiu o limite máximo de tentativas (2).</p>
            <p className="text-sm mt-1 opacity-90">
              Por favor, entre em contato com a coordenação para revisão do conteúdo e liberação de
              uma nova tentativa.
            </p>
          </div>
        </div>
      )}

      {submitted && !passed && !noMoreAttempts && (
        <div className="p-4 bg-orange-50 text-orange-800 rounded-lg mb-6 border border-orange-200 shadow-sm font-medium">
          Atenção: Sua pontuação foi {score * 10}%. Você não atingiu o mínimo (70%) necessário. Você
          ainda possui {2 - attempts} tentativa(s). Revise os módulos e tente novamente.
          <div className="mt-4">
            <Button
              onClick={() => {
                setSubmitted(false)
                setAnswers({})
              }}
              variant="outline"
              className="border-orange-300 text-orange-800 hover:bg-orange-100"
            >
              Tentar Novamente
            </Button>
          </div>
        </div>
      )}

      {!noMoreAttempts && (!submitted || (submitted && !passed)) && (
        <div className="space-y-8">
          {questions.map((q, idx) => (
            <Card key={q.id} className="border-slate-200 shadow-sm">
              <CardHeader className="pb-3 bg-slate-50/50">
                <CardTitle className="text-base text-slate-800 leading-relaxed">
                  <span className="text-primary font-bold mr-2">{idx + 1}.</span>
                  {q.text}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <RadioGroup
                  value={answers[q.id]}
                  onValueChange={(val) => handleSelect(q.id, val)}
                  className="space-y-3"
                  disabled={submitted}
                >
                  {q.options.map((opt) => (
                    <div
                      key={opt.value}
                      className={`flex items-start space-x-3 p-3 rounded-lg border transition-colors ${answers[q.id] === opt.value ? 'bg-primary/5 border-primary/30' : 'border-slate-100 hover:bg-slate-50'}`}
                    >
                      <RadioGroupItem
                        value={opt.value}
                        id={`${q.id}-${opt.value}`}
                        className="mt-1 shrink-0"
                      />
                      <Label
                        htmlFor={`${q.id}-${opt.value}`}
                        className="font-normal text-slate-700 text-sm md:text-base cursor-pointer leading-relaxed"
                      >
                        {opt.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          ))}

          {!submitted && (
            <div className="pt-4 flex justify-end">
              <Button
                size="lg"
                onClick={handleSubmit}
                disabled={!allAnswered}
                className="w-full sm:w-auto shadow-md"
              >
                Enviar Respostas
              </Button>
            </div>
          )}
        </div>
      )}

      <div className="print:hidden">
        <ModuleFooter prev="/module/7" moduleId={8} />
      </div>
    </div>
  )
}
