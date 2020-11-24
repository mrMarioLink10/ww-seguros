import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableStatus'
})
export class TableStatusPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    switch (value) {
      case '0':
        return 'Incompleto';

      case '1':
        return 'Completo';

      case '2':
        return 'Enviado';

      case '3':
        return 'Disponible';

      case '4':
        return 'Eliminado';

      case '6':
        return 'Por completar cliente';

      case '7':
        return 'Enviado por el cliente';

      case 0:
        return 'Incompleto';

      case 1:
        return 'Completo';

      case 2:
        return 'Enviado';

      case 3:
        return 'Disponible';

      case 4:
        return 'Eliminado';

      case 6:
        return 'Por completar cliente';

      case 7:
        return 'Enviado por el cliente';

      default:
        return 'Indeterminado';
    }
  }

}
