import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { ModuleFooter } from '@/components/ModuleFooter'
import { useState, useMemo } from 'react'
import { Scale, Download, AlertCircle, CheckCircle2, Calculator } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const finneganItems = [
  {
    category: 'Sistema Nervoso Central',
    items: [
      {
        id: 'cry',
        label: '1. Choro',
        options: [
          { label: 'Normal (0)', value: 0 },
          { label: 'Agudo (2)', value: 2 },
          { label: 'Agudo e contínuo (3)', value: 3 },
        ],
      },
      {
        id: 'sleep',
        label: '2. Sono após dieta',
        options: [
          { label: 'Normal (0)', value: 0 },
          { label: '< 3h (1)', value: 1 },
          { label: '< 2h (2)', value: 2 },
          { label: '< 1h (3)', value: 3 },
        ],
      },
      {
        id: 'moro',
        label: '3. Reflexo de Moro',
        options: [
          { label: 'Normal (0)', value: 0 },
          { label: 'Hiperativo (2)', value: 2 },
          { label: 'Marcadamente hiperativo (3)', value: 3 },
        ],
      },
      {
        id: 'tremors_disturbed',
        label: '4. Tremores quando manuseado',
        options: [
          { label: 'Nenhum (0)', value: 0 },
          { label: 'Leves (1)', value: 1 },
          { label: 'Moderados/Severos (2)', value: 2 },
        ],
      },
      {
        id: 'tremors_undisturbed',
        label: '5. Tremores em repouso',
        options: [
          { label: 'Nenhum (0)', value: 0 },
          { label: 'Leves (3)', value: 3 },
          { label: 'Moderados/Severos (4)', value: 4 },
        ],
      },
      {
        id: 'tone',
        label: '6. Tônus muscular',
        options: [
          { label: 'Normal (0)', value: 0 },
          { label: 'Aumentado/Hipertonia (2)', value: 2 },
        ],
      },
      {
        id: 'excoriation',
        label: '7. Escoriações',
        options: [
          { label: 'Não (0)', value: 0 },
          { label: 'Sim (1)', value: 1 },
        ],
      },
      {
        id: 'myoclonic',
        label: '8. Mioclonias',
        options: [
          { label: 'Não (0)', value: 0 },
          { label: 'Sim (3)', value: 3 },
        ],
      },
      {
        id: 'convulsions',
        label: '9. Convulsões generalizadas',
        options: [
          { label: 'Não (0)', value: 0 },
          { label: 'Sim (5)', value: 5 },
        ],
      },
    ],
  },
  {
    category: 'Metabólico, Vasomotor e Respiratório',
    items: [
      {
        id: 'sweating',
        label: '10. Sudorese',
        options: [
          { label: 'Não (0)', value: 0 },
          { label: 'Sim (1)', value: 1 },
        ],
      },
      {
        id: 'fever',
        label: '11. Febre',
        options: [
          { label: 'Normal (0)', value: 0 },
          { label: '37.3 a 37.7°C (1)', value: 1 },
          { label: '≥ 37.8°C (2)', value: 2 },
        ],
      },
      {
        id: 'yawning',
        label: '12. Bocejos (>3x)',
        options: [
          { label: 'Não (0)', value: 0 },
          { label: 'Sim (1)', value: 1 },
        ],
      },
      {
        id: 'mottling',
        label: '13. Pele mosqueada',
        options: [
          { label: 'Não (0)', value: 0 },
          { label: 'Sim (1)', value: 1 },
        ],
      },
      {
        id: 'nasal_stuff',
        label: '14. Congestão nasal',
        options: [
          { label: 'Não (0)', value: 0 },
          { label: 'Sim (1)', value: 1 },
        ],
      },
      {
        id: 'sneezing',
        label: '15. Espirros (>3x)',
        options: [
          { label: 'Não (0)', value: 0 },
          { label: 'Sim (1)', value: 1 },
        ],
      },
      {
        id: 'nasal_flaring',
        label: '16. Batimento de aletas',
        options: [
          { label: 'Não (0)', value: 0 },
          { label: 'Sim (2)', value: 2 },
        ],
      },
      {
        id: 'rr',
        label: '17. Frequência respiratória',
        options: [
          { label: 'Normal (0)', value: 0 },
          { label: '> 60 rpm (1)', value: 1 },
          { label: '> 60 rpm com retrações (2)', value: 2 },
        ],
      },
    ],
  },
  {
    category: 'Gastrointestinal',
    items: [
      {
        id: 'sucking',
        label: '18. Sucção excessiva',
        options: [
          { label: 'Não (0)', value: 0 },
          { label: 'Sim (1)', value: 1 },
        ],
      },
      {
        id: 'feeding',
        label: '19. Má alimentação',
        options: [
          { label: 'Não (0)', value: 0 },
          { label: 'Sim (2)', value: 2 },
        ],
      },
      {
        id: 'vomiting',
        label: '20. Vômitos/Regurgitação',
        options: [
          { label: 'Nenhum (0)', value: 0 },
          { label: 'Regurgitação (2)', value: 2 },
          { label: 'Vômito em jato (3)', value: 3 },
        ],
      },
      {
        id: 'stools',
        label: '21. Fezes',
        options: [
          { label: 'Normal (0)', value: 0 },
          { label: 'Amolecidas (2)', value: 2 },
          { label: 'Aquosas (3)', value: 3 },
        ],
      },
    ],
  },
]

export default function Module4() {
  const [finneganScores, setFinneganScores] = useState<Record<string, number>>({})

  const totalScore = useMemo(() => {
    return Object.values(finneganScores).reduce((acc, curr) => acc + curr, 0)
  }, [finneganScores])

  const handleScoreChange = (id: string, value: string) => {
    setFinneganScores((prev) => ({ ...prev, [id]: parseInt(value, 10) }))
  }

  const handleExportPDF = () => {
    window.print()
  }

  return (
    <div className="space-y-6 pb-8 print:bg-white print:text-black">
      <div className="flex items-center justify-between border-b pb-4 print:border-none">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg print:hidden">
            <Scale className="text-primary w-6 h-6" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">
            Módulo 4: Ferramentas de Avaliação (FNAST vs ESC)
          </h2>
        </div>
        <Button onClick={handleExportPDF} variant="outline" className="hidden sm:flex print:hidden">
          <Download className="w-4 h-4 mr-2" />
          Exportar para PDF
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8 mt-6 print:block print:space-y-6">
        <Card className="border-slate-200 shadow-sm print:shadow-none print:border">
          <CardHeader className="pb-3 bg-slate-50/50 print:bg-white border-b print:border-slate-300">
            <CardTitle className="text-lg text-primary flex items-center gap-2 print:text-black">
              FNAST (Finnegan)
            </CardTitle>
            <CardDescription>Finnegan Neonatal Abstinence Scoring Tool</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-slate-700 space-y-4 pt-4 leading-relaxed">
            <p>
              Criada na década de 1970, a escala FNAST consiste em uma ferramenta de{' '}
              <strong>21 itens</strong> que avalia sinais divididos em 3 domínios principais:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600 mb-4">
              <li>
                <strong>SNC:</strong> Choro agudo contínuo, sono reduzido, reflexo de Moro
                hiperativo, tremores, hipertonia, escoriações, mioclonias, convulsões.
              </li>
              <li>
                <strong>Metabólico/Vasomotor/Respiratório:</strong> Sudorese, febre, bocejos
                frequentes, pele mosqueada, congestão nasal, espirros, batimento de aletas nasais,
                taquipneia.
              </li>
              <li>
                <strong>Gastrointestinal:</strong> Sucção excessiva, má alimentação, regurgitação,
                vômitos em jato, fezes amolecidas/aquosas.
              </li>
            </ul>
            <div className="bg-orange-50 p-4 rounded-lg text-orange-900 border border-orange-200 mt-4 mb-4 print:border-slate-300 print:bg-transparent print:text-black">
              <h4 className="font-semibold mb-2">Guia de Ação (Critérios Revisados):</h4>
              <p className="text-sm">
                Início da farmacoterapia tradicionalmente considerado quando as pontuações atingem{' '}
                <strong>≥ 8</strong>.
              </p>
            </div>
            <div className="bg-rose-50 p-4 rounded-lg text-rose-800 border border-rose-100 mt-4 print:border-slate-300 print:bg-transparent print:text-black">
              <h4 className="font-semibold flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 print:hidden" /> Limitações Críticas
              </h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Alta complexidade e tempo de aplicação.</li>
                <li>Extremamente subjetiva (variabilidade inter-observador).</li>
                <li>Frequente superestimação da necessidade de medicamentos.</li>
                <li>Falta de padronização universal em sua aplicação.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm md:col-span-2 print:hidden">
          <CardHeader className="bg-slate-50 border-b">
            <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
              <Calculator className="w-5 h-5 text-primary" />
              Ferramenta Interativa: Escore de Finnegan (FNAST 21 Itens)
            </CardTitle>
            <CardDescription>
              Selecione as opções correspondentes ao quadro clínico do neonato para calcular o
              escore total.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              {finneganItems.map((category) => (
                <div key={category.category} className="space-y-4">
                  <h3 className="font-bold text-slate-700 border-b pb-2 text-sm">
                    {category.category}
                  </h3>
                  {category.items.map((item) => (
                    <div key={item.id} className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600 block">
                        {item.label}
                      </label>
                      <Select
                        value={finneganScores[item.id]?.toString() || '0'}
                        onValueChange={(val) => handleScoreChange(item.id, val)}
                      >
                        <SelectTrigger className="w-full text-xs h-8">
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          {item.options.map((opt) => (
                            <SelectItem
                              key={opt.value}
                              value={opt.value.toString()}
                              className="text-xs"
                            >
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200 text-center flex flex-col items-center justify-center">
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Escore Total
              </span>
              <span
                className={`text-5xl font-bold ${totalScore >= 8 ? 'text-rose-600' : 'text-emerald-600'}`}
              >
                {totalScore}
              </span>

              {totalScore >= 8 && (
                <div className="mt-4 p-3 bg-rose-100 text-rose-800 rounded-lg text-sm font-medium animate-fade-in-up">
                  Ação Recomendada: Considerar Tratamento Farmacológico (Escore ≥ 8). Avalie a
                  otimização de medidas de suporte antes da decisão final.
                </div>
              )}
              {totalScore < 8 && (
                <div className="mt-4 p-3 bg-emerald-100 text-emerald-800 rounded-lg text-sm font-medium animate-fade-in-up">
                  Ação Recomendada: Manter Suporte Não-Farmacológico (Escore &lt; 8). Continue
                  monitoramento rigoroso e medidas de conforto.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 shadow-sm bg-emerald-50/10 md:col-span-2 print:shadow-none print:border print:mt-6">
          <CardHeader className="pb-3 bg-emerald-50/50 print:bg-white border-b print:border-slate-300">
            <CardTitle className="text-lg text-emerald-700 flex items-center gap-2 print:text-black">
              Abordagem ESC
            </CardTitle>
            <CardDescription>Eat, Sleep, Console (Grossman, 2014)</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-slate-700 space-y-4 pt-4 leading-relaxed">
            <p>
              Avaliação focada estritamente na <strong>capacidade funcional</strong> do neonato.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0 print:hidden" />
                <span>
                  <strong>Eat (Comer):</strong> Ingestão de ≥ 1 oz ou amamentação adequada.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0 print:hidden" />
                <span>
                  <strong>Sleep (Dormir):</strong> Capacidade de dormir ≥ 1 hora após a alimentação.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0 print:hidden" />
                <span>
                  <strong>Console (Consolar):</strong> Capacidade de ser consolado em ≤ 10 minutos.
                </span>
              </li>
            </ul>
            <div className="bg-blue-50 p-4 rounded-lg text-blue-800 border border-blue-100 mt-4 print:border-slate-300 print:bg-transparent print:text-black">
              <h4 className="font-semibold mb-2">Evidência: Estudo ESC-NOW (NEJM, 2023)</h4>
              <p className="text-xs sm:text-sm">
                Avaliou 1.305 lactentes. Resultados mostraram uma redução impressionante de{' '}
                <strong>6,7 dias</strong> no tempo de internação até a alta (8,2 dias com ESC vs
                14,9 dias com cuidado habitual), expressiva diminuição na necessidade de medicação e
                nenhum aumento de eventos adversos aos 3 meses.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 shadow-md print:shadow-none print:mt-8">
        <CardHeader className="bg-slate-50/80 border-b print:bg-white">
          <CardTitle>Comparativo: FNAST vs ESC</CardTitle>
        </CardHeader>
        <CardContent className="p-0 sm:p-6 overflow-x-auto print:p-0">
          <Table className="min-w-[600px] print:w-full border-collapse">
            <TableHeader>
              <TableRow className="bg-slate-100 hover:bg-slate-100 print:bg-slate-100">
                <TableHead className="w-[150px] font-bold text-slate-800">Característica</TableHead>
                <TableHead className="font-bold text-slate-800 border-l border-slate-200 print:border-slate-400">
                  FNAST (Finnegan)
                </TableHead>
                <TableHead className="font-bold text-slate-800 border-l border-slate-200 print:border-slate-400">
                  ESC (Eat, Sleep, Console)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium bg-slate-50 print:bg-transparent border-t print:border-slate-300">
                  Foco
                </TableCell>
                <TableCell className="border-l border-t border-slate-100 print:border-slate-300">
                  Identificação e soma de sinais patológicos isolados.
                </TableCell>
                <TableCell className="border-l border-t border-slate-100 bg-emerald-50/30 print:bg-transparent print:border-slate-300">
                  Avaliação do funcionamento e bem-estar geral.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium bg-slate-50 print:bg-transparent border-t print:border-slate-300">
                  Métrica
                </TableCell>
                <TableCell className="border-l border-t border-slate-100 print:border-slate-300">
                  Pontuação ponderada complexa (21 a 31 itens).
                </TableCell>
                <TableCell className="border-l border-t border-slate-100 bg-emerald-50/30 print:bg-transparent print:border-slate-300">
                  Funcional (Sim/Não para 3 domínios claros).
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium bg-slate-50 print:bg-transparent border-t print:border-slate-300">
                  Intervenção Primária
                </TableCell>
                <TableCell className="border-l border-t border-slate-100 print:border-slate-300">
                  Baseada num escore limite subjetivo (ex: &gt; 8).
                </TableCell>
                <TableCell className="border-l border-t border-slate-100 bg-emerald-50/30 print:bg-transparent print:border-slate-300">
                  Otimização exaustiva do suporte não-farmacológico.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium bg-slate-50 print:bg-transparent border-t print:border-slate-300">
                  Impacto Clínico
                </TableCell>
                <TableCell className="border-l border-t border-slate-100 print:border-slate-300">
                  Aumento do uso de opioides e do tempo de internação.
                </TableCell>
                <TableCell className="border-l border-t border-slate-100 bg-emerald-50/30 print:bg-transparent font-medium text-emerald-700 print:text-black print:border-slate-300">
                  Redução de medicação e alta hospitalar precoce.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="print:hidden">
        <ModuleFooter prev="/module/3" next="/module/5" moduleId={4} />
      </div>
    </div>
  )
}
