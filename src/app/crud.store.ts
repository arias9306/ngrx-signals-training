import { computed, inject, ProviderToken } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStoreFeature,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  addEntity,
  removeEntity,
  SelectEntityId,
  setEntities,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Observable, pipe, switchMap, tap } from 'rxjs';

export interface CrudMethods<T> {
  getAll(): Observable<T[]>;
  create(entity: Partial<T>): Observable<T>;
  update(entity: Partial<T>): Observable<T>;
  delete(id: number): Observable<void>;
}

interface CrudStore<T> {
  selectedEntity: T | null;
  isLoading: boolean;
}

export function withCrud<T>(
  Service: ProviderToken<CrudMethods<T>>,
  selectId: SelectEntityId<T>
) {
  return signalStoreFeature(
    withEntities<T>(),
    withState<CrudStore<T>>({
      selectedEntity: null,
      isLoading: false,
    }),
    withComputed(({ ids }) => ({
      count: computed(() => ids().length),
    })),
    withMethods((store, service = inject(Service)) => ({
      loadEntities: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(() =>
            service.getAll().pipe(
              tapResponse({
                next: (model: T[]) =>
                  patchState(store, setEntities(model, { selectId })),
                error: (e) => console.error(e),
                finalize: () => patchState(store, { isLoading: false }),
              })
            )
          )
        )
      ),
      setSelectedEntity: rxMethod<T>(
        pipe(
          tap((selected: T) => patchState(store, { selectedEntity: selected }))
        )
      ),
      save: rxMethod<T>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap((model) =>
            service.create(model).pipe(
              tapResponse({
                next: (model: T) => {
                  patchState(store, addEntity(model, { selectId }));
                  patchState(store, { selectedEntity: null });
                },
                error: (e) => console.error(e),
                finalize: () => patchState(store, { isLoading: false }),
              })
            )
          )
        )
      ),
      update: rxMethod<T>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap((model) =>
            service.update(model).pipe(
              tapResponse({
                next: (model: T) => {
                  patchState(
                    store,
                    updateEntity(
                      { id: selectId(model), changes: model },
                      { selectId }
                    )
                  );
                  patchState(store, { selectedEntity: null });
                },
                error: (e) => console.error(e),
                finalize: () => patchState(store, { isLoading: false }),
              })
            )
          )
        )
      ),
      delete: rxMethod<number>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap((modelId) =>
            service.delete(modelId).pipe(
              tapResponse({
                next: () => {
                  patchState(store, removeEntity(modelId));
                  patchState(store, { selectedEntity: null });
                },
                error: (e) => console.error(e),
                finalize: () => patchState(store, { isLoading: false }),
              })
            )
          )
        )
      ),
    })),
    withHooks((store) => ({
      onInit() {
        store.loadEntities();
      },
    }))
  );
}
