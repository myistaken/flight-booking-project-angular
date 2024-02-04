import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAirport } from '../models/Airport';
import { CONSTANTS } from '../constants/constants';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AirportsService {
  apiBaseAddress: string = environment.ApiBaseAddress;
  constructor(private http: HttpClient) {}
  getAllAirports(): Observable<IAirport[]> {
    return this.http.get<IAirport[]>(
      this.apiBaseAddress + CONSTANTS.ENDPOINTS.GET_ALL_AIRPORTS
    );
  }
}
