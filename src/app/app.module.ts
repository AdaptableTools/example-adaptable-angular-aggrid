import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AdaptableAngularAgGridModule } from '@adaptabletools/adaptable-angular-aggrid';

import { AgGridModule } from '@ag-grid-community/angular';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ButtonToggleComponent } from './custom-components/button-toggle.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { SlideToggleComponent } from './custom-components/slide-toggle.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialMenuComponent } from './custom-components/material-menu.component';
import { ThemeSettingsPanelComponent } from './custom-components/theme-settings-panel.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({ declarations: [
        AppComponent,
        ButtonToggleComponent,
        SlideToggleComponent,
        MaterialMenuComponent,
        ThemeSettingsPanelComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        NoopAnimationsModule,
        FormsModule,
        AgGridModule,
        AdaptableAngularAgGridModule,
        MatButtonToggleModule,
        MatMenuModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
