import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../../../../../shared/components/form-components/models/field-config'
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FormHandlerService } from '../../../../../../core/services/forms/form-handler.service';

@Component({
	selector: 'app-money-laundering',
	templateUrl: './money-laundering.component.html',
	styles: []
})
export class MoneyLaunderingComponent implements OnInit {

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

		const form = this.anti_laundering as FormGroup;

		if (event.valor === 'si') {

			form.addControl('investigated', this.fb.group({
				specify_investigation: ['', Validators.required]
			}));

		}
		else if (event.valor === 'no') {

			form.removeControl('investigated');

		}

	}

	anti_laundering: FormGroup;

	constructor(private fb: FormBuilder, public formHandler: FormHandlerService) { }

	ngOnInit() {
		this.anti_laundering = this.fb.group({
			request: ['', Validators.required],

			society_name: ['', Validators.required],
			contributor_num: ['', Validators.required],
			associate_type: ['', Validators.required],
			home: ['', Validators.required],

			date: ['', Validators.required],
			register_num: ['', Validators.required],
			postal_address: ['', Validators.required],
			telephone: ['', Validators.required],
			fax: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			main_activity: ['', Validators.required],

			investigation_status: ['no'],
			specify_investigation: ['', Validators.required],

			prevention_program: ['', Validators.required],
			management_body: ['', Validators.required],
			written_policy: ['', Validators.required],
			ban_policy: ['', Validators.required],
			regulation_policy: ['', Validators.required],
			branch_office_ban_policy: ['', Validators.required],
			anonymous_customer_service: ['', Validators.required],

			means_of_audit: ['', Validators.required],
			clients_monitoring: ['', Validators.required],
			databases_monitoring: ['', Validators.required],

			prevention_training: ['', Validators.required],
			official_responsible: ['', Validators.required],
			training_functionary: ['', Validators.required],
			staff_training: ['', Validators.required],
			prove_fullfilment: ['', Validators.required],
			risk_program: ['', Validators.required],
			evaluation_techniques: ['', Validators.required],
			risk_evaluation_techniques: ['', Validators.required],
			implement_policy: ['', Validators.required],
			detection_means: ['', Validators.required],
			transaction_policys: ['', Validators.required],
			required_documents: ['', Validators.required],

			name: ['', Validators.required],
			license: ['', Validators.required],

			functionary_name: ['', Validators.required],
			position: ['', Validators.required]

		});
	}

}
