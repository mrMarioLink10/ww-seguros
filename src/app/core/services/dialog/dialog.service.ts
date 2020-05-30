import { Injectable } from '@angular/core';
import { BaseDialogComponent } from 'src/app/shared/components/base-dialog/base-dialog.component';
import { MatDialog } from '@angular/material';
import { map, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DialogService {

  constructor(
    private dialog: MatDialog,
  ) { }
}
