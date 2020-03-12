import { Injectable } from '@angular/core';
import { BaseDialog } from 'src/app/shared/components/base-dialog/models/base-dialog';

@Injectable({
	providedIn: 'root'
})
export class DialogOptionService {
	constructor() {}
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

	formError: BaseDialog = {
		logo: 'error',
		title: 'Ha ocurrido error',
		text: 'Revise si quedan campos requeridos sin completar',
		showButtons: false
	};
}
