import { Injectable } from '@angular/core';
import { BaseDialog } from 'src/app/shared/components/base-dialog/models/base-dialog';
import { InvalidControlEnhancerPipe } from '../../pipes/invalid-control-enhancer.pipe';
// tslint:disable: forin

@Injectable({
	providedIn: 'root'
})
export class DialogOptionService {
	constructor(
		private invalidControlEnhancer: InvalidControlEnhancerPipe,
	) { }
	reclaimConfirmation: BaseDialog = {
		logo: 'warning',
		title: 'Confirmación',
		text: 'Se procederá a enviar la solicitud de reclamo',
		showButtons: true,
		showCancelButton: true,
		textPrincipalButton: 'Enviar',
		textCancelButton: 'Cancelar'
	};

	reclaimConfirmated: BaseDialog = {
		logo: 'check',
		title: 'Enviado',
		text: 'Reclamo enviado',
		showButtons: false
	};

	refundConfirmation: BaseDialog = {
		logo: 'warning',
		title: 'Confirmación',
		text: 'Se procederá a enviar la solicitud de reembolso',
		showButtons: true,
		showCancelButton: true,
		textPrincipalButton: 'Enviar',
		textCancelButton: 'Cancelar'
	};

	refundConfirmated: BaseDialog = {
		logo: 'check',
		title: 'Enviado',
		text: 'La solicitud de reembolso ha sido enviada',
		showButtons: false
	};

	authorizationConfirmation: BaseDialog = {
		logo: 'warning',
		title: 'Confirmación',
		text: 'Se procederá a enviar la solicitud de autorización',
		showButtons: true,
		showCancelButton: true,
		textPrincipalButton: 'Enviar',
		textCancelButton: 'Cancelar'
	};

	authorizationConfirmated: BaseDialog = {
		logo: 'check',
		title: 'Enviado',
		text: 'La solicitud de autorización ha sido enviada',
		showButtons: false
	};

	lifeConfirmation: BaseDialog = {
		logo: 'warning',
		title: 'Confirmación',
		text: 'Se procederá a enviar la solicitud de seguro de Vida',
		showButtons: true,
		showCancelButton: true,
		textPrincipalButton: 'Enviar',
		textCancelButton: 'Cancelar'
	};

	healthConfirmation: BaseDialog = {
		logo: 'warning',
		title: 'Confirmación',
		text: 'Se procederá a enviar la solicitud de seguro de gastos médicos mayores',
		showButtons: true,
		showCancelButton: true,
		textPrincipalButton: 'Enviar',
		textCancelButton: 'Cancelar'
	};

	disabilityConfirmation: BaseDialog = {
		logo: 'warning',
		title: 'Confirmación',
		text: 'Se procederá a enviar la solicitud de Suscripción Disability',
		showButtons: true,
		showCancelButton: true,
		textPrincipalButton: 'Enviar',
		textCancelButton: 'Cancelar'
	};

	logoutConfirmation: BaseDialog = {
		logo: 'warning',
		title: 'Confirmación',
		text: '¿Esta seguro de que quiere cerrar sesión?',
		showButtons: true,
		showCancelButton: true,
		textPrincipalButton: 'Cerrar sesión',
		textCancelButton: 'Cancelar'
	};

	requestConfirmated: BaseDialog = {
		logo: 'check',
		title: 'Enviado',
		text: 'La solicitud ha sido enviada',
		showButtons: false
	};

	errorServer: BaseDialog = {
		logo: 'error',
		title: 'Ha ocurrido error',
		text: 'Ha ocurrido un error al intentar realizar la petición',
		showButtons: false
	};

	getInvalidControls(invalidControls: any[]) {
		let text = '; los campos invalidos se encuentran en las sección o campo: \n';

		for (const element in invalidControls) {
			text += `${this.invalidControlEnhancer.transform(invalidControls[element])}, \n`;

		}

		return {
			logo: 'error',
			title: 'Campos Inválidos',
			text: 'Por favor revise el formulario y valide que todo esta completo' + text,
			showButtons: false
		};
	}
}
