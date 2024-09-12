import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from './model/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private readonly URL = 'http://localhost:3000/api/v1/recipe';

  private readonly http = inject(HttpClient);

  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.URL);
  }

  createRecipe(todo: Partial<Recipe>): Observable<Recipe> {
    return this.http.post<Recipe>(this.URL, todo);
  }

  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.URL}/${id}`);
  }

  updateRecipe(todo: Partial<Recipe>) {
    return this.http.patch<Recipe>(`${this.URL}/${todo.id}`, todo);
  }

  deleteRecipe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }
}
