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
        return 'Cancelado';

      case 0:
        return 'Incompleto';

      case 1:
        return 'Completo';

      case 2:
        return 'Enviado';

      case 3:
        return 'Cancelado';

      default:
        return 'Indeterminado';
    }
  }

}
