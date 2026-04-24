import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ModuleFooter } from '@/components/ModuleFooter'
import { Calculator, Download, AlertCircle } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const finneganItems = [
  {
    category: 'Sistema Nervoso Central',
    items: [
      {
        id: 'cry',
        label: '1. Choro',
        tip: 'Avalie se agudo ou contínuo.',
        options: [
          { label: 'Normal (0)', value: 0 },
          { label: 'Agudo (2)', value: 2 },
          { label: 'Agudo e contínuo (3)', value: 3 },
        ],
      },
      {
        id: 'sleep',
        label: '2. Sono após dieta',
        tip: 'Horas de sono ininterrupto.',
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
        tip: 'Avalie a exacerbação.',
        options: [
          { label: 'Normal (0)', value: 0 },
          { label: 'Hiperativo (2)', value: 2 },
          { label: 'Marcadamente hiperativo (3)', value: 3 },
        ],
      },
      {
        id: 'tremors_disturbed',
        label: '4. Tremores (manuseado)',
        tip: 'Ao toque ou manipulação.',
        options: [
          { label: 'Nenhum (0)', value: 0 },
          { label: 'Leves (1)', value: 1 },
          { label: 'Moderados/Severos (2)', value: 2 },
        ],
      },
      {
        id: 'tremors_undisturbed',
        label: '5. Tremores (repouso)',
        tip: 'Sem estímulo.',
        options: [
          { label: 'Nenhum (0)', value: 0 },
          { label: 'Leves (3)', value: 3 },
          { label: 'Moderados/Severos (4)', value: 4 },
        ],
      },
      {
        id: 'tone',
        label: '6. Tônus muscular',
        tip: 'Avalie a hipertonia.',
        options: [
          { label: 'Normal (0)', value: 0 },
          { label: 'Aumentado/Hipertonia (2)', value: 2 },
        ],
      },
      {
        id: 'excoriation',
        label: '7. Escoriações',
        tip: 'Lesões por agitação.',
        options: [
          { label: 'Não (0)', value: 0 },
          { label: 'Sim (1)', value: 1 },
        ],
      },
      {
        id: 'myoclonic',
        label: '8. Mioclonias',
        tip: 'Abalos musculares bruscos.',
        options: [
          { label: 'Não (0)', value: 0 },
          { label: 'Sim (3)', value: 3 },
        ],
      },
      {
        id: 'convulsions',
        label: '9. Convulsões',
        tip: 'Crises generalizadas confirmadas.',
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
        tip: 'Transpiração excessiva.',
        options: [
          { label: 'Não (0)', value: 0 },
          { label: 'Sim (1)', value: 1 },
        ],
      },
      {
        id: 'fever',
        label: '11. Febre',
        tip: 'Temperatura axilar.',
        options: [
          { label: 'Normal (0)', value: 0 },
          { label: '37.3 a 37.7°C (1)', value: 1 },
          { label: '≥ 37.8°C (2)', value: 2 },
        ],
      },
      {
        id: 'yawning',
        label: '12. Bocejos (>3x)',
        tip: 'Frequência anormal.',
        options: [
          { label: 'Não (0)', value: 0 },
          { label: 'Sim (1)', value: 1 },
        ],
      },
      {
        id: 'mottling',
        label: '13. Pele mosqueada',
        tip: 'Sinal de instabilidade vasomotora.',
        options: [
          { label: 'Não (0)', value: 0 },
          { label: 'Sim (1)', value: 1 },
        ],
      },
      {
        id: 'nasal_stuff',
        label: '14. Congestão nasal',
        tip: 'Obstrução ou coriza.',
        options: [
          { label: 'Não (0)', value: 0 },
          { label: 'Sim (1)', value: 1 },
        ],
      },
      {
        id: 'sneezing',
        label: '15. Espirros (>3x)',
        tip: 'Mais de 3 vezes por intervalo.',
        options: [
          { label: 'Não (0)', value: 0 },
          { label: 'Sim (1)', value: 1 },
        ],
      },
      {
        id: 'nasal_flaring',
        label: '16. Batimento de aletas',
        tip: 'Esforço respiratório.',
        options: [
          { label: 'Não (0)', value: 0 },
          { label: 'Sim (2)', value: 2 },
        ],
      },
      {
        id: 'rr',
        label: '17. Freq. respiratória',
        tip: 'Incursões por minuto.',
        options: [
          { label: 'Normal (0)', value: 0 },
          { label: '> 60 irpm (1)', value: 1 },
          { label: '> 60 irpm com retrações (2)', value: 2 },
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
        tip: 'Busca incessante mas não nutritiva.',
        options: [
          { label: 'Não (0)', value: 0 },
          { label: 'Sim (1)', value: 1 },
        ],
      },
      {
        id: 'feeding',
        label: '19. Má alimentação',
        tip: 'Dificuldade em manter pega ou volume.',
        options: [
          { label: 'Não (0)', value: 0 },
          { label: 'Sim (2)', value: 2 },
        ],
      },
      {
        id: 'vomiting',
        label: '20. Vômitos/Regurgitação',
        tip: 'Frequência e intensidade.',
        options: [
          { label: 'Nenhum (0)', value: 0 },
          { label: 'Regurgitação (2)', value: 2 },
          { label: 'Vômito em jato (3)', value: 3 },
        ],
      },
      {
        id: 'stools',
        label: '21. Fezes',
        tip: 'Consistência.',
        options: [
          { label: 'Normal (0)', value: 0 },
          { label: 'Amolecidas (2)', value: 2 },
          { label: 'Aquosas (3)', value: 3 },
        ],
      },
    ],
  },
]

export default function Module3() {
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
            <Calculator className="text-primary w-6 h-6" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">
            Módulo 3: Escala Finnegan Interativa
          </h2>
        </div>
        <Button onClick={handleExportPDF} variant="outline" className="hidden sm:flex print:hidden">
          <Download className="w-4 h-4 mr-2" /> Exportar Escala (PDF)
        </Button>
      </div>

      <Card className="border-slate-200 shadow-sm print:shadow-none print:border-none">
        <CardHeader className="bg-slate-50 border-b print:bg-white print:border-none print:p-0">
          <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
            Ferramenta Interativa: FNAST 21 Itens
          </CardTitle>
          <CardDescription className="print:hidden">
            Selecione as opções correspondentes ao quadro clínico. Passe o mouse sobre os itens para
            dicas clínicas.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 print:p-0 print:mt-4">
          <div className="grid md:grid-cols-3 gap-6">
            {finneganItems.map((category) => (
              <div key={category.category} className="space-y-4">
                <h3 className="font-bold text-slate-700 border-b pb-2 text-sm print:text-black">
                  {category.category}
                </h3>
                {category.items.map((item) => (
                  <div key={item.id} className="space-y-1">
                    <div className="flex items-center gap-1">
                      <label className="text-xs font-semibold text-slate-600 block print:text-black">
                        {item.label}
                      </label>
                      <Tooltip>
                        <TooltipTrigger className="print:hidden">
                          <AlertCircle className="w-3 h-3 text-slate-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">{item.tip}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Select
                      value={finneganScores[item.id]?.toString() || '0'}
                      onValueChange={(val) => handleScoreChange(item.id, val)}
                    >
                      <SelectTrigger className="w-full text-xs h-8 print:hidden">
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
                    <div className="hidden print:block text-xs text-slate-800 border-b border-slate-200 pb-1">
                      Valor selecionado: {finneganScores[item.id] || 0}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200 text-center flex flex-col items-center justify-center print:border-2 print:border-black print:bg-white print:mt-4">
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2 print:text-black">
              Escore Total
            </span>
            <span
              className={`text-5xl font-bold ${totalScore >= 8 ? 'text-rose-600' : 'text-emerald-600'} print:text-black`}
            >
              {totalScore}
            </span>

            {totalScore >= 8 && (
              <div className="mt-4 p-3 bg-rose-100 text-rose-800 rounded-lg text-sm font-medium animate-fade-in-up print:border print:border-black print:bg-white print:text-black">
                Ação Recomendada: Considerar Tratamento Farmacológico (Escore ≥ 8). Avalie a
                otimização de medidas de suporte antes da decisão final.
              </div>
            )}
            {totalScore < 8 && (
              <div className="mt-4 p-3 bg-emerald-100 text-emerald-800 rounded-lg text-sm font-medium animate-fade-in-up print:border print:border-black print:bg-white print:text-black">
                Ação Recomendada: Manter Suporte Não-Farmacológico (Escore &lt; 8). Continue
                monitoramento rigoroso e medidas de conforto.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="print:hidden">
        <ModuleFooter prev="/module/2" next="/module/4" moduleId={3} />
      </div>
    </div>
  )
}
