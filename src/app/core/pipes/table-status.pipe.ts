import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableStatus'
})
export class TableStatusPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    switch (value) {
      case '0':
        return 'Activo';

      case '1':
        return 'Cancelado';

      case '2':
        return 'Enviado';

      default:
        return 'Indeterminado';
    }
  }

}
