import { Component, OnInit, ViewChild } from '@angular/core';
import { RefundService } from '../new-claim/claim-types/refund/services/refund.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DiagnosticsFileUploadDialogComponent } from '../diagnostics-file-upload-dialog/diagnostics-file-upload-dialog.component';

export interface refundDiagnostic {
  id: number;
  category: string;
  description: string;
  diagnostic: string;
  place: string;
  date: Date;
  files: any;
  amount: number;
  provider: string;
  claimCurrencyType: string;
  status: number;
}


@Component({
  selector: 'app-diagnostics-table',
  templateUrl: './diagnostics-table.component.html',
  styleUrls: ['./diagnostics-table.component.scss']
})
export class DiagnosticsTableComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  diagnostics: refundDiagnostic[] = [];
  refundId: number;

  displayedColumns: string[] = ['id', 'category', 'description', 'diagnostic', 'date', 'amount', 'provider', 'status', 'actions'];
  dataSource;
  loading = false;

  constructor(private refundService: RefundService, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {
    this.refundId = this.route.snapshot.params.refundId;

    if(this.refundId){
      this.loadDiagnostics();
    }
  }

  openModal(diagnosticId:number){
    this.dialog.open(DiagnosticsFileUploadDialogComponent, {
      data: {diagnosticId},
      minWidth: 500, 
      maxWidth: 1200
    });
  }

  loadDiagnostics() {
    this.loading = true;
    this.refundService.returnData(this.refundId).subscribe(res => {
      
      res.data.diagnosticos.forEach(d => {
        this.diagnostics.push({
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
          status: 0
        });
      });

      this.initializeTable();
      this.loading = false;
    }, (error) => {
      console.log('error', error);
      this.loading = false;
    });
  }

  initializeTable() {
    this.dataSource = new MatTableDataSource(this.diagnostics);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
