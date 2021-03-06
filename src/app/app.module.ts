import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AdaptableAngularAgGridModule } from '@adaptabletools/adaptable-angular-aggrid';

import { AgGridModule } from '@ag-grid-community/angular';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ButtonToggleComponent } from './custom-toolbars/button-toggle.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { SlideToggleComponent } from './custom-toolbars/slide-toggle.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialMenuComponent } from './custom-toolbars/material-menu.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    FormsModule,
    AdaptableAngularAgGridModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    MatButtonToggleModule,
    MatMenuModule,
  ],
  declarations: [
    AppComponent,
    ButtonToggleComponent,
    SlideToggleComponent,
    MaterialMenuComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
