import { Document } from "mongoose";

const TransformSchemaOutput = (doc: Document, ret: Record<string, any>) => {
    const { _id, __v, ...object } = ret;
    return { id: _id, ...object };
};

export default TransformSchemaOutput;
