import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AdaptableAngularAgGridModule } from '@adaptabletools/adaptable-angular-aggrid';

import { AgGridModule } from '@ag-grid-community/angular';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AdaptableAngularAgGridModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
  ],
  declarations: [AppComponent, ToolbarComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
