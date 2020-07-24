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
  @Input() showWarningDot: boolean;
  step: number;

  // accordionTitles=["Datos"]

  displayedColumns: string[] = ['activo', 'pasivo'];
  displayedColumnsSecond: string[] = ['ingresos', 'pasado', 'antepasado'];

  dataSource = [
    {
      labelActive: 'Efectivo en bancos',
      nameActive: 'cashBanks',
      labelPasive: 'Cuentas por Pagar a Bancos (Largo Plazo)',
      namePasive: 'accountsPayableBanks'
    },
    {
      labelActive: 'Cuentas por Cobrar (Largo Plazo)',
      nameActive: 'accountsReceivableLongTerm',
      labelPasive: 'Cuentas por Pagar a Otros (Largo Plazo)',
      namePasive: 'accountsPayableOthers'
    },
    {
      labelActive: 'Cuentas por Cobrar',
      nameActive: 'accountsReceivable',
      labelPasive: 'Cuentas por Pagar',
      namePasive: 'accountsPayable'
    },
    {
      labelActive: 'Valores Acumulados en Seguros de Vida',
      nameActive: 'accumulatedValueLifeInsurance',
      labelPasive: 'Préstamos en Seguros de Vida',
      namePasive: 'loansLifeInsurance'
    },
    {
      labelActive: 'Bienes Raíces',
      nameActive: 'realEstate',
      labelPasive: 'Intereses e Impuestos por Pagar',
      namePasive: 'interestsTaxesToPay'
    },
    {
      labelActive: 'Intereses del Negocio',
      nameActive: 'businessInterests',
      labelPasive: 'Hipotecas en Bienes Raíces',
      namePasive: 'realEstateMortgage'
    },
    {
      labelActive: 'Acciones y Bonos (No incluidos anteriormente)',
      nameActive: 'shareBonds',
      labelPasive: 'Otros Pasivos (Favor describa)',
      namePasive: 'otherLiabilities'
    },
    {
      labelActive: 'Propiedad Personal (Auto, muebles, etc.)',
      nameActive: 'personalProperty',
      labelPasive: 'Total Pasivos',
      namePasive: 'totalLiabilities'
    },
    {
      labelActive: 'Otros activos (Describa)',
      nameActive: 'otherAssets',
      labelPasive: 'TOTAL',
      namePasive: 'totalPasive'
    },
    {
      labelActive: 'TOTAL',
      nameActive: 'totalActive',
      labelPasive: 'VALOR NETO DEL PATRIMONIO',
      namePasive: 'netWorth'
    },
  ];

  dataSourceSecond = [
    {
      incomeLabel: 'Salario Anual',
      pastField: 'annualIncome',
      beforePastField: 'annualIncome'
    },
    {
      incomeLabel: 'Dividendos, etc.',
      pastField: 'dividend',
      beforePastField: 'dividend'
    },
    {
      incomeLabel: 'Otros Ingresos (Describa)',
      pastField: 'otherIncome',
      beforePastField: 'otherIncome'
    },
    {
      incomeLabel: 'Total',
      pastField: 'total',
      beforePastField: 'total'
    }
  ];

  currencyLabel = '---------------------------------------------------------------------------------------';

  currencyOptions: FieldConfig = {
    label: 'Moneda',
    options: [
      {
        value: 'DOLARES',
        viewValue: 'Dolares'
      },
      {
        value: 'PESOS DOMINICANOS',
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

  setStep(index: number) {
    this.step = index;
  }

  nextStep(panel?: string) {
    this.step++;
  }

  addBasicControls() {

    this.form.addControl('name', this.fb.control('', Validators.required));
    this.form.addControl('date', this.fb.control(new Date(), Validators.required));
    this.form.addControl('currency', this.fb.control('', Validators.required));
    this.form.addControl('lawsuit', this.fb.control('', Validators.required));
    this.form.addControl('info', this.fb.control('', Validators.required));
    this.form.addControl('table', this.fb.group({

      active: this.fb.group({

        cashBanks: ['', [Validators.required, Validators.min(1)]],
        accountsReceivableLongTerm: ['', [Validators.required, Validators.min(1)]],
        accountsReceivable: ['', [Validators.required, Validators.min(1)]],
        accumulatedValueLifeInsurance: ['', [Validators.required, Validators.min(1)]],
        realEstate: ['', [Validators.required, Validators.min(1)]],
        businessInterests: ['', [Validators.required, Validators.min(1)]],
        shareBonds: ['', [Validators.required, Validators.min(1)]],
        personalProperty: ['', [Validators.required, Validators.min(1)]],
        otherAssets: ['', [Validators.required, Validators.min(1)]],
        totalActive: ['', [Validators.required, Validators.min(1)]],


      }),

      pasive: this.fb.group({

        accountsPayableBanks: ['', [Validators.required, Validators.min(1)]],
        accountsPayableOthers: ['', [Validators.required, Validators.min(1)]],
        accountsPayable: ['', [Validators.required, Validators.min(1)]],
        loansLifeInsurance: ['', [Validators.required, Validators.min(1)]],
        interestsTaxesToPay: ['', [Validators.required, Validators.min(1)]],
        realEstateMortgage: ['', [Validators.required, Validators.min(1)]],
        otherLiabilities: ['', [Validators.required, Validators.min(1)]],
        totalLiabilities: ['', [Validators.required, Validators.min(1)]],
        totalPasive: ['', [Validators.required, Validators.min(1)]],
        netWorth: ['', [Validators.required, Validators.min(1)]]

      })

    }));

    this.form.addControl('incomeTable', this.fb.group({

      lastYear: this.fb.group({

        annualIncome: ['', [Validators.required, Validators.min(1)]],
        dividend: ['', [Validators.required, Validators.min(1)]],
        otherIncome: ['', [Validators.required, Validators.min(1)]],
        total: ['', [Validators.required, Validators.min(1)]],

      }),

      beforeLastYear: this.fb.group({

        annualIncome: ['', [Validators.required, Validators.min(1)]],
        dividend: ['', [Validators.required, Validators.min(1)]],
        otherIncome: ['', [Validators.required, Validators.min(1)]],
        total: ['', [Validators.required, Validators.min(1)]],

      })

    }));


  }

  selectChange(event) {

    this.currencyLabel = event.valor;
    console.log('El valor del select es: ' + this.currencyLabel);
    console.log(JSON.stringify(this.form.value));


  }


}
