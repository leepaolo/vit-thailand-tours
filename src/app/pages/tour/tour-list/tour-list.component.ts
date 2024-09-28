import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TourQueryService } from '../../../core/services/tour-query.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ITour } from '../../../core/models/tour.interface';

@Component({
  selector: 'app-tour-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tour-list.component.html',
  styleUrl: './tour-list.component.css',
})
export class TourListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subscription();

  private tourSubject = new BehaviorSubject<ITour[]>([]);
  tours$ = this.tourSubject.asObservable();

  constructor(private tourQuery: TourQueryService) {}

  ngOnInit(): void {
    this.fetchTours();
  }

  fetchTours(): void {
    this.destroy$ = this.tourQuery.getTours().subscribe((tours) => {
      this.tourSubject.next(tours); // Update BehaviorSubject with fetched tours
    });
  }

  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.unsubscribe();
    }
  }
}
