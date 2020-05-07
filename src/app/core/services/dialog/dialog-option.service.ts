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

	logoutConfirmation: BaseDialog = {
		logo: 'warning',
		title: 'Confirmación',
		text: '¿Esta seguro de que quiere cerrar sesión?',
		showButtons: true,
		showCancelButton: true,
		textPrincipalButton: 'Cerrar sesión',
		textCancelButton: 'Cancelar'
	};

	errorServer: BaseDialog = {
		logo: 'error',
		title: 'Ha ocurrido error',
		text: 'Ha ocurrido un error al intentar realizar la petición',
		showButtons: false
	};

	cancelRequest: BaseDialog = {
		logo: 'warning',
		title: 'Cancelar',
		text: `Se procederá a salir al menu, ¿esta seguro?`,
		showButtons: true,
		showCancelButton: true,
		textPrincipalButton: 'Salir',
		textCancelButton: 'No'
	};

	sendForm(form: string) {
		return {
			logo: 'warning',
			title: 'Confirmación',
			text: `Se procederá a enviar la solicitud de ${form}`,
			showButtons: true,
			showCancelButton: true,
			textPrincipalButton: 'Enviar',
			textCancelButton: 'Cancelar'
		};
	}

	confirmedForm(form: string) {
		return {
			logo: 'check',
			title: 'Enviado',
			text: `La solicitud de ${form} ha sido enviada`,
			showButtons: false,
		};
	}

	saveForm(form: string) {
		return {
			logo: 'warning',
			title: 'Confirmación',
			text: `Se procederá a guardar la solicitud de ${form}`,
			showButtons: true,
			showCancelButton: true,
			textPrincipalButton: 'Guardar',
			textCancelButton: 'Cancelar'
		};
	}

	confirmedSavedForm(form: string) {
		return {
			logo: 'check',
			title: 'Enviado',
			text: `La solicitud de ${form} ha sido guardada`,
			showButtons: false,
		};
	}

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
