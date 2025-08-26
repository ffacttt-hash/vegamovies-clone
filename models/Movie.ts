// models/Movie.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IMovie extends Document {
  imdbID?: string;
  title: string;
  description?: string;
  language?: string;
  year?: number;
  genres?: string[];
  thumbnail?: string;
  resolutions?: string[];
  sizes?: string[];
  links?: { label: string; url: string }[];
  autoImported?: boolean;
  uploadDate?: Date;
}

const MovieSchema: Schema = new Schema({
  imdbID: { type: String, unique: true, sparse: true },
  title: { type: String, required: true },
  description: String,
  language: String,
  year: Number,
  genres: [String],
  thumbnail: String,
  resolutions: [String],
  sizes: [String],
  links: [{ label: String, url: String }],
  autoImported: { type: Boolean, default: false },
  uploadDate: { type: Date, default: Date.now }
});

export default (mongoose.models.Movie as mongoose.Model<IMovie>) ||
  mongoose.model<IMovie>("Movie", MovieSchema);
