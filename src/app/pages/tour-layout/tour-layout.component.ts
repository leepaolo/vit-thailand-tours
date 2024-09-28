import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TourListComponent } from '../tour-list/tour-list.component';
import { TourDetailsComponent } from '../tour-details/tour-details.component';

@Component({
  selector: 'app-tour-layout',
  standalone: true,
  imports: [CommonModule, TourListComponent, TourDetailsComponent],
  templateUrl: './tour-layout.component.html',
  styleUrl: './tour-layout.component.css',
})
export class TourLayoutComponent {
  pageTitle: string = 'Tour available on 2024';
}
