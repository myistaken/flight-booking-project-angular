import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CONSTANTS } from '../constants/constants';
import { IFlight } from '../models/Flight';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  apiBaseAddress: string = environment.ApiBaseAddress;

  constructor(private http: HttpClient) {}

  private parseDate(dateString: string): Date {
    return new Date(dateString);
  }

  private filterFlightsByDates(
    flights: IFlight[],
    departureDate?: string,
    returnDate?: string
  ): IFlight[] {
    if (!departureDate && !returnDate) {
      return flights;
    }

    return flights.filter((flight) => {
      const departureMatch =
        !departureDate ||
        this.parseDate(flight.departureDate).toDateString() ===
          this.parseDate(departureDate).toDateString();

      const returnMatch =
        !returnDate ||
        this.parseDate(flight.returnDate).toDateString() ===
          this.parseDate(returnDate).toDateString();

      return departureMatch && returnMatch;
    });
  }

  searchFlights(
    departureAirport?: string,
    arrivalAirport?: string,
    departureDate?: string,
    returnDate?: string
  ): Observable<IFlight[]> {
    let params = new HttpParams();

    if (departureAirport) {
      params = params.set('departureAirport', departureAirport);
    }

    if (arrivalAirport) {
      params = params.set('arrivalAirport', arrivalAirport);
    }
    return this.http
      .get<IFlight[]>(this.apiBaseAddress + CONSTANTS.ENDPOINTS.GET_FLIGHTS, {
        params,
      })
      .pipe(
        map((flights: IFlight[]) =>
          this.filterFlightsByDates(flights, departureDate, returnDate)
        )
      );
  }
}
