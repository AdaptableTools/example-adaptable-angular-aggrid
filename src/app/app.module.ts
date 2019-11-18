import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

// import AB from '@adaptabletools/adaptableblotter-angular-aggrid/adaptableblotter/agGrid'
import { AdaptableBlotterAngularAgGridModule } from '@adaptabletools/adaptableblotter-angular-aggrid/fesm5/adaptabletools-adaptableblotter-angular-aggrid';

import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,

    HttpClientModule,
    AdaptableBlotterAngularAgGridModule,
    AgGridModule.withComponents([])
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
