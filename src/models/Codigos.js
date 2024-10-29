import { Schema, model } from 'mongoose';

const codigoSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'DataUser', default: null},
    code: {type: String, unique: true},
    used: {type: Boolean, default: false},
    date: {type: Date, default: null},
    isWinner: {type: Boolean, default: false}
});

const Codigo = model('Codigo', codigoSchema);

export default Codigo;