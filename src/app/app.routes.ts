import { Routes } from '@angular/router';
import { TourListComponent } from './pages/tour/tour-list/tour-list.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomePageComponent } from './shared/components/home-page/home-page.component';
import { TourDetailsComponent } from './pages/tour/tour-details/tour-details.component';
import { CreateTourComponent } from './pages/tour/create-tour/create-tour.component';

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
    path: 'create-tour',
    component: CreateTourComponent,
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
