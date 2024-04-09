/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({timestamps:true})
export class Book extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop()
  description: string;

  @Prop({ min: 1 })
  pageNumber: number;

  @Prop({ min: 0, required: true, max: 10 })
  rating: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
