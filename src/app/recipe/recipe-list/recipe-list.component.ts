import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Recipe } from '../model/recipe.model';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent {
  recipes: Recipe[] = [];
}
