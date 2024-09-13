import { Component, inject } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    ReactiveFormsModule,
  ],
})
export class RecipeFormComponent {
  private fb = inject(FormBuilder);
  recipeForm = this.fb.group({
    name: [null, Validators.required],
    description: [null, Validators.required],
    isFavorite: [false],
  });

  onSubmit(): void {
    console.log(this.recipeForm.value);
  }
}
