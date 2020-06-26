import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';

@Component({
  selector: 'app-racing',
  templateUrl: './racing.component.html',
  styles: []
})
export class RacingComponent implements OnInit {

  accordionTitles=["Cuestionario"]

  races=[
    {
      label: "Velocidad en circuito",
      name: "speed",
      group:'speed_field'
    },
    {
      label: "Enduro en circuito",
      name: "enduro",
      group:'enduro_field'
    },
    {
      label: "Moto Cross",
      name: "motocross",      
      group:'moto_field'
    },
    {
      label: "Carreras en cuesta",
      name: "race",
      group:'race_field'
    },
    {
      label: "Rallye, raid europeo, regularidad",
      name: "rally",
      group:'rally_field'
    },
    {
      label: "Raid todo terreno, maratón",
      name: "marathon",
      group:'marathon_field'
    },
    {
      label: "Trial",
      name: "trial",
      group:'trial_field'
    },
    {
      label: "Carrera sobre hielo",
      name: "iceRace",
      group:'ice_race_field'
    },
    {
      label: "Otras (¿Cuáles?)",
      name: "others",
      group:'others_field'
    },
  ]

  typeOptions: FieldConfig={

    label:'',
    options:[
      {
        value:'profesional',
        viewValue:'Profesional Moto'
      },
      {
        value:'aficionado',
        viewValue:'Aficionado'
      }
    ]
  }

  yesNo: FieldConfig={

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


  @Input() form:FormGroup;

  // racing:FormGroup

  constructor(private fb:FormBuilder) { }

  ngOnInit() {

    this.addBasicControls();

    // this.racing= this.fb.group({

    //   last_names:['', Validators.required],
    //   name:['', Validators.required],
    //   date:[new Date(), Validators.required],
    //   competition_date:[new Date(), Validators.required],
    //   formation:['', Validators.required],
    //   past_months: this.fb.group({

    //     speed:[false],     
    //     enduro:[false],
    //     motocross:[false],
    //     race:[false],
    //     rally:[false],
    //     marathon:[false],
    //     trial:[false],
    //     ice_race:[false],
    //     others:[false],

    //   }),

    //   future_months: this.fb.group({

    //     brand:['', Validators.required],
    //     engine:['', Validators.required],
    //     type_radio:['', Validators.required], 

    //     speed:[false],     
    //     enduro:[false],
    //     motocross:[false],
    //     race:[false],
    //     rally:[false],
    //     marathon:[false],
    //     trial:[false],
    //     ice_race:[false],
    //     others:[false],

    //   }),

    //   accidents: this.fb.group({

    //     radio:['', Validators.required],

    //   }),

    //   info: ['', Validators.required]

    // })

    // console.log(JSON.stringify(this.form.value));

  }

  selectChangeP(event){

    let nameCB=event.source._elementRef.nativeElement.attributes[2].nodeValue;

    const formP= this.form.get('past_months') as FormGroup;
    
    console.log(event)
    console.log(nameCB)

    if(event.checked==true){

        switch(nameCB){
        
          case 'speed':
        
            formP.addControl('speed_field', this.fb.group({

              number:['', [Validators.required, Validators.min(1)]],
              name:['', Validators.required]
        
            }));
            console.log("Esto es el switch de Velocidad en circuito, en checked igual a true, de past_months")
        
            break;
          
          case 'enduro':
      
            formP.addControl('enduro_field', this.fb.group({

              number:['', [Validators.required, Validators.min(1)]],
              name:['', Validators.required]
        
            }));
            console.log("Esto es el switch de Enduro en circuito, en checked igual a true, de past_months")
        
            break;
            
          case 'motocross':
    
            formP.addControl('moto_field', this.fb.group({

              number:['', [Validators.required, Validators.min(1)]],
              name:['', Validators.required]
        
            }));
            console.log("Esto es el switch de Motocross, en checked igual a true, de past_months")
        
            break;
            
          case 'race':
    
            formP.addControl('race_field', this.fb.group({

              number:['', [Validators.required, Validators.min(1)]],
              name:['', Validators.required]
        
            }));
            console.log("Esto es el switch de Carreras en cuesta, en checked igual a true, de past_months")
        
            break;
            
          case 'rally':
    
            formP.addControl('rally_field', this.fb.group({

              number:['', [Validators.required, Validators.min(1)]],
              name:['', Validators.required]
        
            }));
            console.log("Esto es el switch de Rallye, raid europeo, regularidad en checked igual a true, de past_months")
        
            break;

          case 'marathon':
    
            formP.addControl('marathon_field', this.fb.group({

              number:['', [Validators.required, Validators.min(1)]],
              name:['', Validators.required]
        
            }));
            console.log("Esto es el switch de Raid todo terreno, maratón en checked igual a true, de past_months")
        
            break;

          case 'trial':
    
            formP.addControl('trial_field', this.fb.group({

              number:['', [Validators.required, Validators.min(1)]],
              name:['', Validators.required]
        
            }));
            console.log("Esto es el switch de Trial en checked igual a true, de past_months")
        
            break;

          case 'iceRace':
    
            formP.addControl('ice_race_field', this.fb.group({

              number:['', [Validators.required, Validators.min(1)]],
              name:['', Validators.required]
        
            }));
            console.log("Esto es el switch de Carrera sobre hielo en checked igual a true, de past_months")
        
            break;

          case 'others':
    
            formP.addControl('others_field', this.fb.group({

              number:['', [Validators.required, Validators.min(1)]],
              name:['', Validators.required]
        
            }));
            console.log("Esto es el switch de Otras (¿Cuáles?) en checked igual a true, de past_months")
        
            break;
        
        }
      }

      else if(event.checked==false){

        switch(nameCB){
        
          case 'speed':
        
            formP.removeControl('speed_field');
            console.log("Esto es el switch de Velocidad en circuito, en checked igual a false, de past_months")
        
            break;
            
          case 'enduro':
      
            formP.removeControl('enduro_field');
            console.log("Esto es el switch de Enduro en circuito, en checked igual a false, de past_months")
        
            break;

          case 'motocross':
      
            formP.removeControl('moto_field');
            console.log("Esto es el switch de Motocross, en checked igual a false, de past_months")
        
            break;
            
          case 'race':
      
            formP.removeControl('race_field');
            console.log("Esto es el switch de Carreras en cuesta, en checked igual a false, de past_months")
        
            break;
            

          case 'rally':
      
            formP.removeControl('rally_field');
            console.log("Esto es el switch de Rallye, raid europeo, regularidad en checked igual a false, de past_months")
        
            break;

          case 'marathon':
      
            formP.removeControl('marathon_field');
            console.log("Esto es el switch de Raid todo terreno, maratón en checked igual a false, de past_months")
        
            break;

          case 'trial':
      
            formP.removeControl('trial_field');
            console.log("Esto es el switch de Trial en checked igual a false, de past_months")
        
            break;

          case 'iceRace':
      
            formP.removeControl('ice_race_field');
            console.log("Esto es el switch de Carrera sobre hielo en checked igual a false, de past_months")
        
            break;

          case 'others':
      
            formP.removeControl('others_field');
            console.log("Esto es el switch de Otras (¿Cuáles?) en checked igual a false, de past_months")
        
            break;
        
        }
      }
    }

    selectChangeF(event){

      let nameCB=event.source._elementRef.nativeElement.attributes[2].nodeValue;
  
      const formP= this.form.get('future_months') as FormGroup;
      
      console.log(event)
      console.log(nameCB)
  
      if(event.checked==true){
  
          switch(nameCB){
          
            case 'speed':
          
              formP.addControl('speed_field', this.fb.group({
  
                number:['', [Validators.required, Validators.min(1)]],
                name:['', Validators.required]
          
              }));
              console.log("Esto es el switch de Velocidad en circuito, en checked igual a true, future_months")
          
              break;
            
            case 'enduro':
        
              formP.addControl('enduro_field', this.fb.group({
  
                number:['', [Validators.required, Validators.min(1)]],
                name:['', Validators.required]
          
              }));
              console.log("Esto es el switch de Enduro en circuito, en checked igual a true, future_months")
          
              break;
              
            case 'motocross':
      
              formP.addControl('moto_field', this.fb.group({
  
                number:['', [Validators.required, Validators.min(1)]],
                name:['', Validators.required]
          
              }));
              console.log("Esto es el switch de Motocross, en checked igual a true, future_months")
          
              break;
              
            case 'race':
      
              formP.addControl('race_field', this.fb.group({
  
                number:['', [Validators.required, Validators.min(1)]],
                name:['', Validators.required]
          
              }));
              console.log("Esto es el switch de Carreras en cuesta, en checked igual a true, future_months")
          
              break;
              
            case 'rally':
      
              formP.addControl('rally_field', this.fb.group({
  
                number:['', [Validators.required, Validators.min(1)]],
                name:['', Validators.required]
          
              }));
              console.log("Esto es el switch de Rallye, raid europeo, regularidad en checked igual a true, future_months")
          
              break;
  
            case 'marathon':
      
              formP.addControl('marathon_field', this.fb.group({
  
                number:['', [Validators.required, Validators.min(1)]],
                name:['', Validators.required]
          
              }));
              console.log("Esto es el switch de Raid todo terreno, maratón en checked igual a true, future_months")
          
              break;
  
            case 'trial':
      
              formP.addControl('trial_field', this.fb.group({
  
                number:['', [Validators.required, Validators.min(1)]],
                name:['', Validators.required]
          
              }));
              console.log("Esto es el switch de Trial en checked igual a true, future_months")
          
              break;
  
            case 'iceRace':
      
              formP.addControl('ice_race_field', this.fb.group({
  
                number:['', [Validators.required, Validators.min(1)]],
                name:['', Validators.required]
          
              }));
              console.log("Esto es el switch de Carrera sobre hielo en checked igual a true, future_months")
          
              break;
  
            case 'others':
      
              formP.addControl('others_field', this.fb.group({
  
                number:['', [Validators.required, Validators.min(1)]],
                name:['', Validators.required]
          
              }));
              console.log("Esto es el switch de Otras (¿Cuáles?) en checked igual a true, future_months")
          
              break;
          
          }
        }
  
        else if(event.checked==false){
  
          switch(nameCB){
          
            case 'speed':
          
              formP.removeControl('speed_field');
              console.log("Esto es el switch de Velocidad en circuito, en checked igual a false, de future_months")
          
              break;
              
            case 'enduro':
        
              formP.removeControl('enduro_field');
              console.log("Esto es el switch de Enduro en circuito, en checked igual a false, de future_months")
          
              break;
  
            case 'motocross':
        
              formP.removeControl('moto_field');
              console.log("Esto es el switch de Motocross, en checked igual a false, de future_months")
          
              break;
              
            case 'race':
        
              formP.removeControl('race_field');
              console.log("Esto es el switch de Carreras en cuesta, en checked igual a false, de future_months")
          
              break;
              
  
            case 'rally':
        
              formP.removeControl('rally_field');
              console.log("Esto es el switch de Rallye, raid europeo, regularidad en checked igual a false, de future_months")
          
              break;
  
            case 'marathon':
        
              formP.removeControl('marathon_field');
              console.log("Esto es el switch de Raid todo terreno, maratón en checked igual a false, de future_months")
          
              break;
  
            case 'trial':
        
              formP.removeControl('trial_field');
              console.log("Esto es el switch de Trial en checked igual a false, de future_months")
          
              break;
  
            case 'iceRace':
        
              formP.removeControl('ice_race_field');
              console.log("Esto es el switch de Carrera sobre hielo en checked igual a false, de future_months")
          
              break;
  
            case 'others':
        
              formP.removeControl('others_field');
              console.log("Esto es el switch de Otras (¿Cuáles?) en checked igual a false, de future_months")
          
              break;
          
          }
        }
      }

    selectRadio(event){

      const formA= this.form.get('accidents') as FormGroup;

      if(event.valor=='si'){

        formA.addControl('outcome', this.fb.group({

          date:[new Date(), Validators.required],
          consequences:['', Validators.required],
          status:['', Validators.required]  

        }))

        console.log(JSON.stringify(this.form.value));
      }

      else if(event.valor=='no'){
        
        formA.removeControl('outcome')
      }

    }

    addBasicControls(){

      // this.form.addControl('last_names', this.fb.control('', Validators.required));
      // this.form.addControl('name', this.fb.control('', Validators.required));
      // this.form.addControl('date', this.fb.control(new Date(), Validators.required));
      this.form.addControl('competition_date', this.fb.control(new Date(), Validators.required));
      this.form.addControl('formation', this.fb.control('', Validators.required));
      this.form.addControl('past_months', this.fb.group({

        speed:[false],     
        enduro:[false],
        motocross:[false],
        race:[false],
        rally:[false],
        marathon:[false],
        trial:[false],
        iceRace:[false],
        others:[false],

      }));
      this.form.addControl('future_months', this.fb.group({

        brand:['', Validators.required],
        engine:['', Validators.required],
        type_radio:['', Validators.required], 

        speed:[false],     
        enduro:[false],
        motocross:[false],
        race:[false],
        rally:[false],
        marathon:[false],
        trial:[false],
        iceRace:[false],
        others:[false],

      }));
      this.form.addControl('accidents', this.fb.group({

        radio:['', Validators.required],

      }));
      this.form.addControl('info', this.fb.control('', Validators.required));

    }

}
