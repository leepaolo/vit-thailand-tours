import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../../enviroments/enviroments';
import { ITour } from '../models/tour.interface';

@Injectable({
  providedIn: 'root',
})
export class TourQueryService {
  private readonly apiUrl = `${environment.API_BASE_URL}/tour-bd`;
  private loadTours$ = new BehaviorSubject<boolean>(false);
  private tourCreated$ = new BehaviorSubject<boolean>(false); // New BehaviorSubject to track tour creation

  constructor(private http: HttpClient) {}

  getTours(): Observable<ITour[]> {
    this.loadTours$.next(true);
    return this.http.get<ITour[]>(this.apiUrl).pipe(
      map((res) => {
        this.loadTours$.next(false);
        return res;
      })
    );
  }

  isLoaded(): Observable<boolean> {
    return this.loadTours$.asObservable();
  }

  // Observable to track whether a tour has been created
  isTourCreatedObservable(): Observable<boolean> {
    return this.tourCreated$.asObservable();
  }

  // Mark the tour as created
  addTour(tour: ITour): Observable<ITour> {
    return this.http.post<ITour>(this.apiUrl, tour).pipe(
      map((createdTour) => {
        this.tourCreated$.next(true); // Update the observable when the tour is successfully created
        return createdTour;
      })
    );
  }
}
