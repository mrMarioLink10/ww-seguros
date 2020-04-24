import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormArrayGeneratorService } from 'src/app/core/services/forms/form-array-generator.service';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';

@Component({
  selector: 'app-mountaineering',
  templateUrl: './mountaineering.component.html',
  styles: []
})
export class MountaineeringComponent implements OnInit {

  accordionTitles=["Cuestionario"];

  @Input() form:FormGroup;

  // mountaineering:FormGroup;

  YesNo:FieldConfig={
    label:'',
    options:[
        {
          value:'si',
          viewValue:'Si'
        },
        {
          value:'no',
          viewValue:'No'
        }
    ]
  }

  constructor(private fb:FormBuilder, public formMethods: FormArrayGeneratorService) { }

  ngOnInit() {

    this.addBasicControls()

    // this.mountaineering= this.fb.group({

    //   name:['', Validators.required],
    //   activities: this.fb.group({

    //     artificial_wall_radio:['', Validators.required],
    //     expeditions_radio:['', Validators.required],
    //     climbing_radio:['', Validators.required],
    //     Hiking_radio:['', Validators.required],
    //     ice_climbing_radio:['', Validators.required],
    //     rock_climbing_radio:['', Validators.required],
        

    //   }),
    //   club: this.fb.group({

    //     organization_radio:['', Validators.required]

    //   }),
    //   max_height: this.fb.group({

    //     height:['', Validators.required]

    //   }),
    //   climb: this.fb.group({

    //     radio:['', Validators.required]

    //   }),
    //   climb_zone: this.fb.group({

    //     africa:['', Validators.required],
    //     alpes:['', Validators.required],
    //     himalaya:['', Validators.required],
    //     andes:['', Validators.required],
    //     McKinley:['', Validators.required],
    //     Alaska:['', Validators.required],
    //     mountain_range:['', Validators.required],
    //     others:['', Validators.required]
    //   }),
    //   expeditions: this.fb.group({

    //     radio:['', Validators.required],
      
    //   }),

    //   category: this.fb.group({

    //     type_radio:['', Validators.required]

    //   })


    // })

  }

  addBasicControls(){

    this.form.addControl('name', this.fb.control('', Validators.required));
    this.form.addControl('activities', this.fb.group({

      artificial_wall_radio:['', Validators.required],
      expeditions_radio:['', Validators.required],
      climbing_radio:['', Validators.required],
      Hiking_radio:['', Validators.required],
      ice_climbing_radio:['', Validators.required],
      rock_climbing_radio:['', Validators.required],

    }));

    this.form.addControl('club', this.fb.group({

      organization_radio:['', Validators.required]

    }));

    this.form.addControl('max_height', this.fb.group({

      height:['', Validators.required]

    }));

    this.form.addControl('climb', this.fb.group({

      radio:['', Validators.required]

    }));

    this.form.addControl('climb_zone', this.fb.group({

        africa:['', Validators.required],
        alpes:['', Validators.required],
        himalaya:['', Validators.required],
        andes:['', Validators.required],
        McKinley:['', Validators.required],
        Alaska:['', Validators.required],
        mountain_range:['', Validators.required],
        others:['', Validators.required]

    }));
    
    this.form.addControl('expeditions', this.fb.group({

      radio:['', Validators.required],

    }));

    this.form.addControl('category', this.fb.group({

      type_radio:['', Validators.required]

    }));

  }

  c:number=0;
  selectChange(event){
    const form = this.form.get('club') as FormGroup;
    const formZ = this.form.get('climb_zone') as FormGroup;
    const formE = this.form.get('expeditions') as FormGroup;
    const formG = this.form.get('expeditions').get('cave') as FormGroup;
    const formS = this.form.get('category') as FormGroup;
  
    if (event.valor === 'si') {
  
          switch(event.name){
          
              case 'organization_radio':
          
                form.addControl('area_text', this.fb.group({
                  info: ['', Validators.required]
                }));
                console.log(JSON.stringify(this.form.value));
  
              break;

              case 'africa':
              case 'alpes':
              case 'himalaya':
              case 'andes':
              case 'McKinley':
              case 'Alaska':
              case 'mountain_range':
              case 'others':
                if(this.c==0){
                  this.c++;
                  console.log("El valor de c es " + this.c)
                  formZ.addControl('area_text', this.fb.group({
                    info: ['', Validators.required]
                  }));
                  console.log(JSON.stringify(this.form.value));
                  
                }
                else if(this.c>0){
                  this.c++;
                  console.log("Este campo ya existe. El nuevo valor de c ahora es " + this.c)
                }
              break;

              case 'radio':
          
                formE.addControl('cave', this.fb.group({
                  date: [new Date(), Validators.required],
                  quantity:['', [Validators.required, Validators.min(0)]],
                  grotto_radio:['', Validators.required],
                  dive_radio:['', Validators.required]
                }));
                console.log(JSON.stringify(this.form.value));
  
              break; 
              
              case 'grotto_radio':
          
                formG.addControl('grotto', this.fb.group({
                  info:['', Validators.required]
                }));
                console.log(JSON.stringify(this.form.value));
  
              break;

              case 'dive_radio':
          
                formG.addControl('underwater', this.fb.group({
                  info:['', Validators.required]
                }));
                console.log(JSON.stringify(this.form.value));
  
              break;

              case 'type_radio':
          
                formS.addControl('sport', this.fb.group({
                  info:['', Validators.required]
                }));
                console.log(JSON.stringify(this.form.value));
  
              break;
          }
      } 

    else if (event.valor === 'no'){

      switch(event.name){
          
        case 'organization_radio':
    
          form.removeControl('area_text');

        break;

        case 'africa':
        case 'alpes':
        case 'himalaya':
        case 'andes':
        case 'McKinley':
        case 'Alaska':
        case 'mountain_range':
        case 'others':
            if(this.c==1){
              this.c--;
              console.log("El campo ha sido eliminado. El valor de c ahora es " + this.c)
            formZ.removeControl('area_text');
            
            }
            else if(this.c>1){
              this.c--;
            console.log("No se puede eliminar aún. El nuevo valor de c es " + this.c)
            }

        break;

        case 'radio':
    
          formE.removeControl('cave');

        break;

        case 'grotto_radio':
    
          formG.removeControl('grotto');

        break;

        case 'dive_radio':
    
          formG.removeControl('underwater');

        break;
        
        case 'type_radio':
    
          formS.removeControl('sport');

        break;
    }

    }
  }

}
