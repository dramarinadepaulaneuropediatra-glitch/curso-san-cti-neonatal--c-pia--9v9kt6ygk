import { Card, CardContent } from '@/components/ui/card'
import { ModuleFooter } from '@/components/ModuleFooter'
import { HeartHandshake } from 'lucide-react'

export default function Module5() {
  return (
    <div className="space-y-8 pb-8">
      <div className="flex items-center gap-3 border-b pb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <HeartHandshake className="text-primary w-6 h-6" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">
          Módulo 5: Guia Visual de Medidas Não-Farmacológicas
        </h2>
      </div>

      <div className="space-y-4">
        <p className="text-slate-600 leading-relaxed text-lg">
          As intervenções não-farmacológicas constituem o pilar inicial e contínuo no tratamento da
          Síndrome de Abstinência Neonatal (abordagem ESC).
        </p>

        <div className="grid md:grid-cols-3 gap-6 pt-4">
          <Card className="overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <img
              src="https://img.usecurling.com/p/400/300?q=baby%20swaddle"
              alt="Swaddling (Enrolamento)"
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-5 space-y-2">
              <h4 className="font-bold text-lg text-slate-800">Swaddling (Enrolamento)</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Contenção motora suave que proporciona segurança, reduz tremores, previne
                escoriações e facilita a autorregulação do recém-nascido.
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <img
              src="https://img.usecurling.com/p/400/300?q=skin%20to%20skin%20baby"
              alt="Contato Pele a Pele"
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-5 space-y-2">
              <h4 className="font-bold text-lg text-slate-800">Contato Pele a Pele</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Promove estabilidade autonômica, melhora os padrões de respiração, estabiliza a
                temperatura e facilita o aleitamento materno e o consolo.
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <img
              src="https://img.usecurling.com/p/400/300?q=baby%20therapeutic%20positioning"
              alt="Posicionamento Terapêutico"
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-5 space-y-2">
              <h4 className="font-bold text-lg text-slate-800">Posicionamento Terapêutico</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Manutenção do neonato em postura fletida (em "C"), reduzindo o estresse, a agitação
                motora e ajudando no controle do choro estridente.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <ModuleFooter prev="/module/4" next="/module/6" moduleId={5} />
    </div>
  )
}
