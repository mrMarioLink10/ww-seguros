// tslint:disable: max-line-length

export const questionsA = [
  {
    question: ' ¿Artritis, neuritis, reumatismo, osteoporosis, lumbago, hernia discal, escoliosis, u otros padecimientos de la columna vertebral u otros trastornos músculo esqueléticos?',
    name: 'haveMusculoskeletal',
    array: 'musculoSkeletal',
  },
  {
    question: ' ¿Embolia, trombosis, migraña, dolores de cabeza u otros padecimientos cerebro vasculares?',
    name: 'haveCerebrovascular',
    array: 'cerebroVascular',
  },
  {
    question: ' ¿Epilepsia, desmayos, mareos, crisis nerviosa, ansiedad, depresión, convulsiones u otros padecimientos del cerebro o sistema nervioso?',
    name: 'haveNervousSystem',
    array: 'nervousSystem'
  },
  {
    question: ' ¿Visión defectuosa, glaucoma, cataratas, otitis, laberintitis, mala audición u otros padecimientos de la vista y/o del oído?',
    name: 'haveVisionHearing',
    array: 'visionHearing'
  },
  {
    question: ' ¿Presión arterial alta, problemas del corazón, soplos, valvulopatías, fiebre reumática, angina, infarto, varices, flebitis, patología cardiaca u otros padecimientos del Sistema Cardiovascular?',
    name: 'haveCardiovascularSystem',
    array: 'cardiovascularSystem'
  },
  {
    question: ' ¿Tuberculosis, enfisema, bronquitis, rinitis, sinusitis, amigdalitis, asma, alergias u otros padecimientos del Sistema Respiratorio?',
    name: 'haveRespiratorySystem',
    array: 'respiratorySystem'
  },
  {
    question: ' ¿Hernia hiatal, reflujo gastroesofágico, gastritis, úlceras, colitis, hepatitis, diverticulosis, hemorroides, problema de los intestinos, recto, hígado, vesícula biliar, páncreas y otros padecimientos del Sistema Digestivo?',
    name: 'haveDigestiveSystem',
    array: 'digestiveSystem'
  },
  {
    question: ' ¿Cálculos renales, nefritis, infecciones urinarias, sangre en la orina, padecimientos del riñón u otros padecimientos del Sistema Urinario?',
    name: 'haveUrinarySystem',
    array: 'urinarySystem'
  },
  {
    question: ' ¿Padecimientos de la próstata, testículos, varicocele u otros padecimientos de los órganos reproductivos masculinos?',
    name: 'haveMaleReproductiveOrgans',
    array: 'maleReproductiveOrgans'
  },
  {
    question: ' ¿Anemia, anemia falciforme, hemofilia, trastornos de la coagulación u otros padecimientos sanguineos?',
    name: 'haveBloodDisorders',
    array: 'bloodDisorders'
  },
  {
    question: ' ¿Diabetes, colesterol y/o triglicéridos altos, padecimientos de la tiroides, gota o trastornos endócrinos?',
    name: 'haveEndocrineDisorders',
    array: 'endocrineDisorders'
  },
  {
    question: ' ¿Cáncer, tumor, quistes, crecimiento y/o inflamación de ganglios linfáticos, leucemia? ¿Ha recibido quimioterapia, radioterapia o tratamiento alterno?',
    name: 'haveAlternateTreatment',
    array: 'alternateTreatment'
  },
  {
    question: ' ¿Prótesis, implantes, amputación, secuelas de algún tipo de limitación funcional?',
    name: 'haveFunctionalLimitation',
    array: 'functionalLimitation'
  },
  {
    question: ' ¿Alguna deformidad, enfermedad o defecto congénito, pérdida del uso de la audición, ojo(s) o algún miembro?',
    name: 'haveDeformity',
    array: 'deformity'
  },
  {
    question: ' ¿Ha recibido transfusión de sangre?',
    name: 'haveBloodTransfusion',
    array: 'bloodTransfusion'
  },
  {
    question: ' ¿Usa o ha usado sustancias psicoactivas o estimulantes? ¿Tiene o ha tenido alguna vez dependencia alcohólica?',
    name: 'haveAlcoholicDependence',
    array: 'alcoholicDependence'
  },
  {
    question: ' ¿Fuma o ha fumado cigarrillos, cigarros, pipas o utilizado productos de tabaco o nicotina en cualquier forma?',
    name: 'haveNicotine',
    array: 'nicotine'
  },
  {
    question: ' ¿Enfermedades de transmisión sexual, gonorrea, sífilis, clamidia, infección por virus del papiloma humano, herpes u otras?',
    name: 'haveStd',
    array: 'std'
  },
  {
    question: ' ¿Ha tenido alguna enfermedad, padecimiento, signo, accidente o desorden fisiológico, que no se haya mencionado en este cuestionario?',
    name: 'havePhysiologicalDisorder',
    array: 'physiologicalDisorder'
  },
  {
    question: ' ¿Practica en la actualidad alguna disciplina o deporte motorizado, de alto impacto o riesgo?',
    name: 'haveHighRiskSport',
    array: 'highRiskSport'
  },
  {
    question: ' ¿Está usted embarazada?',
    name: 'havePregnant',
    array: 'pregnant'
  },
  {
    question: ' ¿Abortos, dolor pélvico, endometriosis, tumores, quistes, cualquier tipo de masas, cervicitis, enfermedades de los senos, ovarios, trompas, trastornos menstruales, hemorragias menstruales, alteraciones menstruales o desordenes de los órganos reproductivos?',
    name: 'haveReproductiveOrganDisorders',
    array: 'reproductiveOrganDisorders'
  },

]
export const questionsB = [
  {
    question: '1. ¿Haya consultado a un médico para tratamiento médico o quirúrgico, o para consejo de alguna otra enfermedad o alteración de salud que no esté mencionada en la Sección A?',
    name: 'haveConsultedForUnmentioned',
  },
  {
    question: '2. ¿Ha tenido o tiene alguna alteración de buena salud que no haya sido mencionada en la sección A o en la primera pregunta de esta sección?',
    name: 'haveAlterationForUnmentioned',
  },
  {
    question: '3. ¿Haya tenido un examen físico, estudios diagnósticos o pruebas especializadas?',
    name: 'haveHadExamStudiesTests',
  },
  // {
  //   question: '4. ¿Alguno de sus padres, hermanos o hermanas ha tenido tuberculosis, diabetes, cáncer, presión arterial alta, enfermedad del corazón o riñón?',
  //   name: 'hasFamilyWithHeartKidneyDisease',
  // },
  {
    question: '4. ¿Alguna compañía de seguros le ha declinado, aplazado, recargado o limitado un seguro de vida, de accidente o de salud a usted o a alguno de los dependientes nombrados?',
    name: 'hasDeclinedInsuranceCompany',
  },
  {
    question: '5. ¿Ha tenido o tiene Seguros de Gastos Médicos/Salud ?',
    name: 'haveHadMedicalHealthInsurance',
  },
]