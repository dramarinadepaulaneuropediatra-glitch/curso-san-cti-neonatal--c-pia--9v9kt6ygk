import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Info, Activity } from 'lucide-react'
import { ModuleFooter } from '@/components/ModuleFooter'

export default function Module2() {
  const [selected, setSelected] = useState<string>('')
  const options = [
    'Tremores e hipertonia',
    'Diarreia e vômitos',
    'Hipotermia severa',
    'Choro agudo e estridente',
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b pb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Activity className="text-primary w-6 h-6" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">
          Módulo 2: Quadro Clínico
        </h2>
      </div>

      <div className="prose max-w-none text-slate-600 leading-relaxed">
        <p>
          A apresentação clínica da SAN reflete a hiperatividade dos sistemas afetados pela retirada
          abrupta da droga. Os sintomas manifestam-se tipicamente entre 24 a 72 horas após o
          nascimento, dependendo da substância e da meia-vida.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h4 className="font-bold text-primary mb-3 flex items-center gap-2">
              Sistema Neurológico
            </h4>
            <p className="text-sm text-slate-600">
              Irritabilidade, tremores ao repouso, hipertonia, reflexo de Moro hiperativo, choro
              estridente, distúrbios do sono e, em casos graves, convulsões.
            </p>
          </div>
          <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h4 className="font-bold text-secondary mb-3 flex items-center gap-2">
              Sistema Autonômico
            </h4>
            <p className="text-sm text-slate-600">
              Febre ou hipertermia, sudorese, taquipneia (&gt;60 irpm), bocejos frequentes, espirros
              recorrentes e congestão nasal.
            </p>
          </div>
          <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h4 className="font-bold text-orange-500 mb-3 flex items-center gap-2">
              Gastrointestinal
            </h4>
            <p className="text-sm text-slate-600">
              Sucção fraca ou descoordenada, dificuldade de deglutição, vômitos em jato, diarreia e
              ganho de peso inadequado.
            </p>
          </div>
        </div>
      </div>

      <Card className="border-primary/20">
        <CardHeader className="bg-slate-50/50 rounded-t-xl">
          <CardTitle>Teste Rápido</CardTitle>
          <CardDescription className="text-sm text-slate-600 mt-2">
            Baseado no quadro descrito acima, qual dos seguintes sintomas <strong>NÃO</strong> é
            tipicamente associado à SAN?
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <RadioGroup value={selected} onValueChange={setSelected} className="space-y-3">
            {options.map((opt) => (
              <div
                key={opt}
                className={`flex items-center space-x-3 border p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                  selected === opt
                    ? 'border-primary bg-primary/5 shadow-inner'
                    : 'hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <RadioGroupItem value={opt} id={opt} />
                <Label htmlFor={opt} className="cursor-pointer flex-1 font-medium text-slate-700">
                  {opt}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {selected === 'Hipotermia severa' && (
            <Alert className="bg-emerald-50 border-emerald-200 text-emerald-800 animate-fade-in">
              <Info className="h-5 w-5 !text-emerald-700" />
              <AlertTitle className="font-bold text-emerald-800">Correto!</AlertTitle>
              <AlertDescription className="text-emerald-700 mt-1">
                Neomatos com SAN tendem a apresentar hiperatividade autonômica, resultando em{' '}
                <strong>febre ou hipertermia</strong>, e não hipotermia. A hipotermia sugere outras
                causas como sepse grave ou prematuridade.
              </AlertDescription>
            </Alert>
          )}
          {selected && selected !== 'Hipotermia severa' && (
            <Alert
              variant="destructive"
              className="animate-fade-in bg-rose-50 text-rose-800 border-rose-200"
            >
              <Info className="h-5 w-5 !text-rose-700" />
              <AlertTitle className="font-bold text-rose-800">Resposta Incorreta</AlertTitle>
              <AlertDescription className="text-rose-700 mt-1">
                Este sintoma é frequentemente observado na SAN. Reveja as categorias clínicas acima
                e tente novamente.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <ModuleFooter prev="/module/1" next="/module/3" moduleId={2} />
    </div>
  )
}
