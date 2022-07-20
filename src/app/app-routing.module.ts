import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryComponent } from './components/country/country.component';
import { PersonComponent } from './components/person/person.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';

const routes: Routes = [
  { path: '', redirectTo: 'personas', pathMatch: 'full'},
  {
    path: 'personas', component: PersonComponent
  },
  {
    path: 'paises', component: CountryComponent
  },
  { path: '**', component: EmptyRouteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/vuce-zee-mf/test/' }],
})
export class AppRoutingModule { }
