import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Product & Document;

@Schema()
export class Product {
    @Prop()
    nombre:string;
    @Prop()
    descripcion:string;
    @Prop()
    precio:string;
    @Prop()
    image:string;
}


export const UserSchema2 = SchemaFactory.createForClass(Product);