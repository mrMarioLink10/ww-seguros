import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { RefundService } from '../new-claim/claim-types/refund/services/refund.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-diagnostics-file-upload-dialog',
  templateUrl: './diagnostics-file-upload-dialog.component.html',
  styleUrls: ['./diagnostics-file-upload-dialog.component.scss']
})
export class DiagnosticsFileUploadDialogComponent implements OnInit {

	filesForm: FormGroup;
  diagnosticId: number;

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
    public dialogRef: MatDialogRef<DiagnosticsFileUploadDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.dialogRef.disableClose = true;
    this.diagnosticId = this.data.diagnosticId;
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
    console.log('filesForm', this.filesForm.getRawValue());
  }

}
