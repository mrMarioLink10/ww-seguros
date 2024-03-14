import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { RefundService } from '../new-claim/claim-types/refund/services/refund.service';
import { ActivatedRoute } from '@angular/router';
import { DiagnosticsFileUploadDialogComponent } from '../diagnostics-file-upload-dialog/diagnostics-file-upload-dialog.component';
import { RefundDiagnostic } from '../models/RefundDiagnostic';

export interface RefundComment {
  id: number;
  refundId: number;
  diagnosticId: number;
  comment: string;
  status: string;
  user: string;
  date: Date;
}

@Component({
  selector: 'app-refund-comments',
  templateUrl: './refund-comments.component.html',
  styleUrls: ['./refund-comments.component.scss']
})
export class RefundCommentsComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['id', 'user', 'comment', 'date'];
  comments: RefundComment[] = [];
  refundId: number;
  diagnostic: RefundDiagnostic;
  diagnosticId: number;

  dataSource;
  loading = false;
  diasableFileUpload = true;

  constructor(private refundService: RefundService, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {
    this.refundId = this.route.snapshot.params.refundId;
    this.diagnosticId = this.route.snapshot.params.diagnosticId;

    if(this.refundId && this.diagnosticId){
      this.loadDiagnostic();
      this.loadComments();
    }
  }
  
  loadDiagnostic() {
    this.loading = true;
    this.refundService.returnData(this.refundId).subscribe(res => {
      
      res.data.diagnosticos.forEach(d => {
        if(d.id == this.diagnosticId){
          this.diagnostic = {
            id: d.id,
            category: d.categoria,
            description: d.descripcion,
            diagnostic: d.diagnostico,
            place: d.lugar,
            date: d.fecha,
            files: d.files,
            amount: d.monto,
            provider: d.proveedor,
            claimCurrencyType: d.tipoReclamoMoneda,
            status: d.idEstadoReembolso
          };
        }
      });

      console.log('diagnostic', this.diagnostic)
      this.checkIfCanUploadFiles();
      this.loading = false;
    }, (error) => {
      console.log('error', error);
      this.loading = false;
    });
  }

  loadComments() {
    this.loading = true;

    this.refundService.getComments(this.refundId, this.diagnosticId).subscribe(res => {

    res.data.forEach(element => {
      this.comments.push({
        id: element.id, 
        refundId: element.idReembolso,
        diagnosticId: element.idDiagnosticoReembolso,
        comment: element.comentario || 'N/A',
        date: element.fechaOcurrencia,
        user: element.usuario,
        status: element.estado
        });
    });
      this.initializeTable();
      this.loading = false;
    }, (err: any) => {
      this.loading = false;
    });
  }

  initializeTable() {
    this.dataSource = new MatTableDataSource(this.comments);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  checkIfCanUploadFiles(){
    let status = [3,7];
    this.diasableFileUpload = this.diagnostic && !status.includes(this.diagnostic.status); 
  }

  openDiagnosticModal(){
    this.dialog.open(DiagnosticsFileUploadDialogComponent, {
      data: {diagnosticId: this.diagnosticId, refundId: this.refundId},
      minWidth: 500, 
      maxWidth: 1200
    });
  }

}
