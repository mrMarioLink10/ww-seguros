import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'refundDiagnosticStatus'
})
export class RefundDiagnosticStatusPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    switch (value) {
      case '1': case 1:
        return 'Enviado';

      case '2': case 2: 
        return 'Recibido';

      case '3': case 3:
        return 'Devuelto';

      case '4': case 4:
        return 'Completivo';

      case '5': case 5:
        return 'En evaluación';

      case '6': case 6:
        return 'Declinado';

      case '7': case 7:
        return 'Falta Información';

      case '8': case 8:
        return 'Evaluado';

      case '9': case 9:
        return 'Incompleto';

      case '10': case 10:
        return 'Completo';

      case '11': case 11:
        return 'Cancelado';

      case '12': case 12:
        return 'Adjuntar expediente';

      case '13': case 13:
        return 'Sin Enviar';

      default:
        return 'Indeterminado';
    }
  }

}