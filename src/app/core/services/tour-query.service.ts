import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroments';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ITour } from '../models/tour.interface';

@Injectable({
  providedIn: 'root',
})
export class TourQueryService {
  private readonly apiUrl = `${environment.API_BASE_URL}/tourDB.json`;
  private loadTours$ = new BehaviorSubject<boolean>(false);

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
}
