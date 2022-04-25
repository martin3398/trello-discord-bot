import { InferType, object, string } from "yup";

export type UnverifiedEvent = any; // eslint-disable-line @typescript-eslint/no-explicit-any

const listSchema = object({
  id: string().required(),
  name: string().required(),
});

const updateCardEventSchema = object({
  id: string().required(),
  data: object({
    card: object({
      name: string().required(),
    }).required(),
    listBefore: listSchema.required(),
    listAfter: listSchema.required(),
  }).required(),
});

export interface UpdateCardEvent
  extends InferType<typeof updateCardEventSchema> {}

export { updateCardEventSchema };
