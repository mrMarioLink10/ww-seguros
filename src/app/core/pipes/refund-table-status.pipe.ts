import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'refundTableStatus'
})
export class RefundTableStatusPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    switch (value) {
      case '1': case 1:
        return 'Enviado';

      case '2': case 2: 
        return 'En Evaluación';

      case '3': case 3:
        return 'Devuelto';

      case '4': case 4:
        return 'Completivo';
      
      case '5': case 5:
        return 'Asignado';

      case '6': case 6:
        return 'Declinado';

      case '7': case 7:
        return 'Falta Información';

      case '8': case 8:
        return 'Evaluado';

      case '9': case 9:
        return 'Pagado';

      case '11': case 11:
        return 'Incompleto';

      case '12': case 12:
        return 'Completo';

      case '13': case 13:
        return 'Cancelado';

      case '14': case 14:
        return 'Adjuntar Expediente';

      default:
        return 'Indeterminado';
    }
  }

}
