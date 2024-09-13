import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RecipeFormComponent } from '../recipe-form/recipe-form.component';
import { RecipeListComponent } from '../recipe-list/recipe-list.component';

@Component({
  selector: 'app-recipe-page',
  standalone: true,
  imports: [
    RecipeListComponent,
    MatToolbarModule,
    RecipeFormComponent,
    MatSidenavModule,
    MatButtonModule,
  ],
  templateUrl: './recipe-page.component.html',
  styleUrl: './recipe-page.component.css',
})
export class RecipePageComponent {
  opened: boolean = false;
}
