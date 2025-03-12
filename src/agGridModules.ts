import {
  Module,
  AllEnterpriseModule,
  ValidationModule,
} from 'ag-grid-enterprise';
import { AgChartsEnterpriseModule } from 'ag-charts-enterprise';

export const RECOMMENDED_MODULES: Module[] = [
  AllEnterpriseModule.with(AgChartsEnterpriseModule),
  ValidationModule,
];
