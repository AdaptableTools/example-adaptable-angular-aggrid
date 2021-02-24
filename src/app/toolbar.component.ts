import { AdaptableApi } from '@adaptabletools/adaptable-angular-aggrid';
import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ADAPTABLE_API } from './app.tokens';

@Component({
  selector: 'app-custom-toolbar',
  template: `
    <button
      class="ab-SimpleButton ab-SimpleButton--variant-raised ab-SimpleButton--tone-neutral"
      (click)="showActive()"
    >
      Show {{ this.filterValue }} Trades
    </button>
  `,
})
export class ToolbarComponent implements OnInit, OnDestroy {
  // no @Input(), we pass the values through the ComponentRef.instance
  filterValue: 'Pending' | 'Rejected';
  @Output() filterChange = new EventEmitter<'Pending' | 'Rejected'>();

  constructor(@Inject(ADAPTABLE_API) private api: AdaptableApi) {
    console.log('Toolbar instantiated ', this);
  }

  ngOnInit(): void {
    // cleat filter, if automatically set from global state
    this.api.filterApi.clearColumnFilterByColumn('status');
  }

  showActive() {
    this.api.filterApi.setColumnFilter([
      {
        ColumnId: 'status',
        Predicate: { PredicateId: 'Is', Inputs: [this.filterValue] },
      },
    ]);

    this.filterChange.emit(this.filterValue);
  }

  ngOnDestroy(): void {
    this.api.filterApi.clearColumnFilterByColumn('status');
  }
}
