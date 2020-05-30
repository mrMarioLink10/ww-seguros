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

	exitConfirm: BaseDialog = {
		logo: 'warning',
		title: 'Tiene trabajo sin guardar',
		text: `¿Está seguro de que quiere salir?`,
		showButtons: true,
		showCancelButton: true,
		textPrincipalButton: 'Salir',
		textCancelButton: 'Permanecer'
	};

	WIP: BaseDialog = {
		logo: 'warning',
		title: 'WIP',
		text: `Esta funcionalidad todavía no esta disponible; puede guardar el formulario.`,
		showButtons: false,
	};

	idNumberNotFound: BaseDialog = {
		logo: 'warning',
		title: 'No se ha encontrado ningún asegurado',
		text: `Intente con otro numero de ID`,
		showButtons: false,
	};

	noCNotFound: BaseDialog = {
		logo: 'warning',
		title: 'No se ha encontrado ningúna cotización',
		text: `Intente con otro numero de cotización o solicite una nueva cotización`,
		showButtons: false,
	};

	deleteConfirm(title: string) {
		return {
			logo: 'warning',
			title: `¿Esta seguro de que desea borrar esta solicitud de ${title}?`,
			text: `Esta acción no se podra revertir`,
			showButtons: true,
			showCancelButton: true,
			textPrincipalButton: 'Eliminar',
			textCancelButton: 'Cancelar'
		};
	}

	deleteConfirmed(title: string) {
		return {
			logo: 'check',
			title: `Se ha eliminado correctamente la solicitud de ${title}`,
			text: ``,
			showButtons: false,
		};
	}

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

	idNumberFound(data: any) {
		return {
			logo: 'check',
			title: `${data.asegurado.nombres_asegurado} ${data.asegurado.apellidos_asegurado}`,
			text: `Se encontró el siguiente asegurado`,
			showButtons: false,
		};
	}

	QuoteFound(data: any) {
		return {
			logo: 'check',
			title: `${data.nombre} Para Tipo Seguro ${data.tipoSeguro}`,
			text: `Se encontró el siguiente asegurado`,
			showButtons: false,
		};
	}

	noCFound(data: any) {
		return {
			logo: 'check',
			title: `Cotización encontrada`,
			text: `Se encontró la cotización asignada a ${data.nombre}`,
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
