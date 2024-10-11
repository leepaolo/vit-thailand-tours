import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TourQueryService } from '../../../core/services/tour-query.service';
import { ITour } from '../../../core/models/tour.interface';
import { map, Observable, switchMap } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-tour-details',
  standalone: true,
  imports: [CommonModule, RouterLink, MatDividerModule],
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.css'], // Note: changed `styleUrl` to `styleUrls`
})
export class TourDetailsComponent implements OnInit {
  tour$!: Observable<ITour | undefined>;

  constructor(
    private route: ActivatedRoute,
    private tourQuery: TourQueryService
  ) {}

  ngOnInit(): void {
    // Load the tour details based on the tourTitle parameter in the URL
    this.tour$ = this.route.params.pipe(
      map((params) => params['tourTitle']),
      switchMap((tourTitle) =>
        this.tourQuery
          .getTours()
          .pipe(
            map((tours) =>
              tours.find(
                (tour) =>
                  this.createSlug(tour.tourTitle) === this.createSlug(tourTitle)
              )
            )
          )
      )
    );
  }

  // Go back to the previous location
  goBack(): void {
    window.history.back(); // Use window.history.back() to navigate back
  }

  // Utility method to check if a value is an array
  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  // Create a slug from the title for matching purposes
  createSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }
}
