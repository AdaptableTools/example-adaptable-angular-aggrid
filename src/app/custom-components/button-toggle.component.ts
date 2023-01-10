import { Component, Inject } from '@angular/core';
import {
  ADAPTABLE_API,
  AdaptableApi,
  Layout,
} from '@adaptabletools/adaptable-angular-aggrid';

@Component({
  selector: 'app-button-toggle',
  template: `
    <mat-button-toggle-group
      [value]="currentLayout?.Name"
      (change)="onToggleChange($event)"
    >
      <mat-button-toggle *ngFor="let layout of allLayouts" [value]="layout.Name"
        >{{ layout.Name }} ({{ layout.Columns.length }})</mat-button-toggle
      >
    </mat-button-toggle-group>
  `,
  styles: [
    `
      .mat-button-toggle.mat-button-toggle-checked {
        background: var(--ab-color-secondary);
        color: var(--ab-color-text-on-secondary);
      }
    `,
  ],
})
export class ButtonToggleComponent {
  constructor(@Inject(ADAPTABLE_API) private adaptableApi: AdaptableApi) {}

  get currentLayout(): Layout {
    return this.adaptableApi.layoutApi.getCurrentLayout();
  }

  get allLayouts(): Layout[] {
    return this.adaptableApi.layoutApi.getLayouts();
  }

  onToggleChange({ value }: { value: string }) {
    if (value) {
      this.adaptableApi.layoutApi.setLayout(value);
    }
  }
}
