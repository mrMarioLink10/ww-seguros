import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilterComponent } from "./components/filter/filter.component";
import { MaterialModule } from "src/app/shared/modules/material.module";
import { FormsContainerComponent } from "./components/forms-container/forms-container.component";
import { CardiovascularComponent } from "./components/disease/cardiovascular/cardiovascular.component";
import { GlobalSharedModule } from "../../../shared/global-shared.module";
import { DiseasesInfoComponent } from './components/disease/shared/diseases-info/diseases-info.component';

@NgModule({
  declarations: [
    FilterComponent,
    FormsContainerComponent,
    CardiovascularComponent,
    DiseasesInfoComponent
  ],
  imports: [CommonModule, MaterialModule, GlobalSharedModule],
  exports: [FilterComponent, FormsContainerComponent, CardiovascularComponent]
})
export class SharedModule {}
