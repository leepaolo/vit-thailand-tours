import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TourQueryService } from '../../../core/services/tour-query.service';
import { ITour } from '../../../core/models/tour.interface';
import { map, Observable, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-tour-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tour-details.component.html',
  styleUrl: './tour-details.component.css',
})
export class TourDetailsComponent implements OnInit {
  tour$!: Observable<ITour | undefined>;
  location: any;

  constructor(
    private route: ActivatedRoute,
    private tourQuery: TourQueryService
  ) {}

  ngOnInit(): void {
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

  goBack(): void {
    this.location.back();
  }

  createSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }
}
