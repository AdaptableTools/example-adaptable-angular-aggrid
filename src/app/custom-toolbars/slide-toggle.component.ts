import {
  ADAPTABLE_API,
  AdaptableApi,
} from '@adaptabletools/adaptable-angular-aggrid';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-slide-toggle',
  template: `
    <label class="switch">
      <input
        class="switch-input"
        type="checkbox"
        [checked]="active"
        (change)="onToggle()"
      />
      <span
        class="switch-label"
        [attr.data-on]="onText"
        [attr.data-off]="offText"
        [style.background]="
          active ? 'var(--ab-color-secondary)' : 'var(--ab-color-primary)'
        "
      ></span>
      <span class="switch-handle"></span>
    </label>
  `,
  styleUrls: ['./slide-toggle.component.scss'],
})
export class SlideToggleComponent {
  active = false;

  onText = 'ON';
  offText = 'OFF';

  constructor(@Inject(ADAPTABLE_API) private adaptableApi: AdaptableApi) {}

  onToggle() {
    this.active = !this.active;
    this.onChange(this.active);
  }

  onChange(toggleValue: boolean) {
    // overwritten in configuration
  }
}
