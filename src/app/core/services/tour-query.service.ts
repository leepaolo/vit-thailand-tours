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
  private tourCreated$ = new BehaviorSubject<boolean>(false); // To track tour creation
  private tourUpdated$ = new BehaviorSubject<boolean>(false); // To track tour updates
  private tourDeleted$ = new BehaviorSubject<boolean>(false); // New BehaviorSubject to track tour creation

  constructor(private http: HttpClient) {}

  // Observable to track whether tours
  isLoaded(): Observable<boolean> {
    return this.loadTours$.asObservable();
  }

  // Observable to track whether a tour has been created
  isTourCreatedObservable(): Observable<boolean> {
    return this.tourCreated$.asObservable();
  }

  // Observable to track whether a tour has been updated
  isTourUpdatedObservable(): Observable<boolean> {
    return this.tourUpdated$.asObservable();
  }

  // Observable to track whether a tour has been deleted
  isTourDeletedObservable(): Observable<boolean> {
    return this.tourDeleted$.asObservable();
  }

  // Get all tours
  getTours(): Observable<ITour[]> {
    this.loadTours$.next(true);
    return this.http.get<ITour[]>(this.apiUrl).pipe(
      map((res) => {
        this.loadTours$.next(false);
        return res;
      })
    );
  }

  // Get a tour by ID
  // getTourById(id: string): Observable<ITour> {
  //   return this.http.get<ITour>(`${this.apiUrl}/${id}`).pipe(
  //     map((tour) => tour) // Directly return the tour object
  //   );
  // }

  // Add a new tour
  addTour(tour: ITour): Observable<ITour> {
    return this.http.post<ITour>(this.apiUrl, tour).pipe(
      map((createdTour) => {
        this.tourCreated$.next(true); // Update the observable when the tour is successfully created
        return createdTour;
      })
    );
  }

  //  Update a tour
  updateTour(tour: ITour): Observable<ITour> {
    return this.http.put<ITour>(`${this.apiUrl}/${tour.id}`, tour).pipe(
      map((updatedTour) => {
        this.tourCreated$.next(true);
        return updatedTour;
      })
    );
  }

  // Delete a tour
  deleteTour(tour: ITour): Observable<ITour> {
    return this.http.delete<ITour>(`${this.apiUrl}/${tour.id}`).pipe(
      map((deletedTour) => {
        this.tourCreated$.next(true);
        return deletedTour;
      })
    );
  }
}
