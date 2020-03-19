 import {$time} from '../../../../../core/form/objects'
 
 export const questionsA = [
    {
      question: '1. ¿Artritis, neuritis, reumatismo, osteoporosis, lumbago, hernia discal, escoliosis, u otros padecimientos de la columna vertebral u otros trastornos músculo esqueléticos?',
      answer: false,
    },
    {
      question: '2. ¿Embolia, trombosis, migraña, dolores de cabeza u otros padecimientos cerebro vasculares?',
      answer: false,
    },
    {
      question: '3. ¿Epilepsia, desmayos, mareos, crisis nerviosa, ansiedad, depresión, convulsiones u otros padecimientos del cerebro o sistema nervioso?',
      answer: false,
    },
    {
      question: '4. ¿Visión defectuosa, glaucoma, cataratas, otitis, laberintitis, mala audición u otros padecimientos de la vista y/o del oído?',
      answer: false,
    },
    {
      question: '5. Artritis, reumatismo, artritis deformativa, padecimiento en la espina dorsal',
      answer: false,
    },
    {
      question: '6. ¿Presión arterial alta, problemas del corazón, soplos, valvulopatías, fiebre reumática, angina, infarto, varices, flebitis, patología cardiaca u otros padecimientos del Sistema Cardiovascular?',
      answer: false,
    },
    {
      question: '7. ¿Tuberculosis, enfisema, bronquitis, rinitis, sinusitis, amigdalitis, asma, alergias u otros padecimientos del Sistema Respiratorio?',
      answer: false,
    },
    {
      question: '8. ¿Hernia hiatal, reflujo gastroesofágico, gastritis, úlceras, colitis, hepatitis, diverticulosis, hemorroides, problema de los intestinos, recto, hígado, vesícula biliar, páncreas y otros padecimientos del Sistema Digestivo?',
      answer: false,
    },
    {
      question: '9. ¿Cálculos renales, nefritis, infecciones urinarias, sangre en la orina, padecimientos del riñón u otros padecimientos del Sistema Urinario?',
      answer: false,
    },
    {
      question: '10. ¿Padecimientos de la próstata, testículos, varicocele u otros padecimientos de los órganos reproductivos masculinos?',
      answer: false,
    },
    {
      question: '11. ¿Anemia, anemia falciforme, hemofilia, trastornos de la coagulación u otros padecimientos sanguineos?',
      answer: false,
    },
    {
      question: '12. ¿Diabetes, colesterol y/o triglicéridos altos, padecimientos de la tiroides, gota o trastornos endócrinos?',
      answer: false,
    },
    {
      question: '13. ¿Cáncer, tumor, quistes, crecimiento y/o inflamación de ganglios linfáticos, leucemia? ¿Ha recibido quimioterapia, radioterapia o tratamiento alterno?',
      answer: false,
    },
    {
      question: '14. ¿Prótesis, implantes, amputación, secuelas de algún tipo de limitación funcional?',
      answer: false,
    },
    {
      question: '15. ¿Alguna deformidad, enfermedad o defecto congénito, pérdida del uso de la audición, ojo(s) o algún miembro?',
      answer: false,
    },
    {
      question: '16. ¿Ha recibido transfusión de sangre?',
      answer: false,
    },
    {
      question: '17. ¿Usa o ha usado sustancias psicoactivas o estimulantes? ¿Tiene o ha tenido alguna vez dependencia alcohólica?',
      answer: false,
    },
    {
      question: '18. ¿Fuma o ha fumado cigarrillos, cigarros, pipas o utilizado productos de tabaco o nicotina en cualquier forma?',
      answer: false,
      description: 'Especifique cantidad por día y cuánto tiempo tiene o estuvo fumando.',
      time: {
        name1: 'dailyAmount',
        name2: 'numberTime',  
      }

    },
    {
      question: '19. ¿Enfermedades de transmisión sexual, gonorrea, sífilis, clamidia, infección por virus del papiloma humano, herpes u otras?',
      answer: false,
    },
    {
      question: '20. ¿Ha tenido alguna enfermedad, padecimiento, signo, accidente o desorden fisiológico, que no se haya mencionado en este cuestionario?',
      answer: false,
    },
    {
      question: '21. ¿Practica en la actualidad alguna disciplina o deporte motorizado, de alto impacto o riesgo?',
      answer: false,
      date: 'date',
    },
    {
      question: '22. ¿Está usted embarazada?',
      answer: false,
      pregnant:true
    },
    {
      question: '22. ¿Abortos, dolor pélvico, endometriosis, tumores, quistes, cualquier tipo de masas, cervicitis, enfermedades de los Sí No senos, ovarios, trompas, Sí No trastornos menstruales, hemorragias menstruales, alteraciones menstruales o desordenes de los órganos reproductivos?',
      answer: false,
    },

  ]
export const questionsB = [
  {  question: '1. ¿Haya consultado a un médico para tratamiento médico o quirúrgico, o para consejo de alguna otra enfermedad o alteración de salud que no esté mencionada en la Sección A?',
    answer: false,
  },
  { 
    question: '2. ¿Ha tenido o tiene alguna alteración de buena salud que no haya sido mencionada en la sección A o en la primera pregunta de esta sección?',
    answer: false,
  },
  {  
    question: '3. ¿Haya tenido un examen físico, estudios diagnósticos o pruebas especializadas?',
    answer: false,
    procedures: true
  },
  {  
    question: '4. ¿Alguno de sus padres, hermanos o hermanas ha tenido tuberculosis, diabetes, cáncer, presión arterial alta, enfermedad del corazón o riñón?',
    answer: false,
  },
  {  
    question: '5. ¿Alguna compañía de seguros le ha declinado, aplazado, recargado o limitado un seguro de vida, de accidente o de salud a usted o a alguno de los dependientes nombrados?',
    answer: false,
  },
  {  
    question: '6. ¿Ha tenido o tiene Seguros de Gastos Médicos/Salud ?',
    answer: false,
  },
]