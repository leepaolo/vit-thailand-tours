import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TourListComponent } from '../tour/tour-list/tour-list.component';
import { TourDetailsComponent } from '../tour/tour-details/tour-details.component';

@Component({
  selector: 'app-page-layout',
  standalone: true,
  imports: [CommonModule, TourListComponent, TourDetailsComponent],
  templateUrl: './page-layout.component.html',
  styleUrl: './page-layout.component.css',
})
export class PageLayoutComponent {
  pageTitle: string = 'Tour available on 2024';
}
