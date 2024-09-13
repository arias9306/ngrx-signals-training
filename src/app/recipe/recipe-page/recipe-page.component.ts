import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RecipeListComponent } from '../recipe-list/recipe-list.component';

@Component({
  selector: 'app-recipe-page',
  standalone: true,
  imports: [RecipeListComponent, MatToolbarModule],
  templateUrl: './recipe-page.component.html',
  styleUrl: './recipe-page.component.css',
})
export class RecipePageComponent {}
