import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ModuleFooter } from '@/components/ModuleFooter'
import { Stethoscope } from 'lucide-react'

export default function Module1() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b pb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Stethoscope className="text-primary w-6 h-6" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">
          Módulo 1: Introdução & Abordagens
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

      <Card className="border-slate-200 shadow-md print:shadow-none mt-8">
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
                <TableCell className="border-l border-t border-slate-100 print:border-slate-300 text-slate-600">
                  Identificação e soma de sinais patológicos isolados.
                </TableCell>
                <TableCell className="border-l border-t border-slate-100 bg-emerald-50/30 print:bg-transparent print:border-slate-300 text-slate-600">
                  Avaliação do funcionamento geral e bem-estar.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium bg-slate-50 print:bg-transparent border-t print:border-slate-300">
                  Métrica
                </TableCell>
                <TableCell className="border-l border-t border-slate-100 print:border-slate-300 text-slate-600">
                  Pontuação ponderada complexa (21 a 31 itens)
                </TableCell>
                <TableCell className="border-l border-t border-slate-100 bg-emerald-50/30 print:bg-transparent print:border-slate-300 text-slate-600">
                  Funcional (Sim/Não para 3 domínios claros).
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium bg-slate-50 print:bg-transparent border-t print:border-slate-300">
                  Intervenção Primária
                </TableCell>
                <TableCell className="border-l border-t border-slate-100 print:border-slate-300 text-slate-600">
                  Baseada num escore limite subjetivo (ex: &gt; 8).
                </TableCell>
                <TableCell className="border-l border-t border-slate-100 bg-emerald-50/30 print:bg-transparent print:border-slate-300 text-slate-600">
                  Otimização exaustiva do suporte não-farmacológico.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium bg-slate-50 print:bg-transparent border-t print:border-slate-300">
                  Impacto Clínico
                </TableCell>
                <TableCell className="border-l border-t border-slate-100 print:border-slate-300 text-slate-600">
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

      <ModuleFooter prev="/" next="/module/2" moduleId={1} />
    </div>
  )
}
