import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, RequiredValidator, Validators } from '@angular/forms';
import { FieldConfig } from 'src/app/shared/components/form-components/models/field-config';

@Component({
	selector: 'app-cardiovascular',
	templateUrl: './cardiovascular.component.html',
	styles: []
})
export class CardiovascularComponent implements OnInit {
	@Input() form: FormGroup;

	accordionTitle = [ 'Datos' ];

	questions: any[];

	yesOrNo: FieldConfig = {
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

	diseaseInfoGroup() {
		return this.fb.group({
			fechaEvento: [ '', Validators.required ],
			tratamiento: [ '', Validators.required ],
			fechaUltima: [ '', Validators.required ],
			frequencia: [ '', Validators.required ]
		});
	}

	selectChange(event) {
		if (event.valor === 'si') {
			switch (event.name) {
				case 'haveChestPain':
					this.form.addControl('chestPain', this.diseaseInfoGroup());
					break;

				case 'havePalpitations':
					this.form.addControl('palpitations', this.diseaseInfoGroup());
					break;

				case 'haveCardiacArrhythmias':
					this.form.addControl('cardiacArrhythmias', this.diseaseInfoGroup());
					break;

				case 'haveDifficultyBreathing':
					this.form.addControl('difficultyBreathing', this.diseaseInfoGroup());
					break;

				case 'haveHeartMurmurs':
					this.form.addControl('heartMurmurs', this.diseaseInfoGroup());
					break;

				case 'haveHeartAttacks':
					this.form.addControl('heartAttacks', this.diseaseInfoGroup());
					break;

				case 'haveCoronaryBypassSurgery':
					this.form.addControl('coronaryBypassSurgery', this.diseaseInfoGroup());
					break;

				case 'haveCardiacCatheterization':
					this.form.addControl('cardiacCatheterization', this.diseaseInfoGroup());
					break;

				case 'haveStentPosture':
					this.form.addControl('stentPosture', this.diseaseInfoGroup());
					break;
				default:
					break;
			}
		} else if (event.valor === 'no') {
			switch (event.name) {
				case 'haveChestPain':
					this.form.removeControl('chestPain');
					break;

				case 'havePalpitations':
					this.form.removeControl('palpitations');
					break;

				case 'haveCardiacArrhythmias':
					this.form.removeControl('cardiacArrhythmias');
					break;

				case 'haveDifficultyBreathing':
					this.form.removeControl('difficultyBreathing');
					break;

				case 'haveHeartMurmurs':
					this.form.removeControl('heartMurmurs');
					break;

				case 'haveHeartAttacks':
					this.form.removeControl('heartAttacks');
					break;

				case 'haveCoronaryBypassSurgery':
					this.form.removeControl('coronaryBypassSurgery');
					break;

				case 'haveCardiacCatheterization':
					this.form.removeControl('cardiacCatheterization');
					break;

				case 'haveStentPosture':
					this.form.removeControl('stentPosture');
					break;

				default:
					break;
			}
		}
	}

	ngOnInit() {
		this.questions = [
			{
				label: 'Dolor de Pecho (anginas):',
				name: 'haveChestPain',
				group: 'chestPain'
			},
			{
				label: 'Palpitaciones',
				name: 'havePalpitations',
				group: 'palpitations'
			},
			{
				label: 'Arritmias Cardíacas',
				name: 'haveCardiacArrhythmias',
				group: 'cardiacArrhythmias'
			},
			{
				label: 'Dificultad para respirar',
				name: 'haveDifficultyBreathing',
				group: 'difficultyBreathing'
			},
			{
				label: 'Soplos cardíacos',
				name: 'haveHeartMurmurs',
				group: 'heartMurmurs'
			},
			{
				label: 'Ataques cardíacos (infartos)',
				name: 'haveHeartAttacks',
				group: 'heartAttacks'
			},
			{
				label: 'Cirugía de Bypass coronario',
				name: 'haveCoronaryBypassSurgery',
				group: 'coronaryBypassSurgery'
			},
			{
				label: 'Cateterismo cardíaco',
				name: 'haveCardiacCatheterization',
				group: 'cardiacCatheterization'
			},
			{
				label: 'Postura de Stent',
				name: 'haveStentPosture',
				group: 'stentPosture'
			}
		];
	}

	constructor(private fb: FormBuilder) {}
}
