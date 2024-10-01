import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TourQueryService } from '../../../core/services/tour-query.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ITour } from '../../../core/models/tour.interface';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tour-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tour-list.component.html',
  styleUrl: './tour-list.component.css',
})
export class TourListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subscription();

  private tourSubject = new BehaviorSubject<ITour[]>([]);
  tours$ = this.tourSubject.asObservable();

  constructor(private tourQuery: TourQueryService, private router: Router) {}

  ngOnInit(): void {
    this.fetchTours();
  }

  // onManageTour(tour: ITour): void {
  //   if (tour) {
  //     this.router.navigate(['/create-tour', tour.id]);
  //   }
  // }

  fetchTours(): void {
    this.destroy$ = this.tourQuery.getTours().subscribe((tours) => {
      this.tourSubject.next(tours);
    });
  }

  createSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }

  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.unsubscribe();
    }
  }
}
