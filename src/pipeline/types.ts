export interface Handler<I, O> {
  process(input: I): O;
}

export interface Consumer<I> extends Handler<I, void> {}
