import { signal, WritableSignal } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { switchMap, catchError, finalize, takeUntil } from 'rxjs/operators';

interface AsyncState<T> {
  data: WritableSignal<T | null>;
  loading: WritableSignal<boolean>;
  error: WritableSignal<string | null>;
  run: () => void;
  retry: () => void;
}

/**
 * Robust async state factory using signals and RxJS.
 *
 * Key characteristics:
 * - Fully explicit triggering (no hidden effects)
 * - Cancellation of previous requests via switchMap
 * - Deterministic execution flow
 * - Easier debugging and reasoning
 */
export function createAsyncState<T>(
  source: () => Observable<T>
): AsyncState<T> {

  const data = signal<T | null>(null);
  const loading = signal(false);
  const error = signal<string | null>(null);

  // Internal trigger stream
  const trigger$ = new Subject<void>();

  // Cancel previous execution when a new one starts
  const cancel$ = new Subject<void>();

  /**
   * Core stream handling
   */
  trigger$
    .pipe(
      // Cancel previous request before starting a new one
      switchMap(() => {
        // Reset state
        loading.set(true);
        error.set(null);

        // Cancel previous in-flight request
        cancel$.next();

        return source().pipe(
          // Allow cancellation
          takeUntil(cancel$),

          catchError(err => {
            error.set(err?.userMessage ?? 'Erreur inconnue');
            return of(null as T);
          }),

          finalize(() => {
            loading.set(false);
          })
        );
      })
    )
    .subscribe(result => {
      if (result !== null) {
        data.set(result);
      }
    });

  /**
   * Triggers a new request
   */
  const run = () => {
    trigger$.next();
  };

  return {
    data,
    loading,
    error,
    run,
    retry: run
  };
}