import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { RefundService } from '../new-claim/claim-types/refund/services/refund.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DiagnosticFiles } from '../new-claim/claim-types/models/DiagnosticFiles';
import { BaseDialogComponent } from 'src/app/shared/components/base-dialog/base-dialog.component';
import { BaseDialog } from 'src/app/shared/components/base-dialog/models/base-dialog';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diagnostics-file-upload-dialog',
  templateUrl: './diagnostics-file-upload-dialog.component.html',
  styleUrls: ['./diagnostics-file-upload-dialog.component.scss']
})
export class DiagnosticsFileUploadDialogComponent implements OnInit {

	filesForm: FormGroup;
  diagnosticId: number;
  refundId: number;
  loading: boolean = false;

  fileTypeList: any[] = [
    {
      value: 'indications',
      viewValue:'Indicaciones médicas'
    },
    {
      value: 'invoices',
      viewValue:'Facturas Pendientes'
    },
    {
      value: 'medicReports',
      viewValue:'Informe médico'
    },
    {
      value: 'paymentVouchers',
      viewValue:'Comprobante de pagos'
    },
    {
      value: 'otros',
      viewValue:'Otro'
    },
  ];

  constructor(
		private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private refundService: RefundService,
    private dialog: MatDialog,
    private router: Router,
    public dialogRef: MatDialogRef<DiagnosticsFileUploadDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.dialogRef.disableClose = true;
    this.diagnosticId = this.data.diagnosticId;
    this.refundId = this.data.refundId;
    this.buildForm();
  }

  buildForm(){
    this.filesForm = this.fb.group({
      diagnosticId: this.fb.control(this.diagnosticId,[Validators.required]),
      invoices: this.fb.array([this.createFormArray('invoices')]),
      indications: this.fb.array([this.createFormArray('indications')]),
      medicReports: this.fb.array([this.createFormArray('medicReports')]),
      paymentVouchers: this.fb.array([this.createFormArray('paymentVouchers')]),
      otros: this.fb.array([this.createFormArray('otros')]),
      comment: this.fb.control('',[Validators.required])
    });
  }

  createFormArray(type: string): any {
		switch (type) {
			case 'invoices':
				return this.fb.group({
					invoices: [''],
				});

			case 'indications':
				return this.fb.group({
					indications: [''],
				});

			case 'medicReports':
				return this.fb.group({
					medicReports: [''],
				});

			case 'paymentVouchers':
				return this.fb.group({
					paymentVouchers: [''],
				});

			case 'otros':
				return this.fb.group({
					otros: [''],
				});

			default:
				break;
		}
	}

  addToList(list: any, type: string) {
		console.log('list: ', list);
		console.log('ADD LIST');
		list.push(this.createFormArray(type));
	}

	removeToList(index, list: any) {
		list.removeAt(index);
	}

	returnAsFormArray(formArray: any) {
		return formArray as FormArray;
	}

  onFileChange(event, formName, idx) {
		const reader = new FileReader();

		if (event.target.files && event.target.files.length) {
			const [file] = event.target.files;
			reader.readAsDataURL(file);

			reader.onload = () => {
				this.filesForm.get(formName).get(idx.toString()).patchValue({
					[formName]: reader.result
				});

				// need to run CD since file load runs outside of zone
				this.cd.markForCheck();
			};
		}
	}

  uploadFile(){
    let rawFormValue = this.filesForm.getRawValue();

    let diagnosticFiles: DiagnosticFiles = {
      diagnosticId: this.diagnosticId,
      comment: rawFormValue.comment.toLowerCase(),
      files: {
        invoices: rawFormValue.invoices.filter(x => x.invoices.length > 0).map(x => {return {invoices: x.invoices}}),
        indications: rawFormValue.indications.filter(x => x.indications.length > 0).map((x) => {return {indications: x.indications}}),
        medicReports: rawFormValue.medicReports.filter(x => x.medicReports.length > 0).map(x =>{return {medicReports: x.medicReports}}),
        paymentVouchers: rawFormValue.paymentVouchers.filter(x => x.paymentVouchers.length > 0).map(x =>{return {paymentVouchers: x.paymentVouchers}}),
        otros: rawFormValue.otros.filter(x => x.otros.length > 0).map(x => {return {otros: x.otros  }})
      }
    };

    
    this.loading = true;
    this.refundService.uploadDiagnositcFiles(this.refundId, diagnosticFiles).subscribe((res: any) => {
      if(res.error == true){
        this.errorHandler();
      }

      //cerrar modal
      this.dialogRef.close();

      //redirigir a pagina de diagnosticos
      this.correctSend();
    }, (error) => {
      this.errorHandler();
    });
  }

  errorHandler(){
    this.loading = false;
    this.dialogRef.close();
    this.badSend();
  }

  badSend() {
    let errorServer: BaseDialog = {
      logo: 'error',
      title: 'Ha ocurrido error',
      text: 'Ha ocurrido un error al intentar subir los archivos.',
      showButtons: false
    };

    const dialogRef = this.dialog.open(BaseDialogComponent, {
      data: errorServer,
      minWidth: 385
    });
    dialogRef.disableClose = true;
    this.closeDialog(dialogRef, false);
  }

  correctSend() {
    let correctDialog: BaseDialog = {
      logo: 'check',
      title: 'Confirmación',
      text: 'Los archivos se subieron correctamente.',
      showButtons: false
    };

    const dialogRef = this.dialog.open(BaseDialogComponent, {
      data: correctDialog,
      minWidth: 385
    });
    dialogRef.disableClose = true;
    this.closeDialog(dialogRef, true);
  }

  closeDialog(dialog, redirect:boolean) {
    setTimeout(() => {
      dialog.close();
      this.router.navigate(['/dashboard/claims/refund/',this.refundId,'diagnostics']);
    }, 5000);
  }

}
