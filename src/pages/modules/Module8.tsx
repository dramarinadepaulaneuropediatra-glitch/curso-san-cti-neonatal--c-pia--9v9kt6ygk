import { BookMarked } from 'lucide-react'
import { ModuleFooter } from '@/components/ModuleFooter'

export default function Module8() {
  const references = [
    'Mascarenhas M, Wachman EM, Chandra I, et al. Advances in the Care of Infants With Prenatal Opioid Exposure and Neonatal Opioid Withdrawal Syndrome. Pediatrics. 2024.',
    'McQueen K, Murphy-Oikonen J. Neonatal Abstinence Syndrome. The New England Journal of Medicine. 2016.',
    'Young LW, Ounpraseuth ST, Merhar SL, et al. Eat, Sleep, Console Approach or Usual Care for Neonatal Opioid Withdrawal. The New England Journal of Medicine. 2023.',
    'Patrick SW, Barfield WD, Poindexter BB. Neonatal Opioid Withdrawal Syndrome. Pediatrics. 2020.',
    'Devlin LA, Breeze JL, Terrin N, et al. Association of a Simplified Finnegan Neonatal Abstinence Scoring Tool With the Need for Pharmacologic Treatment for Neonatal Abstinence Syndrome. JAMA Network Open. 2020.',
    'Devlin LA, Hu Z, Merhar SL, et al. Influence of Eat, Sleep, and Console on Infants Pharmacologically Treated for Opioid Withdrawal: A Post Hoc Subgroup Analysis of the ESC-NOW Randomized Clinical Trial. JAMA Pediatrics. 2024.',
  ]

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center gap-3 border-b pb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <BookMarked className="text-primary w-6 h-6" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">
          Módulo 8: Referências Bibliográficas
        </h2>
      </div>

      <div className="space-y-5 text-slate-700 leading-relaxed px-2 md:px-4">
        {references.map((ref, idx) => (
          <p key={idx} className="pl-6 -indent-6 text-sm md:text-base">
            {ref}
          </p>
        ))}
      </div>

      <div className="pt-8">
        <ModuleFooter prev="/module/7" moduleId={8} />
      </div>
    </div>
  )
}
