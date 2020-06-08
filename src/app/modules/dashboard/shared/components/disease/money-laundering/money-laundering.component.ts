import { Component, OnInit, Input } from '@angular/core';
import { FieldConfig } from '../../../../../../shared/components/form-components/models/field-config'
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FormHandlerService } from '../../../../../../core/services/forms/form-handler.service';

@Component({
	selector: 'app-money-laundering',
	templateUrl: './money-laundering.component.html',
	styles: []
})
export class MoneyLaunderingComponent implements OnInit {

	@Input() form: FormGroup;

	accordionTitles = [
		'Datos Generales',
		'Controles y evaluación de anti lavado de dinero o ﬁnanciamiento de terrorismo',
		'Declaración',
		'Datos del corredor (quien declara haber revisado los datos dada por el cliente o contratante',
		'Para uso de la aseguradora'
	];

	investigation: FieldConfig = {
		label: '',
		options: [
			{
				value: 'si',
				viewValue: 'Si'
			},
			{
				value: 'no',
				viewValue: 'No'
			}
		]
	};

	evaluationOptions: FieldConfig = {
		label: '',
		options: [
			{
				value: 'si',
				viewValue: 'Si'
			},
			{
				value: 'no',
				viewValue: 'No'
			},
			{
				value: 'na',
				viewValue: 'NA'
			}
		]
	};

	documents: FieldConfig = {
		label: '',
		options: [
			{
				value: 'copia_manual',
				viewValue: 'Copia de Manual de Procedimiento Interno para la Prevención y Control de Lavado de Dinero o Financiamiento de Terrorismo'
			},
			{
				value: 'copia_formularios',
				viewValue: 'Copia de los Formularios de Control (CSC/ALD)'
			}
		]
	};

	selectChangeInvestigated(event: any) {

		const form = this.form as FormGroup;

		if (event.valor === 'si') {

			form.addControl('specify_investigation', this.fb.control('', Validators.required));
			console.log(JSON.stringify(this.form.value));

		}
		else if (event.valor === 'no') {

			form.removeControl('specify_investigation');

		}

	}

	// anti_laundering: FormGroup;

	constructor(private fb: FormBuilder, public formHandler: FormHandlerService) { }

	ngOnInit() {

		this.addBasicControls();

		// this.form = this.fb.group({
		// 	request: ['', Validators.required],

		// 	society_name: ['', Validators.required],
		// 	contributor_num: ['', Validators.required],
		// 	associate_type: ['', Validators.required],
		// 	home: ['', Validators.required],

		// 	date: ['', Validators.required],
		// 	register_num: ['', Validators.required],
		// 	postal_address: ['', Validators.required],
		// 	telephone: ['', Validators.required],
		// 	fax: ['', Validators.required],
		// 	email: ['', [Validators.required, Validators.email]],
		// 	main_activity: ['', Validators.required],

		// 	investigation_status: [''],

		// 	prevention_program: ['', Validators.required],
		// 	management_body: ['', Validators.required],
		// 	written_policy: ['', Validators.required],
		// 	ban_policy: ['', Validators.required],
		// 	regulation_policy: ['', Validators.required],
		// 	branch_office_ban_policy: ['', Validators.required],
		// 	anonymous_customer_service: ['', Validators.required],

		// 	means_of_audit: ['', Validators.required],
		// 	clients_monitoring: ['', Validators.required],
		// 	databases_monitoring: ['', Validators.required],

		// 	prevention_training: ['', Validators.required],
		// 	official_responsible: ['', Validators.required],
		// 	training_functionary: ['', Validators.required],
		// 	staff_training: ['', Validators.required],
		// 	prove_fullfilment: ['', Validators.required],
		// 	risk_program: ['', Validators.required],
		// 	evaluation_techniques: ['', Validators.required],
		// 	risk_evaluation_techniques: ['', Validators.required],
		// 	implement_policy: ['', Validators.required],
		// 	detection_means: ['', Validators.required],
		// 	transaction_policys: ['', Validators.required],
		// 	required_documents: ['', Validators.required],

		// 	name: ['', Validators.required],
		// 	license: ['', Validators.required],

		// 	functionary_name: ['', Validators.required],
		// 	position: ['', Validators.required]

		// });
	}


	addBasicControls() {

		// this.form.addControl('request', this.fb.control('', [Validators.required, Validators.min(1)]));
		this.form.addControl('society_name', this.fb.control('', Validators.required));
		this.form.addControl('contributor_num', this.fb.control('', Validators.required));
		this.form.addControl('associate_type', this.fb.control('', Validators.required));
		this.form.addControl('home', this.fb.control('', Validators.required));
		this.form.addControl('date', this.fb.control(new Date(), Validators.required));
		this.form.addControl('register_num', this.fb.control('', [Validators.required, Validators.min(1)]));
		this.form.addControl('postal_address', this.fb.control('', Validators.required));
		this.form.addControl('telephone', this.fb.control('', Validators.required));
		this.form.addControl('fax', this.fb.control('', Validators.required));
		this.form.addControl('email', this.fb.control('', Validators.required));
		this.form.addControl('main_activity', this.fb.control('', Validators.required));
		this.form.addControl('investigation_status', this.fb.control('', Validators.required));
		this.form.addControl('prevention_program', this.fb.control('', Validators.required));
		this.form.addControl('management_body', this.fb.control('', Validators.required));
		this.form.addControl('written_policy', this.fb.control('', Validators.required));
		this.form.addControl('ban_policy', this.fb.control('', Validators.required));
		this.form.addControl('regulation_policy', this.fb.control('', Validators.required));
		this.form.addControl('branch_office_ban_policy', this.fb.control('', Validators.required));
		this.form.addControl('anonymous_customer_service', this.fb.control('', Validators.required));
		this.form.addControl('means_of_audit', this.fb.control('', Validators.required));
		this.form.addControl('clients_monitoring', this.fb.control('', Validators.required));
		this.form.addControl('databases_monitoring', this.fb.control('', Validators.required));
		this.form.addControl('prevention_training', this.fb.control('', Validators.required));
		this.form.addControl('official_responsible', this.fb.control('', Validators.required));
		this.form.addControl('training_functionary', this.fb.control('', Validators.required));
		this.form.addControl('staff_training', this.fb.control('', Validators.required));
		this.form.addControl('prove_fullfilment', this.fb.control('', Validators.required));
		this.form.addControl('risk_program', this.fb.control('', Validators.required));
		this.form.addControl('evaluation_techniques', this.fb.control('', Validators.required));
		this.form.addControl('risk_evaluation_techniques', this.fb.control('', Validators.required));
		this.form.addControl('implement_policy', this.fb.control('', Validators.required));
		this.form.addControl('detection_means', this.fb.control('', Validators.required));
		this.form.addControl('transaction_policys', this.fb.control('', Validators.required));
		this.form.addControl('required_documents', this.fb.control('', Validators.required));
		this.form.addControl('name', this.fb.control('', Validators.required));
		this.form.addControl('license', this.fb.control('', Validators.required));
		this.form.addControl('functionary_name', this.fb.control('', Validators.required));
		this.form.addControl('position', this.fb.control('', Validators.required));

	}

}
