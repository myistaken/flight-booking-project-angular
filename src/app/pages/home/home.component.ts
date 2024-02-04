import { Component, OnInit } from '@angular/core';
import { IAirport } from '../../models/Airport';
import { AirportsService } from '../../services/airports.service';
import { FlightsService } from '../../services/flights.service';
import { IFlight } from '../../models/Flight';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  airportList: IAirport[] = [];
  filteredDepartureAirports: IAirport[] = [];
  filteredArrivalAirports: IAirport[] = [];
  selectedDepartureAirport: string = '';
  selectedArrivalAirport: string = '';
  selectedDepartureDate: string = '';
  selectedArrivalDate: string = '';
  oneWay: boolean = false;
  loading: boolean = false;
  flightsList: IFlight[] = [];
  departureAirport: string = '';
  arrivalAirport: string = '';
  departureDate: string = '';
  returnDate: string = '';
  sortField: string = '';
  sortDirection: string = 'asc';
  showNoFlightsMessage: boolean = false;

  constructor(
    private airportSrv: AirportsService,
    private flightService: FlightsService
  ) {
    this.loadAirports();
  }

  ngOnInit(): void {}

  loadAirports() {
    this.loading = true;
    this.airportSrv.getAllAirports().subscribe(
      (res: IAirport[]) => {
        this.airportList = res;
        this.filteredDepartureAirports = this.airportList;
        this.filteredArrivalAirports = this.airportList;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        alert('Error occurred' + JSON.stringify(error));
      }
    );
  }

  ngOnChanges() {
    this.filteredDepartureAirports = this.filterAirports(
      this.selectedDepartureAirport
    );
    this.filteredArrivalAirports = this.filterAirports(
      this.selectedArrivalAirport
    );
  }

  filterAirports(query: string) {
    return this.airportList.filter((airport) =>
      airport.airportName.toLowerCase().includes(query.toLowerCase())
    );
  }
  /*validateForm(): boolean {
    if (!this.selectedDepartureAirport || !this.selectedArrivalAirport) {
      alert('Please select both departure and arrival airports.');
      return false;
    }

    if (!this.selectedDepartureDate) {
      alert('Please select a departure date.');
      return false;
    }

    if (!this.oneWay && !this.selectedArrivalDate) {
      alert('Please select a return date.');
      return false;
    }

    return true;
  }*/
  searchFlights() {
    /*if (!this.validateForm()) {
      return;
    }*/
    this.flightService
      .searchFlights(
        this.selectedDepartureAirport,
        this.selectedArrivalAirport,
        this.selectedDepartureDate,
        this.selectedArrivalDate
      )
      .subscribe(
        (flights: IFlight[]) => {
          this.flightsList = flights;
          this.showNoFlightsMessage = this.flightsList.length === 0;
        },
        (error) => {
          console.error('Error searching flights: ', error);
        }
      );
  }
  sortFlights(field: string) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.flightsList = this.sortFlightsList(this.flightsList);
  }

  sortFlightsList(flights: IFlight[]): IFlight[] {
    return flights.sort((a, b) => {
      const fieldA = this.getFieldValue(a, this.sortField);
      const fieldB = this.getFieldValue(b, this.sortField);

      if (fieldA < fieldB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (fieldA > fieldB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  getFieldValue(flight: IFlight, field: string): any {
    switch (field) {
      case 'departureDate':
        return flight.departureDate;
      case 'returnDate':
        return flight.returnDate;
      case 'duration':
        return this.calculateFlightDuration(flight.duration);
      case 'price':
        return flight.price;
      default:
        return null;
    }
  }

  calculateFlightDuration(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}h ${minutes}m`;
  }
}
