const {Schema, model} = require('mongoose');

const UserSchema = Schema
({
    name:
    {
        type: String,
        required: [true, 'Debes introducir tu nombre']
    },

    user_name:
    {
        type: String,
        required: [true, 'Elige un nombre de usuario para tu perfil'],
        unique: true
    },

    email:
    {
        type: String,
        required: [true, 'Debes introducir un correo electrónico'],
        unique: true
    },

    password:
    {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },

    image:
    {
        type: String,
        default: "user_image.jpg"
    },

    is_admin:
    {
        type: Boolean,
        default: false
    },

    creation_date:
    {
        type: String,
        default: () =>
        {
            const date = new Date();

            return date.toLocaleString();
        }
    }
});

// Impido que el JSON me devuelva la contraseña y la versión para tener solo los datos del usuario con los que trabajar
UserSchema.methods.toJSON = function()
{
    const {__v, password, _id, ...user} = this.toObject();

    // Cambio el nombre de _id a uid
    user.uid = _id;

    return user;
}

// Exporto el nombre de la colección (Mongo añade una 's' al final) y el esquema de los atributos
module.exports = model('User', UserSchema);