import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { AppComponent } from 'src/app/app.component';
import { UserService } from '../../../core/services/user/user.service';
import { FormsService } from '../services/forms/forms.service';
import { FormHandlerService } from '../../../core/services/forms/form-handler.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

  newRequestButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Nuevo Formulario',
    buttonColor: 'accent',
    barColor: 'primary',
    raised: true,
    stroked: false,
    mode: 'indeterminate',
    value: 0,
    disabled: false,
    fullWidth: true,
    customClass: 'dashboard-button'
  };

  displayedColumns: string[] = ['formName', 'formDescription', 'createBy', 'creationDate', 'updateDate', 'status', 'acciones'];

  loading = false;
  dataSource;
  forms: any;
  role: any;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private router: Router,
    private userService: UserService,
    private appComponent: AppComponent,
    private formsService: FormsService,
    private formHandlerService: FormHandlerService
  ) { }

  ngOnInit() {
    this.role = this.userService.getRoleCotizador();
    this.getForms();
  }

  newForm() {
    this.newRequestButtonOptions.active = true;
    this.router.navigateByUrl('/dashboard/forms/new-form');
  }

  getForms(params: HttpParams = new HttpParams()) {
    let data;

    if (this.userService.getRoles().includes('WWS') && this.userService.getRoles().includes('WMA')) {
      params = params.append('country', localStorage.getItem('countryCode'));
    }

    this.loading = true;

    setTimeout(() => {
      this.appComponent.showOverlay = true;
    });
    this.formsService.getData(params)
      .subscribe(res => {
        setTimeout(() => {
          this.appComponent.showOverlay = false;
        });

        data = res;
        this.forms = data.data;
        this.dataSource = new MatTableDataSource(this.forms);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.loading = false;

      }, err => console.log(err));
  }

  deleteTarget(id: number) {
    this.formHandlerService.deleteRequest(id, 'DynamicForm', 'Formulario', this.appComponent)
      .subscribe(res => {
        console.log(res);
        if (res === true) { this.getForms(); }
      });
  }

  editTarget(id) {
    this.router.navigateByUrl(`/dashboard/forms/new-form/${id}`);
  }

}
