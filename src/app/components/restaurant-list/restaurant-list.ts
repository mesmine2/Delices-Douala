import { Component, input, output } from '@angular/core';

import { Restaurant } from '../../models/restaurant';

import { RestaurantCard}
  from '../restaurant-card/restaurant-card';

@Component({
  selector: 'app-restaurant-list',

  imports: [RestaurantCard],

  templateUrl: './restaurant-list.html',
  styleUrl: './restaurant-list.css'
})
export class RestaurantList {
  // INPUT
  restaurants = input.required<Restaurant[]>();
  // OUTPUT
  restaurantRated = output<{
    id: number;
    rating: number;
  }>();
  // RECEPTION DE L'EVENEMENT
  onRestaurantRated(data: {
    id: number;
    rating: number;
  }): void {

    this.restaurantRated.emit(data);

  }

}