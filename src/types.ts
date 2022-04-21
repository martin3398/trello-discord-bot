export interface Producer<T> {
  register: (callback: (arg: T) => void) => void;
  start: () => void;
}

export interface Consumer<T> {
  consume: (payload: T) => void;
}

export interface Middleware<S, T> {
  transform: (payload: S) => T;
}
