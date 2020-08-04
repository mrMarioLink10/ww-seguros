import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { FormArrayGeneratorService } from 'src/app/core/services/forms/form-array-generator.service';
import { $country } from 'src/app/core/form/objects';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';

@Component({
	selector: 'app-know-your-client',
	templateUrl: './know-your-client.component.html',
	styles: []
})
export class KnowYourClientComponent implements OnInit {

	@Input() form: FormGroup;
	@Input() showWarningDot: boolean;
	step: number;

	accordionTitles = [
		'Datos Generales',
		'Datos del representante o apoderado legal',
		'Composición del órgano de gestión',
		'Principales Accionistas - Beneﬁciario Final',
		'Personas Políticamente Expuestas',
		'Perfil Financiero',
		'Declaración',
		'Datos del corredor (quien declara haber revisado los datos dados por el cliente o contratante)',
		'Para uso de la aseguradora'
	];

	exposed_politically: FieldConfig = {
		label: '',
		options: [
			{
				value: 'SI',
				viewValue: 'Si'
			},
			{
				value: 'NO',
				viewValue: 'No'
			}
		]
	};

	main_annual_income_options: FieldConfig = {
		label: 'Ingresos anuales actividad principal',
		options: [
			{
				value: 'MENOS DE 250000',
				viewValue: '< DE US$250 MIL'
			},
			{
				value: '250000 A 1000000',
				viewValue: 'US$250 MIL A US$1 MILLÓN'
			},
			{
				value: '1000000 A 10000000',
				viewValue: 'US$1 MILLÓN A  US$10 MILLONES'
			},
			{
				value: 'MAS DE 10000000',
				viewValue: '> DE US$10 MILLONES'
			}
		]
	};

	other_annual_income_options: FieldConfig = {
		label: 'Ingresos anuales por otras actividades',
		options: [
			{
				value: 'MENOS DE 250000',
				viewValue: '< DE US$250 MIL'
			},
			{
				value: '250000 A 1000000',
				viewValue: 'US$250 MIL A US$1 MILLÓN'
			},
			{
				value: '1000000 A 10000000',
				viewValue: 'US$1 MILLÓN A  US$10 MILLONES'
			},
			{
				value: 'MAS DE 10000000',
				viewValue: '> DE US$10 MILLONES'
			}
		]
	};

	documents = [
		{
			viewValue: 'Copia Registro Mercantil',
		},
		{
			viewValue: 'Copia de Documento de Identidad Personal o pasaporte del Representante o apoderado legal',
		},
		{
			viewValue: 'Copia de Documento de Identidad o pasaportes de los principales accionistas',
		},
		{
			viewValue: 'Copia de Documento de Identidad o pasaporte de los miembros del órgano de gestión',
		},
	];

	countryList: FieldConfig = {
		label: 'País',
		options: $country
	};

	// form: FormGroup;
	bodyMembersFormArray: FormArray;
	shareholdersFormArray: FormArray;
	branchOfficeFormArray: FormArray;
	branch_property;

	management_bodyFormGroup = {
		name_lastname: ['', Validators.required],
		position: ['', Validators.required],
		idType: ['', Validators.required],
		id_passport_management_body: ['', Validators.required],
		nationality_management_body: ['', Validators.required]
	}

	shareholdersFormGroup = {
		name_lastname_shareholder: ['', Validators.required],
		participation_percentage: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
		idType: ['', Validators.required],
		id_passport_shareholder: ['', Validators.required],
		nationality_shareholder: ['', Validators.required]
	}

	branchGroup = {

		branch_office_name: ['', Validators.required],
		branch_office_address: ['', Validators.required],
		list_countrys_branch_office: ['', Validators.required],
		register_number_branch_office: ['', [Validators.required, Validators.min(1)]],
		telephone_branch_office: ['', Validators.required],
		other_info_branch_office: ['', Validators.required]

	}

	idType: FieldConfig =
  {
    label: 'Tipo de documento de identidad',
    options: [
      {
        value: 'CÉDULA',
        viewValue: 'CÉDULA',
      },
      {
        value: 'PASAPORTE',
        viewValue: 'PASAPORTE',
      }
    ],
    name: 'idType',
  };

  minDate: Date;
	constructor(private fb: FormBuilder, public formMethods: FormArrayGeneratorService) {
    var d = new Date();
    d.setFullYear(d.getFullYear() - 18);
    this.minDate = d;
	}

	selectChangeText(event: any) {

		const form = this.form.get('exposed') as FormGroup;

		if (event.valor === 'SI') {

			form.addControl('areatext', this.fb.group({
				specify_investigated_representative: ['', Validators.required],
			}));
			console.log(JSON.stringify(this.form.value));
			console.log(this.documents)

		}
		else if (event.valor === 'NO') {

			form.removeControl('areatext');

		}

	}

	// selectChangeExposedPerson(event: any) {

	// 	const form = this.form.get('exposed') as FormGroup;

	// 	if (event.valor === 'si') {

	// 				form.addControl('input', this.fb.group({
	// 					exposed_name: ['', Validators.required],
	// 					old_current_position: ['', Validators.required],
	// 				}));
	// 				console.log(JSON.stringify(this.form.value));
	// 		}
	// 	 else if (event.valor === 'no') {

	// 				form.removeControl('input');

	// 		}

	// }

	selectChangeBranchOffice(event) {

		const form = this.form.get('exposed').get('branch_office') as FormGroup;

		if (event.valor === 'SI') {

			form.addControl('allBranch_office', this.fb.array([this.createFormArray()]));
			this.branchOfficeFormArray = this.form.get('exposed').get('branch_office').get('allBranch_office') as FormArray;
		}
		else if (event.valor === 'NO') {

			form.removeControl('allBranch_office');
			// this.branchOfficeFormArray = undefined;
			// console.log("holaaaaa");

		}

	}

	createFormArray() {

		return this.fb.group(this.branchGroup);
	}
	setStep(index: number) {
		this.step = index;
	}

	nextStep(panel?: string) {
		this.step++;
	}

	ngOnInit() {

		// this.branch_property = this.fb.array([this.createFormArray()]);
		if (this.form.get('general_data')) {
			if (this.form.get('general_data').get('email'))
			{
				this.form.get('general_data').get('email').setValidators([Validators.required, Validators.email]);
				this.form.get('general_data').get('email').updateValueAndValidity();
			}
		}
		if (this.form.get('representative_data')) {
			if (this.form.get('representative_data').get('representative_email'))
			{
				this.form.get('representative_data').get('representative_email').setValidators([Validators.required, Validators.email]);
				this.form.get('representative_data').get('representative_email').updateValueAndValidity();
			}
		}
		this.addBasicControls();

		console.log(this.form);
		// if (this.form.get('exposed').get('branch_office') &&
		// 	this.form.get('exposed').get('branch_office').get('allBranch_office')) {
		// 	this.branchOfficeFormArray = this.form.get('exposed').get('branch_office').get('allBranch_office') as FormArray;
		// }
		// 	this.form = this.fb.group({
		// 		request: ['', Validators.required],

		//   general_data: this.fb.group({
		//       society_name:['',Validators.required],
		// 		    commercial_name:['',Validators.required],
		// 		    contributor_num:['', Validators.required],
		// 		    home:['',Validators.required],
		// 		    telephone:['', Validators.required],
		// 		    email:['', [Validators.required, Validators.email]],
		// 		    commercial_activity:['', Validators.required],
		//       list_countrys:['', Validators.required]
		//  }),

		//  representative_data: this.fb.group({
		//     name_lastname:['', Validators.required],
		// 		  birthplace:['', Validators.required],
		// 		  birthdate:['', Validators.required],
		// 		  society_position:['', Validators.required],
		// 		  nationality:['', Validators.required],
		// 		  home_telephone:['', Validators.required],
		// 		  cellphone:['',Validators.required],
		// 		  id_passport:['', Validators.required],
		// 		  representative_email:['', Validators.required],
		// 		  address:['', Validators.required],
		//  }),



		// 		management_body_composition: this.fb.group({
		// 			allMembers: this.fb.array([this.formMethods.createItem(this.management_bodyFormGroup)])
		// 		}),

		// 		shareholders: this.fb.group({
		//     			allShareholders: this.fb.array([this.formMethods.createItem(this.shareholdersFormGroup)]),
		//     			employee_numbers: ['', Validators.required]
		// 		}),

		//   exposed: this.fb.group({
		//     exposed_person:[''],
		//     stock_Exchange:['', Validators.required],
		//     branch_office_radio:[''],
		// 		  branch_office: this.fb.group({
		// 			allBranch_office: this.fb.array([this.formMethods.createItem(this.branchGroup)])
		// 		  }),
		//     investigated_representative:[''],

		//   }),

		//   finance: this.fb.group({

		//     main_annual_income:['', Validators.required],
		//     annual_income_others:['', Validators.required],
		//     documents: this.fb.group({
		//         mercantile_register_document:[''],
		//         id_shareholder_document:[''],
		//         id_representative_document:[''],
		//         managemente_body_document:[''],
		//     })
		//   }),

		//   broker: this.fb.group({
		//     social_name:['', Validators.required],
		// 	  	license_num:['', Validators.required],
		//   }),

		//   info_for_the_insurance_carrier: this.fb.group({
		//     fullname_functionary:['', Validators.required],
		// 		  position_functionary:['', Validators.required]
		//   })

		// 	});

		this.bodyMembersFormArray = this.form.get('management_body_composition').get('allMembers') as FormArray;
		this.shareholdersFormArray = this.form.get('shareholders').get('allShareholders') as FormArray;
		// this.branchOfficeFormArray = this.form.get('exposed').get('branch_office').get('allBranch_office') as FormArray;

	}

	ngDoCheck(): void {

		if (this.form.get('exposed')) {
			if (this.form.get('exposed').get('branch_office_radio')) {
				if (this.form.get('exposed').get('branch_office_radio').value == 'SI') {
					if ( this.branchOfficeFormArray == null || this.branchOfficeFormArray == undefined ) {
						this.branchOfficeFormArray = this.form.get('exposed').get('branch_office').get('allBranch_office') as FormArray;
					}
				}
			}
		}
	// 	if (this.form.get('exposed').get('investigated_representative').value == 'si' && !this.form.get('exposed').get('areatext')) {
	// 		const varInvestigated = {
	// 			valor: 'si',
	// 			name: 'investigated_representative'
	// 		};
	// 		this.selectChangeText(varInvestigated);
	// 		console.log("HolAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
	// 	}
	}

  	addBasicControls() {

		// this.form.addControl('request', this.fb.control('', [Validators.required, Validators.min(1)]));

		this.form.addControl('general_data', this.fb.group({
			society_name: ['', Validators.required],
			commercial_name: ['', Validators.required],
			contributor_num: ['', [Validators.required, Validators.min(1)]],
			home: ['', Validators.required],
			telephone: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			commercial_activity: ['', Validators.required],
			list_countrys: ['', Validators.required]
		}));

		// tslint:disable-next-line: align
		this.form.addControl('representative_data', this.fb.group({
			name_lastname: ['', Validators.required],
			birthplace: ['', Validators.required],
			birthdate: ['', Validators.required],
			society_position: ['', Validators.required],
			nationality: ['', Validators.required],
			home_telephone: ['', Validators.required],
			cellphone: ['', Validators.required],
			id_passport: ['', Validators.required],
			idType: ['', Validators.required],
			representative_email: ['', Validators.required, , Validators.email],
			address: ['', Validators.required],
		}));
		// tslint:disable-next-line: align
		this.form.addControl('management_body_composition', this.fb.group({
			allMembers: this.fb.array([this.formMethods.createItem(this.management_bodyFormGroup)])
		}));

		this.form.addControl('shareholders', this.fb.group({
			allShareholders: this.fb.array([this.formMethods.createItem(this.shareholdersFormGroup)]),
			employee_numbers: ['', Validators.required]
		}));

		this.form.addControl('exposed', this.fb.group({
			// exposed_person: [''],
			stock_Exchange: ['', Validators.required],
			branch_office_radio: [''],
			branch_office: this.fb.group({
				// allBranch_office: this.fb.array([this.createFormArray()])
			}),
			investigated_representative: [''],

		}));

		this.form.addControl('finance', this.fb.group({

			main_annual_income: ['' ],
			annual_income_others: ['' ],
			documents: this.fb.group({
				mercantile_register_document: [false],
				id_shareholder_document: [false],
				id_representative_document: [false],
				managemente_body_document: [false],
			})
		}));

		this.form.addControl('broker', this.fb.group({
			social_name: ['', Validators.required],
			license_num: ['', [Validators.required, Validators.min(1)]],
		}));

		// const exposedGroup = this.form.get('exposed') as FormGroup;

		// this.form.addControl('info_for_the_insurance_carrier', this.fb.group({
		// 	fullname_functionary: [' '],
		// 	position_functionary: [' ']
		// }));

		// this.form.addControl('request', this.fb.control(' '));
		// exposedGroup.addControl('input', this.fb.control(' '));
		// exposedGroup.addControl('exposed_person', this.fb.control(' '));
	}

	addMBody(bodyMembersFormArray, group) {
		const increment = bodyMembersFormArray.length + 1;
		bodyMembersFormArray = this.formMethods.addElement(bodyMembersFormArray, increment, group).formArray;
	}

	addShareholders(shareholdersFormArray, group) {
		const increment = shareholdersFormArray.length + 1;
		shareholdersFormArray = this.formMethods.addElement(shareholdersFormArray, increment, group).formArray;
	}

	addBranchOffice(branchOfficeFormArray) {

		// const increment = branchOfficeFormArray.length + 1;
		// branchOfficeFormArray = this.formMethods.addElement(branchOfficeFormArray, increment, this.createFormArray()).formArray;
		// console.log(JSON.stringify(this.form.value));
		branchOfficeFormArray.push(this.createFormArray());
	}

	removeFormArray(index, array: any) {
		array.removeAt(index);
	}
}
