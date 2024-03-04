import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { RefundService } from '../new-claim/claim-types/refund/services/refund.service';
import { ActivatedRoute } from '@angular/router';
import { DiagnosticsFileUploadDialogComponent } from '../diagnostics-file-upload-dialog/diagnostics-file-upload-dialog.component';

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
  diagnosticId: number;

  dataSource;
  loading = false;

  constructor(private refundService: RefundService, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {
    this.refundId = this.route.snapshot.params.refundId;
    this.diagnosticId = this.route.snapshot.params.diagnosticId;

    if(this.refundId && this.diagnosticId){
      this.loadData();
    }
  }

  loadData() {
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

  openDiagnosticModal(){
    this.dialog.open(DiagnosticsFileUploadDialogComponent, {
      data: {diagnosticId: this.diagnosticId},
      minWidth: 500, 
      maxWidth: 1200
    });
  }

}
