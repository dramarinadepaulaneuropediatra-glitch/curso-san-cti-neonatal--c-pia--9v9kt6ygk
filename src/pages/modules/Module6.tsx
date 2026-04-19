import { medications } from '@/data/medications'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ModuleFooter } from '@/components/ModuleFooter'
import { Pill, Download, AlertTriangle } from 'lucide-react'

export default function Module6() {
  const handleExportPDF = () => {
    window.print()
  }

  return (
    <div className="space-y-6 pb-8 print:bg-white print:text-black">
      <div className="flex items-center justify-between border-b pb-4 print:border-none">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg print:hidden">
            <Pill className="text-primary w-6 h-6" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">
            Módulo 6: Guia de Medicações
          </h2>
        </div>
        <Button onClick={handleExportPDF} variant="outline" className="hidden sm:flex print:hidden">
          <Download className="w-4 h-4 mr-2" />
          Exportar Tabela (PDF)
        </Button>
      </div>

      <p className="text-slate-600 print:text-slate-800 leading-relaxed mb-6">
        Este guia rápido serve como referência de cabeceira para as principais terapias
        medicamentosas empregadas no CTI Neonatal do HJK em casos de Síndrome de Abstinência
        Neonatal (SAN).
      </p>

      <div className="grid gap-6">
        {medications.map((med) => (
          <Card key={med.id} className="border-slate-200 shadow-sm print:break-inside-avoid">
            <CardHeader className="pb-3 bg-slate-50/50 print:bg-white border-b print:border-slate-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <CardTitle className="text-xl text-primary print:text-black flex items-center gap-2">
                  {med.name}
                </CardTitle>
                <span className="px-3 py-1 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-full print:border-none print:p-0 print:font-bold">
                  Uso: {med.use}
                </span>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-4 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-1 md:col-span-2">
                  <span className="font-semibold text-slate-600 uppercase text-xs tracking-wider print:text-slate-800">
                    Posologia
                  </span>
                  <p className="text-slate-800 print:text-black font-medium">{med.dosage}</p>
                </div>
                <div className="space-y-1 md:col-span-2">
                  <span className="font-semibold text-slate-600 uppercase text-xs tracking-wider print:text-slate-800">
                    Protocolo de Desmame
                  </span>
                  <p className="text-slate-800 print:text-black">{med.weaning}</p>
                </div>
              </div>

              <div className="space-y-1 pt-2 border-t border-slate-100 print:border-slate-300">
                <span className="font-semibold text-slate-600 uppercase text-xs tracking-wider print:text-slate-800">
                  Prós e Contras
                </span>
                <p className="text-slate-700 print:text-black">{med.prosCons}</p>
              </div>

              {med.alerts && (
                <div className="flex gap-3 mt-4 p-3 bg-rose-50 rounded-lg text-rose-800 border border-rose-100 print:border-slate-400 print:bg-transparent print:text-black">
                  <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 print:hidden" />
                  <div>
                    <span className="font-bold block mb-1">Alerta de Segurança:</span>
                    <span className="leading-relaxed">{med.alerts}</span>
                  </div>
                </div>
              )}

              <div className="pt-2">
                <span className="text-xs text-slate-500 font-medium print:text-slate-600">
                  Referências: {med.references}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="print:hidden mt-8">
        <ModuleFooter prev="/module/5" next="/module/7" moduleId={6} />
      </div>
    </div>
  )
}
