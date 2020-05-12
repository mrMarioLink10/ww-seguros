import { Injectable } from '@angular/core';
import { BaseDialogComponent } from 'src/app/shared/components/base-dialog/base-dialog.component';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})

export class DialogService {

  constructor(
    private dialog: MatDialog,
  ) { }
  canDeactive() {
    let Dialog;

    Dialog = this.dialog.open(BaseDialogComponent, {
      data: {
        logo: 'warning',
        title: 'Tiene trabajo sin guardar',
        text: `¿Está seguro de que quiere salir?`,
        showButtons: true,
        showCancelButton: true,
        textPrincipalButton: 'Salir',
        textCancelButton: 'Permanecer'
      },
      minWidth: 385,
    });

    // Dialog.afterClosed().subscribe(result => {
    //   if (result) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // });


    return Dialog.afterClosed();
  }
}
