export interface Handler<I, O> {
  process(input: I): O | undefined;
}

export interface Consumer<I> extends Handler<I, void> {}
