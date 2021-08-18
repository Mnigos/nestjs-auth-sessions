import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class UserApi extends Document {
  @Prop({ type: String, required: true, unique: true })
  name: string

  @Prop({ type: String, required: true })
  pass: string

  @Prop({ type: String, required: true })
  email: string

  @Prop({ type: String, default: () => new Date() })
  createdAt: Date
}

export const UserSchema = SchemaFactory.createForClass(UserApi)
