export const medications = [
  {
    id: 1,
    name: 'Morfina',
    use: 'Primário',
    dosage: '0.04 - 0.05 mg/kg/dose a cada 3-4h (VO)',
    weaning: 'Desmame diário de 10-20% da dose de estabilização.',
    prosCons:
      'Prós: Padrão-ouro histórico. Contras: Depressão respiratória, constipação, meia-vida variável.',
    alerts: 'Atenção: Algumas preparações orais podem conter alto teor de etanol.',
    references: 'AAP (2020), MOTHER Study',
  },
  {
    id: 2,
    name: 'Metadona',
    use: 'Primário (Alternativa)',
    dosage: '0.05 - 0.1 mg/kg/dose a cada 6-12h (VO)',
    weaning: 'Desmame de 10-20% a cada 24-48h após estabilização.',
    prosCons:
      'Prós: Posologia menos frequente, níveis séricos estáveis. Contras: Meia-vida longa, risco de acúmulo.',
    alerts: 'Monitorar QT prolongado no eletrocardiograma.',
    references: 'JAMA Pediatr (2019)',
  },
  {
    id: 3,
    name: 'Buprenorfina',
    use: 'Primário (Alternativa Sublingual)',
    dosage: '3 - 4 mcg/kg/dose a cada 8h (Sublingual)',
    weaning: 'Desmame gradual ajustado clinicamente.',
    prosCons:
      'Prós: Menor tempo de internação comparado à morfina. Contras: Formulação sublingual de difícil administração neonatal.',
    alerts:
      'Atenção ao veículo da preparação; preparações alcoólicas apresentam risco de toxicidade.',
    references: 'NEJM (2016), NEJM (2022)',
  },
  {
    id: 4,
    name: 'Clonidina',
    use: 'Secundário (Adjuvante)',
    dosage: '0.5 - 1 mcg/kg/dose a cada 3-6h (VO)',
    weaning: 'Desmame de 25% ao dia para evitar efeito rebote.',
    prosCons:
      'Prós: Eficaz na redução da hiperatividade autonômica. Contras: Hipotensão, bradicardia.',
    alerts: 'Risco significativo de hipertensão rebote na retirada abrupta.',
    references: 'JAMA (2020)',
  },
  {
    id: 5,
    name: 'Fenobarbital',
    use: 'Secundário (Adjuvante)',
    dosage: 'Ataque: 10 a 15 mg/kg. Manutenção: 3 a 5 mg/kg/dia (VO/EV)',
    weaning: 'Desmame ambulatorial lento ao longo de meses.',
    prosCons:
      'Prós: Excelente para SAN por poliuso (não-opioides). Contras: Sedação excessiva, não trata sintomas GI.',
    alerts:
      'Riscos de neurotoxicidade no cérebro em desenvolvimento; a sedação compromete a avaliação neurológica e abordagem ESC.',
    references: 'Cochrane (2021)',
  },
  {
    id: 6,
    name: 'Clorpromazina',
    use: 'Adjuvante (Uso Restrito)',
    dosage: '0.5 mg a 1 mg/kg/dose até de 6 em 6 horas (VO/IM)',
    weaning: 'Desmame gradual conforme tolerado (geralmente não excede 5 dias).',
    prosCons:
      'Prós: Auxilia no controle de agitação grave em falha de outros agentes. Contras: Risco de efeitos extrapiramidais e redução do limiar convulsivo.',
    alerts:
      'Atenção: Deve ser considerada apenas após falha ou impossibilidade de uso de Morfina/Metadona e Fenobarbital. Uso desencorajado como primeira linha.',
    references: 'Literatura especializada em casos refratários',
  },
]
