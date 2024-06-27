import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { Subscription, catchError, map, single, throwError } from 'rxjs';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit{
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal<boolean>(false);
  error = signal("");
  private placesService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);
  /* constructor(private httpClient: HttpClient) {} */
  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.placesService.loadAvailablePlaces()
    .subscribe({
      next: (places) => {
        this.places.set(places);
      },
      error: (error: Error) => {
        /* console.log(error) */
        this.error.set(error.message);
        /* this.error.set("Something went wrong");  */
      },
      complete: () => {
        this.isFetching.set(false);
      }
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }
  onSelectPlace(selectedPlace: Place) {
    const subscription = this.placesService.addPlaceToUserPlaces(selectedPlace)
    .subscribe({
      next: (resData) => console.log(resData),
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }
  /* ngOnInit() {
    const subscription = this.httpClient.get<{places: Place[]}>("http://localhost:3000/places", {
      observe: "response"
    })
    .subscribe({
      next: (response) => {
        console.log(response);
        console.log(response.body?.places);
      }
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  } */
}