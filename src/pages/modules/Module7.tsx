import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { ModuleFooter } from '@/components/ModuleFooter'
import { FileQuestion, Award, Download, CheckCircle2, HeartHandshake } from 'lucide-react'
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
          'Redução de 6,7 dias no tempo até a alta e expressiva diminuição na necessidade de farmacoterapia.',
      },
    ],
    correct: 'c',
  },
]

export default function Module7() {
  const { currentUser, saveQuizScore } = useAppStore()
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(currentUser?.quizScore !== null)
  const score = currentUser?.quizScore || 0

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

  if (submitted && score >= 7) {
    return (
      <div className="space-y-6 pb-8 text-center animate-fade-in-up">
        <div className="max-w-2xl mx-auto p-8 bg-white border-2 border-primary/20 rounded-2xl shadow-xl mt-10 print:mt-0 print:border-none print:shadow-none print:w-full">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 print:hidden">
            <Award className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-slate-800 mb-2">
            Certificado de Conclusão
          </h2>
          <p className="text-slate-500 mb-8 font-medium">
            Hospital Júlia Kubitschek - CTI Neonatal
          </p>

          <div className="space-y-4 my-8">
            <p className="text-lg text-slate-600">Certificamos que</p>
            <p className="text-4xl font-bold text-primary italic border-b pb-4 mx-12">
              {currentUser?.name}
            </p>
            <p className="text-slate-600 max-w-lg mx-auto leading-relaxed mt-4">
              concluiu com aproveitamento de <strong>{score * 10}%</strong> o curso de atualização
              de protocolos:
              <br />
              <br />
              <strong>Síndrome de Abstinência Neonatal (SAN): Manejo Baseado em Evidências</strong>.
            </p>
          </div>

          <div className="mt-12 flex justify-between items-end border-t pt-8 px-8 border-slate-200">
            <div className="text-left">
              <p className="text-sm font-semibold text-slate-800">
                Dra. Marina de Paula L. Oliveira
              </p>
              <p className="text-xs text-slate-500">Neuropediatra Elaboradora</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-800">{new Date().toLocaleDateString('pt-BR')}</p>
              <p className="text-xs text-slate-500">Data de Emissão</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8 print:hidden">
          <Button onClick={() => window.print()} className="bg-primary hover:bg-primary/90">
            <Download className="w-4 h-4 mr-2" /> Salvar Certificado (PDF)
          </Button>
        </div>

        <div className="print:hidden mt-12 text-left">
          <ModuleFooter prev="/module/6" next="/module/8" moduleId={7} />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-12 pb-8">
      {/* Seção Guia Visual */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b pb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <HeartHandshake className="text-primary w-6 h-6" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">
            Módulo 7: Manejo Não-Farmacológico e Avaliação
          </h2>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-slate-800">
            Guia Visual de Medidas de Conforto
          </h3>
          <p className="text-slate-600 leading-relaxed">
            As intervenções não-farmacológicas constituem o pilar inicial e contínuo no tratamento
            da Síndrome de Abstinência Neonatal.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <img
                src="https://img.usecurling.com/p/400/300?q=baby%20swaddle"
                alt="Swaddling (Enrolamento)"
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <h4 className="font-bold text-slate-800">Swaddling (Enrolamento)</h4>
                <p className="text-sm text-slate-600 mt-1">
                  Contenção motora suave que proporciona segurança, reduz tremores, previne
                  escoriações e facilita a autorregulação.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <img
                src="https://img.usecurling.com/p/400/300?q=skin%20to%20skin%20baby"
                alt="Contato Pele a Pele"
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <h4 className="font-bold text-slate-800">Contato Pele a Pele</h4>
                <p className="text-sm text-slate-600 mt-1">
                  Promove estabilidade autonômica, melhora os padrões de respiração e facilita o
                  aleitamento materno e o consolo.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <img
                src="https://img.usecurling.com/p/400/300?q=baby%20therapeutic%20positioning"
                alt="Posicionamento Terapêutico"
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <h4 className="font-bold text-slate-800">Posicionamento Terapêutico</h4>
                <p className="text-sm text-slate-600 mt-1">
                  Manutenção do neonato em postura fletida (em "C"), reduzindo o estresse, a
                  agitação motora e o choro contínuo.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Seção Quiz */}
      <section className="space-y-6 pt-6 border-t border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FileQuestion className="text-primary w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-800">
            Avaliação Institucional Final
          </h3>
        </div>

        <p className="text-slate-600 leading-relaxed mb-6">
          Responda às questões abaixo para testar seus conhecimentos e gerar seu certificado de
          conclusão. É necessário um acerto de no mínimo 70% para aprovação.
        </p>

        {submitted && score < 7 && (
          <div className="p-4 bg-rose-50 text-rose-800 rounded-lg mb-6 border border-rose-200 shadow-sm font-medium">
            Atenção: Sua pontuação foi {score * 10}%. Você não atingiu o mínimo necessário para a
            certificação. Por favor, revise os módulos e tente novamente em breve.
          </div>
        )}

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
                      {submitted && q.correct === opt.value && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-auto shrink-0" />
                      )}
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          ))}
        </div>

        {!submitted && (
          <div className="pt-4 flex justify-end">
            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="w-full sm:w-auto shadow-md"
            >
              Enviar Respostas e Concluir
            </Button>
          </div>
        )}

        {!submitted && <ModuleFooter prev="/module/6" next="/module/8" moduleId={7} />}
      </section>
    </div>
  )
}
