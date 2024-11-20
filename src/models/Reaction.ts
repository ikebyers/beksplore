// import { Schema, Types } from 'mongoose';

// export interface IReaction {
//     reactionId: Types.ObjectId;
//     reactionBody: string;
//     username: string;
//     createdAt: Date;
// }

// Define the Reaction schema
// const reactionSchema = new Schema<IReaction>(
//     {
//         reactionId: {
//             type: Schema.Types.ObjectId,
//             default: () => new Types.ObjectId(),
//         },
//         reactionBody: {
//             type: String,
//             required: true,
//             minlength: 1,
//             maxlength: 280,
//         },
//         username: {
//             type: String,
//             required: true,
//         },
//         createdAt: {
//             type: Date,
//             default: () => new Date(),
//             get: (value: any) => value instanceof Date ? value.toISOString() : value,
//         },
//     },
//     {
//         toJSON: { getters: true },
//         id: false,
//     }
// );

// export default reactionSchema;