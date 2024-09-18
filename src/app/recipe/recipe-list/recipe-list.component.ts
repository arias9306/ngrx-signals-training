import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RecipeCrud } from '../recipe.store';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
  providers: [RecipeCrud],
})
export class RecipeListComponent {
  private readonly recipeStore = inject(RecipeCrud);
  recipes = this.recipeStore.items;
}
