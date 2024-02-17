import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, Sort, MatTableDataSource } from '@angular/material';
import { RefundService } from '../new-claim/claim-types/refund/services/refund.service';
import { ActivatedRoute } from '@angular/router';

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

  dataSource;
  loading = false;

  constructor(private refundService: RefundService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.refundId = this.route.snapshot.params.id;

    if(this.refundId){
      this.loadData();
    }
  }

  loadData() {
    this.loading = true;

    this.refundService.getComments(this.refundId).subscribe(res => {

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

}
