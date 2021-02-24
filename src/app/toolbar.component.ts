import { AdaptableApi } from '@adaptabletools/adaptable-angular-aggrid';
import { Component } from '@angular/core';

@Component({
  selector: 'custom-toolbar',
  template: `
    <button
      class="ab-SimpleButton ab-SimpleButton--variant-raised ab-SimpleButton--tone-neutral"
      (click)="showActive()"
    >
      Show Active Trades
    </button>
  `,
})
export class ToolbarComponent {
  count: number;
  api: AdaptableApi;
  public setCount(count: number) {
    this.count = count;
  }

  public setAdaptableApi(api: AdaptableApi) {
    this.api = api;
  }

  showActive() {
    this.api.filterApi.setColumnFilter([
      {
        ColumnId: 'status',
        Predicate: { PredicateId: 'Is', Inputs: ['Pending'] },
      },
    ]);
  }
}
