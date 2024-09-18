import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudMethods } from '../crud.store';
import { Recipe } from './model/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService implements CrudMethods<Recipe> {
  private readonly URL = 'http://localhost:3000/api/v1/recipe';

  private readonly http = inject(HttpClient);

  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.URL}/${id}`);
  }

  getAll(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.URL);
  }
  create(entity: Partial<Recipe>): Observable<Recipe> {
    return this.http.post<Recipe>(this.URL, entity);
  }
  update(entity: Partial<Recipe>): Observable<Recipe> {
    return this.http.patch<Recipe>(`${this.URL}/${entity.id}`, entity);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }
}
