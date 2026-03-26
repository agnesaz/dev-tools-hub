import mongoose, { Schema, Document } from 'mongoose';

export interface ILink extends Document {
  title: string;
  url: string;
  icon?: string;
  description?: string;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LinkSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ILink>('Link', LinkSchema);