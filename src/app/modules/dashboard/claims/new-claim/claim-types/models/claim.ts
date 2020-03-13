export interface ClaimModel {
	reclamacion: {
		diagnostico: string;
		tipoServicio: string;
		autorizadoNo: number;
		autorizadoPor: string;
		fechaDiagnostico: Date;
	};
	asegurado: {
		numeroPoliza: number;
		idNumero: number;
		documentoIdentidad: string;
		nombre: string;
		numero: number;
		edad: number;
		tipo: string;
	};
	proveedor: {
		nombre: string;
		correo: string;
		codigo: string;
		noContrato: number;
	};
	reclamados: [
		{
			codigoCpt?: string;
			procedimiento?: string;
			montoReclamado?: number;
			montoAutorizado?: number;
			montoDeducible?: number;
		}
	];
	casoHospitalizacion: {
		ingreso: Date;
		egreso: Date;
	};
	observaciones?: { observacion: string };
}
