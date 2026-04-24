import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ModuleFooter } from '@/components/ModuleFooter'
import { GitMerge, Download, ShieldAlert, AlertTriangle, ArrowRight } from 'lucide-react'

export default function Module7() {
  const handleExportPDF = () => {
    window.print()
  }

  return (
    <div className="space-y-8 pb-8 print:bg-white print:text-black">
      <div className="flex items-center justify-between border-b pb-4 print:border-none">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg print:hidden">
            <GitMerge className="text-primary w-6 h-6" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">
            Módulo 7: Protocolos de Transição de Opioides
          </h2>
        </div>
        <Button onClick={handleExportPDF} variant="outline" className="hidden sm:flex print:hidden">
          <Download className="w-4 h-4 mr-2" /> Exportar Protocolo (PDF)
        </Button>
      </div>

      <Card className="border-rose-200 shadow-sm print:shadow-none print:border-black">
        <CardHeader className="bg-rose-50/80 border-b border-rose-100 print:bg-white print:border-black">
          <CardTitle className="text-rose-800 flex items-center gap-2 print:text-black">
            <AlertTriangle className="w-5 h-5 print:hidden" />
            Alerta de Conversão: Fentanil para Morfina
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4 text-slate-700 print:text-black">
          <p className="font-medium text-lg text-rose-700 print:text-black">
            Atenção: A proporção de conversão em neonatos difere de adultos!
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Neonatos:</strong> A taxa de conversão recomendada para segurança máxima é de{' '}
              <strong>20:1</strong> (Fentanil para Morfina).
            </li>
            <li>
              <strong>Adultos (para referência e cautela):</strong> Comumente usam 50:1 ou 100:1.{' '}
              <em>Não aplicar essa métrica em neonatologia!</em>
            </li>
            <li>
              O risco de superdosagem e depressão respiratória aguda é gravíssimo se a conversão de
              adulto for acidentalmente empregada.
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm print:shadow-none print:border-black">
        <CardHeader className="bg-slate-50 border-b print:bg-white print:border-black">
          <CardTitle className="text-slate-800 flex items-center gap-2">
            Fluxograma: Morfina EV para Metadona Oral
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center">
            <div className="flex-1 bg-blue-50 p-4 rounded-xl border border-blue-100 w-full print:border-black print:bg-white">
              <h4 className="font-bold text-blue-800 mb-2 print:text-black">1. Estabilização</h4>
              <p className="text-sm text-slate-600 print:text-black">
                Garantir que o RN esteja clinicamente estável sob Morfina Endovenosa (EV) por pelo
                menos 24 a 48 horas antes de planejar a transição.
              </p>
            </div>
            <ArrowRight className="w-6 h-6 text-slate-400 rotate-90 md:rotate-0 print:hidden" />
            <div className="flex-1 bg-emerald-50 p-4 rounded-xl border border-emerald-100 w-full print:border-black print:bg-white">
              <h4 className="font-bold text-emerald-800 mb-2 print:text-black">2. Transição</h4>
              <p className="text-sm text-slate-600 print:text-black">
                Introduzir Metadona Oral. Considerar o longo tempo de meia-vida da Metadona.
                Realizar redução gradual ("overlap") da Morfina EV.
              </p>
            </div>
            <ArrowRight className="w-6 h-6 text-slate-400 rotate-90 md:rotate-0 print:hidden" />
            <div className="flex-1 bg-orange-50 p-4 rounded-xl border border-orange-100 w-full print:border-black print:bg-white">
              <h4 className="font-bold text-orange-800 mb-2 print:text-black">3. Ajuste Fino</h4>
              <p className="text-sm text-slate-600 print:text-black">
                Monitorar sinais de abstinência e toxicidade nas 72h subsequentes. Ajustar a dose da
                Metadona Oral a cada 24-48h se necessário.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-emerald-200 shadow-sm print:shadow-none print:border-black">
        <CardHeader className="bg-emerald-50/80 border-b border-emerald-100 print:bg-white print:border-black">
          <CardTitle className="text-emerald-800 flex items-center gap-2 print:text-black">
            <ShieldAlert className="w-5 h-5 print:hidden" />
            Regras de Ouro para Segurança Neonatal
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ul className="list-disc pl-6 space-y-3 text-slate-700 font-medium print:text-black">
            <li>
              Monitoramento cardiorrespiratório contínuo obrigatório para lactentes menores de 3
              meses em uso de opioides no CTI.
            </li>
            <li>
              Acesso imediato à Naloxona deve estar garantido no leito durante fases de titulação de
              dose.
            </li>
            <li>
              Sinais de sedação excessiva (escore de alerta) exigem revisão imediata da dosagem e
              reavaliação de interações (ex: Fenobarbital).
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="print:hidden">
        <ModuleFooter prev="/module/6" next="/module/8" moduleId={7} />
      </div>
    </div>
  )
}
