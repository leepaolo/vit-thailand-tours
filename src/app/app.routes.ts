import { Routes } from '@angular/router';
import { TourListComponent } from './pages/tour/tour-list/tour-list.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomePageComponent } from './shared/components/home-page/home-page.component';
import { TourDetailsComponent } from './pages/tour/tour-details/tour-details.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'all-tours',
    component: TourListComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: ':tourTitle',
    component: TourDetailsComponent,
  },
  {
    path: '',
    redirectTo: '/all-tours',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/all-tours',
  },
];
