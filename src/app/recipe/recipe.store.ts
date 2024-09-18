import { signalStore } from '@ngrx/signals';
import { SelectEntityId } from '@ngrx/signals/entities';
import { withCrud } from '../crud.store';
import { Recipe } from './model/recipe.model';
import { RecipeService } from './recipe.service';

const selectId: SelectEntityId<Recipe> = (recipe) => recipe.id;
export const RecipeCrud = signalStore(
  withCrud<Recipe>(RecipeService, selectId)
);
