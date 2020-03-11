import { Injectable } from '@angular/core';
import { BaseDialog } from 'src/app/shared/components/base-dialog/models/base-dialog';

@Injectable({
	providedIn: 'root'
})
export class DialogOptionService {
	constructor() {}
	reclaimConfirmation: BaseDialog = {
		logo: '',
		title: 'Confirmación',
		text: 'Se procederá a enviar la solicitud de reclamo',
		showButtons: true,
		showCancelButton: true,
		textPrincipalButton: 'Enviar',
		textCancelButton: 'Cancelar'
	};

	reclaimConfirmated: BaseDialog = {
		logo: '',
		title: 'Enviado',
		text: 'Reclamo enviado',
		showButtons: false
	};
}
