import { Component } from '@angular/core';


@Component({
  selector: 'app-material-menu',
  template: `
    <button
      mat-button
      [matMenuTriggerFor]="menu"
      [disabled]="isDisabled()"
      class="ab-SimpleButton ab-SimpleButton--font-weight=normal ab-SimpleButton--variant-raised ab-SimpleButton--tone-accent"
    >
      Layout Menu Shortcut
    </button>
    <mat-menu #menu="matMenu">
      <button
        *ngFor="let item of menuItems"
        mat-menu-item
        (click)="onClick(item)"
      >
        {{ item }}
      </button>
    </mat-menu>
  `,
  styles: [
    `
      button[mat-button]:disabled {
        background: initial;
        color: darkgray;
      }
    `,
  ],
})
export class MaterialMenuComponent {
  menuItems: string[] = [];

  constructor() {}

  protected onClick(item: string) {
    this.onItemClick(item);
  }

  onItemClick(item: string) {
    // overwritten in configuration
  }

  isDisabled() {
    // may be overwritten in configuration
    return false;
  }
}
