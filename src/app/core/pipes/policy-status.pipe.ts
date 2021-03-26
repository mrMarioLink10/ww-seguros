import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'policyStatus'
})
export class PolicyStatusPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    switch (value) {
      case '0':
        return 'Revisar';

      case '1':
        return 'En revisión';

      case '2':
        return 'Aceptada';

      case 0:
        return 'Revisar';

      case 1:
        return 'En revisión';

      case 2:
        return 'Aceptada';


      default:
        return 'Indeterminado';
    }

  }
}
