import { Routes, RouterModule } from '@angular/router';
import { SearchesComponent } from './searches/searches.component';
import { SearchDetailsComponent } from './search-details/search-details.component';


const routes: Routes = [
  {
    path: 'searches',
    component: SearchesComponent
  },
  {
    path: 'search/:name',
    component: SearchDetailsComponent
  },
  {
    path: '',
    redirectTo: '/searches',
    pathMatch: 'full'
  }

];

export const routing = RouterModule.forRoot(routes);
