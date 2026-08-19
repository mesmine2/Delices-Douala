import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  imports: [],
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.css'
})
export class StarRating {
  // NOTE ACTUELLE
  rating = input(0);
  // EVENEMENT
  ratingChanged = output<number>();

  // NOTE TEMPORAIRE AU SURVOL
  hoveredRating = 0;

  // CLIC SUR UNE ETOILE
  onStarClick(star: number): void {
    this.ratingChanged.emit(star);
  }

  // SURVOL
  onStarEnter(star: number): void {
    this.hoveredRating = star;
  }

  // FIN DU SURVOL
  onStarLeave(): void {
    this.hoveredRating = 0;
  }
}