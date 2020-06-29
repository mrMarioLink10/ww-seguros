import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-diving',
  templateUrl: './diving.component.html',
  styles: []
})
export class DivingComponent implements OnInit {


  accordionTitles = ['Cuestionario'];

  activity = [{

    name: 'snorkel',
    viewValue: 'Snorkel'

  },
  {

    name: 'record',
    viewValue: 'Intentos de récord de profundidad'

  },
  {

    name: 'scuba',
    viewValue: 'Scuba / Escafandra autónoma'

  },
  {

    name: 'exploration',
    viewValue: 'Exploración restos de naufragos'

  },
  {

    name: 'bells',
    viewValue: 'Campanas de inmersión'

  },
  {

    name: 'treasures',
    viewValue: 'Busqueda de tesoros / Expediciones especiales'

  },
  {

    name: 'caves',
    viewValue: 'Cuevas y simas'

  },
  ];

  informationArray = [

    {
      label: '2. Por favor, facilite información completa sobre titulaciones de buceo, indicando cuándo y dónde fueron obtenidas.',
      name: 'degrees'
    },
    {
      label: '3. Por favor indique dónde practica habitualmente submarinismo, por ej.: Aguas costeras, lagos, y en qué países.',
      name: 'practice_place'
    },
    {
      label: '4. ¿Cual es la finalidad principal de su actividad deportiva? por ej.: Ocio, profesión, fotografía, etc…',
      name: 'main_goal'
    },
    {
      label: '5. ¿Cuál es la profundidad máxima alcanzada por Ud.? Sí es más de 40 m, por favor indique cuándo y con qué frecuencia.',
      name: 'depth'
    },
    {
      label: '6. ¿En cuántas ocaciones en los últimos dos años ha buceado sin compañía?',
      name: 'dive'
    },
    {
      label: '7. ¿Con qué frecuencia buceó durante el año pasado y cuantas inmersiones tiene previsto realizar en el próximo año?',
      name: 'frequency'
    },
  ];

  @Input() form: FormGroup;
  @Input() showWarningDot: boolean;
  step: number;
  // diving:FormGroup;

  // pruebapropiedad=this.diving.get('activities') as FormGroup;
  // @Input() group: FormGroup=this.pruebapropiedad;
  // @Input() name: string="snorkel";

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.addBasicControls();

    // this.diving= this.fb.group({

    //   name:['', Validators.required],
    //   radio:['', Validators.required],
    //   activities: this.fb.group({

    //     snorkel:[false],
    //     record:[false],
    //     scuba:[false],
    //     exploration:[false],
    //     bells:[false],
    //     treasures:[false],
    //     caves:[false]

    //   }),
    //   information: this.fb.group({

    //     degrees:['', Validators.required],
    //     practice_place:['', Validators.required],
    //     depth:['', Validators.required],
    //     dive:['', Validators.required],

    //   })

    // })

    console.log(JSON.stringify(this.form.value));

  }

  addBasicControls() {

    // this.form.addControl('name', this.fb.control('', Validators.required));
    this.form.addControl('activities', this.fb.group({

      snorkel: [false],
      record: [false],
      scuba: [false],
      exploration: [false],
      bells: [false],
      treasures: [false],
      caves: [false]

    }));

    this.form.addControl('information', this.fb.group({

      degrees: ['', Validators.required],
      practice_place: ['', Validators.required],
      main_goal: ['', Validators.required],
      depth: ['', Validators.required],
      dive: ['', Validators.required],
      frequency: ['', Validators.required]

    }));

  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep(panel?: string) {
    this.step++;
  }

}
