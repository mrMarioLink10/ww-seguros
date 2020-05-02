import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';

@Component({
  selector: 'app-financial-status',
  templateUrl: './financial-status.component.html',
  styles: []
})
export class FinancialStatusComponent implements OnInit {

  @Input() form: FormGroup;

  // accordionTitles=["Datos"]

  displayedColumns: string[] = ['activo', 'pasivo'];
  displayedColumnsSecond: string[] = ['ingresos', 'pasado', 'antepasado'];

  dataSource = [
    {
      labelActive: 'Efectivo en bancos',
      nameActive: 'cash_banks',
      labelPasive: 'Cuentas por Pagar a Bancos (Largo Plazo)',
      namePasive: 'accounts_payable_banks'
    },
    {
      labelActive: 'Cuentas por Cobrar (Largo Plazo)',
      nameActive: 'accounts_receivable_longTerm',
      labelPasive: 'Cuentas por Pagar a Otros (Largo Plazo)',
      namePasive: 'accounts_payable_others'
    },
    {
      labelActive: 'Cuentas por Cobrar',
      nameActive: 'accounts_receivable',
      labelPasive: 'Cuentas por Pagar',
      namePasive: 'accounts_payable'
    },
    {
      labelActive: 'Valores Acumulados en Seguros de Vida',
      nameActive: 'accumulated_value_life_insurance',
      labelPasive: 'Préstamos en Seguros de Vida',
      namePasive: 'loans_life_insurance'
    },
    {
      labelActive: 'Bienes Raíces',
      nameActive: 'real_estate',
      labelPasive: 'Intereses e Impuestos por Pagar',
      namePasive: 'interests_taxes_toPay'
    },
    {
      labelActive: 'Intereses del Negocio',
      nameActive: 'business_interests',
      labelPasive: 'Hipotecas en Bienes Raíces',
      namePasive: 'real_estate_mortgage'
    },
    {
      labelActive: 'Acciones y Bonos (No incluidos anteriormente)',
      nameActive: 'share_bonds',
      labelPasive: 'Otros Pasivos (Favor describa)',
      namePasive: 'other_liabilities'
    },
    {
      labelActive: 'Propiedad Personal (Auto, muebles, etc.)',
      nameActive: 'personal_property',
      labelPasive: 'Total Pasivos',
      namePasive: 'total_liabilities'
    },
    {
      labelActive: 'Otros activos (Describa)',
      nameActive: 'other_assets',
      labelPasive: 'TOTAL',
      namePasive: 'total_pasive'
    },
    {
      labelActive: 'TOTAL',
      nameActive: 'total_active',
      labelPasive: 'VALOR NETO DEL PATRIMONIO',
      namePasive: 'net_worth'
    },
  ]

  dataSourceSecond = [
    {
      incomeLabel: 'Salario Anual',
      pastField: 'annual_income',
      beforePastField: 'annual_income'
    },
    {
      incomeLabel: 'Dividendos, etc.',
      pastField: 'dividend',
      beforePastField: 'dividend'
    },
    {
      incomeLabel: 'Otros Ingresos (Describa)',
      pastField: 'other_income',
      beforePastField: 'other_income'
    },
    {
      incomeLabel: 'Total',
      pastField: 'total',
      beforePastField: 'total'
    }
  ]

  currencyLabel = "---------------------------------------------------------------------------------------";

  currencyOptions: FieldConfig = {
    label: 'Moneda',
    options: [
      {
        value: 'Dolares',
        viewValue: 'Dolares'
      },
      {
        value: 'Pesos Dominicanos',
        viewValue: 'Pesos Dominicanos'
      }
    ]
  };

  financial: FormGroup;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {

    this.addBasicControls();

    // this.financial= this.fb.group({

    //   name:['', Validators.required],
    //   date:[new Date(), Validators.required],
    //   currency:['', Validators.required],
    //   lawsuit:['', Validators.required],
    //   info:['', Validators.required],
    //   table: this.fb.group({

    //     active: this.fb.group({

    //       cash_banks:['', [Validators.required, Validators.min(1)]],
    //       accounts_receivable_longTerm:['', [Validators.required, Validators.min(1)]],
    //       accounts_receivable:['', [Validators.required, Validators.min(1)]],
    //       accumulated_value_life_insurance:['', [Validators.required, Validators.min(1)]],
    //       real_estate:['', [Validators.required, Validators.min(1)]],
    //       business_interests:['', [Validators.required, Validators.min(1)]],
    //       share_bonds:['', [Validators.required, Validators.min(1)]],
    //       personal_property:['', [Validators.required, Validators.min(1)]],
    //       other_assets:['', [Validators.required, Validators.min(1)]],
    //       total_active:['', [Validators.required, Validators.min(1)]],


    //     }),

    //     pasive: this.fb.group({

    //       accounts_payable_banks:['', [Validators.required, Validators.min(1)]],
    //       accounts_payable_others:['', [Validators.required, Validators.min(1)]],
    //       accounts_payable:['', [Validators.required, Validators.min(1)]],
    //       loans_life_insurance:['', [Validators.required, Validators.min(1)]],
    //       interests_taxes_toPay:['', [Validators.required, Validators.min(1)]],
    //       real_estate_mortgage:['', [Validators.required, Validators.min(1)]],
    //       other_liabilities:['', [Validators.required, Validators.min(1)]],
    //       total_liabilities:['', [Validators.required, Validators.min(1)]],
    //       total_pasive:['', [Validators.required, Validators.min(1)]],
    //       net_worth:['', [Validators.required, Validators.min(1)]]

    //     })

    //   }),

    //   income_table: this.fb.group({

    //     last_year: this.fb.group({

    //       annual_income:['', [Validators.required, Validators.min(1)]],
    //       dividend:['', [Validators.required, Validators.min(1)]],
    //       other_income:['', [Validators.required, Validators.min(1)]],
    //       total:['', [Validators.required, Validators.min(1)]],

    //     }),

    //     before_last_year: this.fb.group({

    //       annual_income:['', [Validators.required, Validators.min(1)]],
    //       dividend:['', [Validators.required, Validators.min(1)]],
    //       other_income:['', [Validators.required, Validators.min(1)]],
    //       total:['', [Validators.required, Validators.min(1)]],

    //     })

    //   })

    // })

    console.log(JSON.stringify(this.form.value));

  }


  addBasicControls() {

    this.form.addControl('name', this.fb.control('', Validators.required));
    this.form.addControl('date', this.fb.control(new Date(), Validators.required));
    this.form.addControl('currency', this.fb.control('', Validators.required));
    this.form.addControl('lawsuit', this.fb.control('', Validators.required));
    this.form.addControl('info', this.fb.control('', Validators.required));
    this.form.addControl('table', this.fb.group({

      active: this.fb.group({

        cash_banks: ['', [Validators.required, Validators.min(1)]],
        accounts_receivable_longTerm: ['', [Validators.required, Validators.min(1)]],
        accounts_receivable: ['', [Validators.required, Validators.min(1)]],
        accumulated_value_life_insurance: ['', [Validators.required, Validators.min(1)]],
        real_estate: ['', [Validators.required, Validators.min(1)]],
        business_interests: ['', [Validators.required, Validators.min(1)]],
        share_bonds: ['', [Validators.required, Validators.min(1)]],
        personal_property: ['', [Validators.required, Validators.min(1)]],
        other_assets: ['', [Validators.required, Validators.min(1)]],
        total_active: ['', [Validators.required, Validators.min(1)]],


      }),

      pasive: this.fb.group({

        accounts_payable_banks: ['', [Validators.required, Validators.min(1)]],
        accounts_payable_others: ['', [Validators.required, Validators.min(1)]],
        accounts_payable: ['', [Validators.required, Validators.min(1)]],
        loans_life_insurance: ['', [Validators.required, Validators.min(1)]],
        interests_taxes_toPay: ['', [Validators.required, Validators.min(1)]],
        real_estate_mortgage: ['', [Validators.required, Validators.min(1)]],
        other_liabilities: ['', [Validators.required, Validators.min(1)]],
        total_liabilities: ['', [Validators.required, Validators.min(1)]],
        total_pasive: ['', [Validators.required, Validators.min(1)]],
        net_worth: ['', [Validators.required, Validators.min(1)]]

      })

    }));

    this.form.addControl('income_table', this.fb.group({

      last_year: this.fb.group({

        annual_income: ['', [Validators.required, Validators.min(1)]],
        dividend: ['', [Validators.required, Validators.min(1)]],
        other_income: ['', [Validators.required, Validators.min(1)]],
        total: ['', [Validators.required, Validators.min(1)]],

      }),

      before_last_year: this.fb.group({

        annual_income: ['', [Validators.required, Validators.min(1)]],
        dividend: ['', [Validators.required, Validators.min(1)]],
        other_income: ['', [Validators.required, Validators.min(1)]],
        total: ['', [Validators.required, Validators.min(1)]],

      })

    }));


  }

  selectChange(event) {

    this.currencyLabel = event.valor;
    console.log("El valor del select es: " + this.currencyLabel)
    console.log(JSON.stringify(this.form.value));


  }


}
