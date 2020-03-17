import { Component, OnInit, DoCheck } from '@angular/core';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {$sex, $res, $country} from '../../../../../core/form/objects';
import { CountriesService } from '../../../../../core/services/countries/countries.service';
@Component({
  selector: 'app-new-subscription-request',
  templateUrl: './new-subscription-request.component.html',
  styleUrls: ['./new-subscription-request.component.scss']
})
export class NewSubscriptionRequestComponent implements OnInit, DoCheck {
  
  requestTypeOptions: FieldConfig =
   {
    label: 'Tipo de Solicitud',
    options: [
      {
        value: 'Cambio de plan',
        viewValue: 'Cambio de plan',
      }
    ],
    name: 'requestType',
   };
   payments: FieldConfig = {
    label: 'Frecuencia de Pago',
    options: [
      {
        value: 'Anual',
        viewValue: 'Anual'
      },
      {
       value: 'Semestral',
       viewValue: 'Semestral'
     },
     {
       value: 'otro',
       viewValue: 'Otra'
     },
    ]
  };
  deducibles: FieldConfig = {
    label: 'Frecuencia de Pago',
    options: [
      {
        value: 'RD$1,000',
        viewValue: '1000'
      },
      {
       value: 'RD$3,000',
       viewValue: '3000'
     },
     {
      value: 'RD$5,000',
      viewValue: '5000'
    },
     {
       value: 'otro',
       viewValue: 'Otr0'
     },
    ]
  };
  plans: FieldConfig = {
    label: 'Planes',
    options: [
      {
        value: 'Signature Special',
        viewValue: 'Signature Special',
      }
    ],
    name: 'plans',
  };
  titles = ['Contratante','Solicitante', 'Persona políticamente expuesta','Perfil Financiero', 'Dependientes', 'Sección A','Sección B','Sección C Beneficiarios Primarios','Beneficiario(s) Contingente(s)','Comentarios adicionales'];
  newRequest: FormGroup;
  sex = $sex;
  student = $res;
  country = {
    label: 'País',
    options: $country,
    name: 'country',
  }
  status = {
    label: 'Estado Civil',
    options: [
      {
        value: 'Soltero',
        viewValue: 'soltero'
      },
      {
       value: 'Casado',
       viewValue: 'casado'
     },
     {
      value: 'Únion Libre',
      viewValue: 'Union Libre'
    }
    ],
    name: 'status'
  }
  questions = [
    {
      question: '1.',
      value: false,
    },
    {
      question: '2. ¿Embolia, trombosis, migraña, dolores de cabeza u otros padecimientos cerebro vasculares?',
      value: false,
    },
    {
      question: '3. ¿Epilepsia, desmayos, mareos, crisis nerviosa, ansiedad, depresión, convulsiones u otros padecimientos del cerebro o sistema nervioso?',
      value: false,
    },
    {
      question: '4. ¿Visión defectuosa, glaucoma, cataratas, otitis, laberintitis, mala audición u otros padecimientos de la vista y/o del oído?',
      value: false,
    },
    {
      question: '5. Artritis, reumatismo, artritis deformativa, padecimiento en la espina dorsal',
      value: false,
    },
    {
      question: '6. ¿Presión arterial alta, problemas del corazón, soplos, valvulopatías, fiebre reumática, angina, infarto, varices, flebitis, patología cardiaca u otros padecimientos del Sistema Cardiovascular?',
      value: false,
    },
    {
      question: '7. ¿Tuberculosis, enfisema, bronquitis, rinitis, sinusitis, amigdalitis, asma, alergias u otros padecimientos del Sistema Respiratorio?',
      value: false,
    },
    {
      question: '8. ¿Hernia hiatal, reflujo gastroesofágico, gastritis, úlceras, colitis, hepatitis, diverticulosis, hemorroides, problema de los intestinos, recto, hígado, vesícula biliar, páncreas y otros padecimientos del Sistema Digestivo?',
      value: false,
    },
    {
      question: '9. ¿Cálculos renales, nefritis, infecciones urinarias, sangre en la orina, padecimientos del riñón u otros padecimientos del Sistema Urinario?',
      value: false,
    },
    {
      question: '10. ¿Padecimientos de la próstata, testículos, varicocele u otros padecimientos de los órganos reproductivos masculinos?',
      value: false,
    },
    {
      question: '11. ¿Anemia, anemia falciforme, hemofilia, trastornos de la coagulación u otros padecimientos sanguineos?',
      value: false,
    },
    {
      question: '12. ¿Diabetes, colesterol y/o triglicéridos altos, padecimientos de la tiroides, gota o trastornos endócrinos?',
      value: false,
    },
    {
      question: '13. ¿Cáncer, tumor, quistes, crecimiento y/o inflamación de ganglios linfáticos, leucemia? ¿Ha recibido quimioterapia, radioterapia o tratamiento alterno?',
      value: false,
    },
    {
      question: '14. ¿Prótesis, implantes, amputación, secuelas de algún tipo de limitación funcional?',
      value: false,
    },
    {
      question: '15. ¿Alguna deformidad, enfermedad o defecto congénito, pérdida del uso de la audición, ojo(s) o algún miembro?',
      value: false,
    },
    {
      question: '16. ¿Ha recibido transfusión de sangre?',
      value: false,
    },
    {
      question: '17. ¿Usa o ha usado sustancias psicoactivas o estimulantes? ¿Tiene o ha tenido alguna vez dependencia alcohólica?',
      value: false,
    },
    {
      question: '18. ¿Fuma o ha fumado cigarrillos, cigarros, pipas o utilizado productos de tabaco o nicotina en cualquier forma?',
      value: false,
    },
    {
      question: '',
      value: false,
    },
    {
      question: '',
      value: false,
    },

  ]
  constructor(private fb: FormBuilder, private countries: CountriesService) { }

  ngOnInit() {
   this.newRequest = this.fb.group({
      requestType: [''],
      NoC:         [''],
      deducibles:   [''],
      payment:     [''],
      plans:       [''],
      person: this.fb.group({
        firstName:    ['', Validators.required],
        secondName:   [''],
        lastName:     ['', Validators.required],
        date:         [''],
        sex:          [''],
        nationality:  [''],
        id:           [''],
        age:          [''],
        weight:       [''],
        height:       [''],
        status:       [''],
        country:      [''],
        city:         [''],
        direction:    [''],
        tel:          [''],
        cel:          [''],
        officeTel:    [''],
        fax:          [''],
        email:        [''],
        office: this.fb.group({
          company:            [''],
          position:           [''],
          direction:          [''],
          economicActivity:   [''],
          sector:             [''],
          city:               [''],
          country:            [''],
        })
      }),
      contractor: this.fb.group({
        societyName:        [''],
        commercialName:     [''],
        taxpayerNumber:     [''],
        socialHome:         [''],
        tel:                [''],
        email:              [''],
        commercialActivity: [''],
        requestType:        [''],
        legalRepresentation: this.fb.group({
          name:             [''],
          position:         [''],
          nationality:      [''],
          id:               [''],
          policy:           [''],
          email:            ['']
        })
      })
    });
  }
  ngDoCheck(){
    // console.log(this.newRequest);
  }
}
