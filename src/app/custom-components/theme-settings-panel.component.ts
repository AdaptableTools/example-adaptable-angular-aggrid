import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import {
  ADAPTABLE_API,
  AdaptableApi,
} from '@adaptabletools/adaptable-angular-aggrid';
import { SlideToggleComponent } from './slide-toggle.component';

@Component({
  selector: 'theme-settings-panel',
  template: `
    <h3>
      Custom Theme Settings Panel
    </h3>
    <p>Current Theme: {{ currentTheme }}</p>
    <app-slide-toggle></app-slide-toggle>
  `,
  styles: [],
})
export class ThemeSettingsPanelComponent implements AfterViewInit {
  @ViewChild(SlideToggleComponent) childSlideComponent: SlideToggleComponent;

  constructor(@Inject(ADAPTABLE_API) private adaptableApi: AdaptableApi) {}

  ngAfterViewInit() {
    this.childSlideComponent.onText = 'Dark';
    this.childSlideComponent.offText = 'Light';

    this.childSlideComponent.onChange = (toggleValue: boolean) => {
      if (toggleValue) {
        this.adaptableApi.themeApi.loadDarkTheme();
      } else {
        this.adaptableApi.themeApi.loadLightTheme();
      }
    };
  }

  get currentTheme() {
    return this.adaptableApi.themeApi.getCurrentTheme();
  }
}
