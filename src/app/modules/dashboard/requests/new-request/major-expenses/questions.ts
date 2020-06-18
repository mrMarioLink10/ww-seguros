import { $time } from '../../../../../core/form/objects'

export const questionsA = [
  {
    question: ' ¿Artritis, neuritis, reumatismo, osteoporosis, lumbago, hernia discal, escoliosis, u otros padecimientos de la columna vertebral u otros trastornos músculo esqueléticos?',
    name: 'haveMusculoskeletal',
  },
  {
    question: ' ¿Embolia, trombosis, migraña, dolores de cabeza u otros padecimientos cerebro vasculares?',
    name: 'haveCerebrovascular',
  },
  {
    question: ' ¿Epilepsia, desmayos, mareos, crisis nerviosa, ansiedad, depresión, convulsiones u otros padecimientos del cerebro o sistema nervioso?',
    name: 'haveNervousSystem',
  },
  {
    question: ' ¿Visión defectuosa, glaucoma, cataratas, otitis, laberintitis, mala audición u otros padecimientos de la vista y/o del oído?',
    name: 'haveVisionHearing',
  },
  {
    question: ' ¿Presión arterial alta, problemas del corazón, soplos, valvulopatías, fiebre reumática, angina, infarto, varices, flebitis, patología cardiaca u otros padecimientos del Sistema Cardiovascular?',
    name: 'haveCardiovascularSystem',
  },
  {
    question: ' ¿Tuberculosis, enfisema, bronquitis, rinitis, sinusitis, amigdalitis, asma, alergias u otros padecimientos del Sistema Respiratorio?',
    name: 'haveRespiratorySystem',
  },
  {
    question: ' ¿Hernia hiatal, reflujo gastroesofágico, gastritis, úlceras, colitis, hepatitis, diverticulosis, hemorroides, problema de los intestinos, recto, hígado, vesícula biliar, páncreas y otros padecimientos del Sistema Digestivo?',
    name: 'haveDigestiveSystem',
  },
  {
    question: ' ¿Cálculos renales, nefritis, infecciones urinarias, sangre en la orina, padecimientos del riñón u otros padecimientos del Sistema Urinario?',
    name: 'haveUrinarySystem',
  },
  {
    question: ' ¿Padecimientos de la próstata, testículos, varicocele u otros padecimientos de los órganos reproductivos masculinos?',
    name: 'haveMaleReproductiveOrgans',
  },
  {
    question: ' ¿Anemia, anemia falciforme, hemofilia, trastornos de la coagulación u otros padecimientos sanguineos?',
    name: 'haveBloodDisorders',
  },
  {
    question: ' ¿Diabetes, colesterol y/o triglicéridos altos, padecimientos de la tiroides, gota o trastornos endócrinos?',
    name: 'haveEndocrineDisorders',
  },
  {
    question: ' ¿Cáncer, tumor, quistes, crecimiento y/o inflamación de ganglios linfáticos, leucemia? ¿Ha recibido quimioterapia, radioterapia o tratamiento alterno?',
    name: 'haveAlternateTreatment',
  },
  {
    question: ' ¿Prótesis, implantes, amputación, secuelas de algún tipo de limitación funcional?',
    name: 'haveFunctionalLimitation',
  },
  {
    question: ' ¿Alguna deformidad, enfermedad o defecto congénito, pérdida del uso de la audición, ojo(s) o algún miembro?',
    name: 'haveDeformity',
  },
  {
    question: ' ¿Ha recibido transfusión de sangre?',
    name: 'haveBloodTransfusion',
  },
  {
    question: ' ¿Usa o ha usado sustancias psicoactivas o estimulantes? ¿Tiene o ha tenido alguna vez dependencia alcohólica?',
    name: 'haveAlcoholicDependence',
  },
  {
    question: ' ¿Fuma o ha fumado cigarrillos, cigarros, pipas o utilizado productos de tabaco o nicotina en cualquier forma?',
    name: 'haveNicotine',
  },
  {
    question: ' ¿Enfermedades de transmisión sexual, gonorrea, sífilis, clamidia, infección por virus del papiloma humano, herpes u otras?',
    name: 'haveStd',
  },
  {
    question: ' ¿Ha tenido alguna enfermedad, padecimiento, signo, accidente o desorden fisiológico, que no se haya mencionado en este cuestionario?',
    name: 'havePhysiologicalDisorder',
  },
  {
    question: ' ¿Practica en la actualidad alguna disciplina o deporte motorizado, de alto impacto o riesgo?',
    name: 'haveHighRiskSport',
  },
  {
    question: ' ¿Está usted embarazada?',
    name: 'havePregnant',
  },
  {
    question: ' ¿Abortos, dolor pélvico, endometriosis, tumores, quistes, cualquier tipo de masas, cervicitis, enfermedades de los Sí No senos, ovarios, trompas, Sí No trastornos menstruales, hemorragias menstruales, alteraciones menstruales o desordenes de los órganos reproductivos?',
    name: 'haveReproductiveOrganDisorders',
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
  {
    question: '4. ¿Alguno de sus padres, hermanos o hermanas ha tenido tuberculosis, diabetes, cáncer, presión arterial alta, enfermedad del corazón o riñón?',
    name: 'hasFamilyWithHeartKidneyDisease',
  },
  {
    question: '5. ¿Alguna compañía de seguros le ha declinado, aplazado, recargado o limitado un seguro de vida, de accidente o de salud a usted o a alguno de los dependientes nombrados?',
    name: 'hasDeclinedInsuranceCompany',
  },
  {
    question: '6. ¿Ha tenido o tiene Seguros de Gastos Médicos/Salud ?',
    name: 'haveHadMedicalHealthInsurance',
  },
]