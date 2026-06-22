import type { Document } from "mongoose";

const TransformSchemaOutput = (
  doc: Document,
  ret: Record<string, unknown>,
): Record<string, unknown> => {
  const id = ret._id;
  delete ret._id;
  delete ret.__v;
  return { id, ...ret };
};

export default TransformSchemaOutput;
