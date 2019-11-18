import { NgModule } from '@angular/core';
import { BlotterAngularAggridComponent } from './blotter-angular-aggrid.component';
import { AgGridOverrideComponent } from './aggrid-angular-override.component';

export { BlotterAngularAggridComponent } from './blotter-angular-aggrid.component';

@NgModule({
  declarations: [AgGridOverrideComponent, BlotterAngularAggridComponent],
  imports: [],
  exports: [BlotterAngularAggridComponent],
  providers: []
})
export class AdaptableBlotterAngularAgGridModule {}
