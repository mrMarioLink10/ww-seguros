import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'invalidControlEnhancer'
})
export class InvalidControlEnhancerPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let newValue: string;

    switch (value) {
      case 'person':
        newValue = 'Información del Propuesto Asegurado';
        return newValue;

      case 'employer':
        newValue = 'Empleador (Datos laborales)';
        return newValue;

      case 'contractor':
        newValue = 'Contratante';
        return newValue;

      case 'payer':
        newValue = 'Pagador';
        return newValue;

      case 'financialProfile':
        newValue = 'Perfil Financiero';
        return newValue;

      case 'releventPlanInformation':
        newValue = 'Información pertinente al plan';
        return newValue;

      case 'IncomeMainActivity':
        newValue = 'Información pertinente al pago de la prima';
        return newValue;

      case 'primaryBenefits':
        newValue = 'Designación de los Beneficiario(s) Primario(s)';
        return newValue;

      case 'contingentBeneficiary':
        newValue = 'Beneficiario(s) Contingente(s)';
        return newValue;

      case 'generalInformation':
        newValue = 'Información general';
        return newValue;

      case 'medicalHistory':
        newValue = 'Historial Médico';
        return newValue;

      case 'agentReport':
        newValue = 'Reporte del agente';
        return newValue;

      case 'num_financial_quote':
        newValue = 'No. de Cotización';
        return newValue;

      case 'insured_data':
        newValue = 'Datos del propuesto Asegurado y Estatus laboral';
        return newValue;

      case 'policyholder':
        newValue = 'Datos del Contratante';
        return newValue;

      case 'questions':
        newValue = 'Cuestionario Médico';
        return newValue;

      case 'plan':
        newValue = 'Opción del Plan';
        return newValue;

      case 'main':
        newValue = 'Beneficiarios Primarios';
        return newValue;

      case 'contingent':
        newValue = 'Beneficiario(s) Contigente(s)';
        return newValue;

      case 'deducibles':
        newValue = 'Deducibles';
        return newValue;

      case 'payment':
        newValue = 'Frecuencia de pago';
        return newValue;

      case 'plans':
        newValue = 'Planes';
        return newValue;

      case 'NoC':
        newValue = 'No. de Cotización';
        return newValue;

      case 'requestType':
        newValue = 'Tipo de Solicitud';
        return newValue;

      case 'contractor':
        newValue = 'Contratante';
        return newValue;

      case 'incomes':
        newValue = 'Perfil financiero';
        return newValue;

      case 'questionsB':
        newValue = 'Sección B';
        return newValue;

      case 'sectionAHelper':
        newValue = 'Sección A';
        return newValue;

      case 'exposedPerson':
        newValue = 'Persona políticamente expuesta';
        return newValue;

      case 'reclamacion':
        newValue = 'Formulario de Reclamación';
        return newValue;

      case 'asegurado':
        newValue = 'Datos del Asegurado';
        return newValue;

      case 'proveedor':
        newValue = 'Datos del Proveedor';
        return newValue;

      case 'reclamados':
        newValue = 'Servicios Reclamados';
        return newValue;

      case 'fecha':
        newValue = 'Fecha';
        return newValue;

      case 'informacion':
        newValue = 'Información del Asegurado / Paciente';
        return newValue;

      case 'diagnosticos':
        newValue = 'Diagnóstico o Naturaleza de condición Médica / Accidente';
        return newValue;

      case 'forma':
        newValue = 'Información para fines de pago';
        return newValue;

      case 'informacionAsegurado':
        newValue = 'Información del Asegurado';
        return newValue;

      case 'informacionMedica':
        newValue = 'Información médica';
        return newValue;

      case 'contractorQuestionnaires':
        newValue = 'Formularios del contratante';
        return newValue;

      case 'questionnaires':
        newValue = 'Formularios adicionales';
        return newValue;


      case 'example':
        newValue = '';
        return newValue;


      default:
        return value;
    }
  }

}
