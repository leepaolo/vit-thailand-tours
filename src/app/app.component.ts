import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TourLayoutComponent } from './pages/tour-layout/tour-layout.component';
import { NavbarTopComponent } from './shared/components/navbar-top/navbar-top.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    TourLayoutComponent,
    NavbarTopComponent,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
