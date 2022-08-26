import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesService } from './countries/countries.service';
import { DialogOptionService } from './dialog/dialog-option.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [CountriesService, DialogOptionService ]
})
export class ServicesModule { }
