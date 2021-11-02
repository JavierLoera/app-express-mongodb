const mongoose = require('mongoose');
require('dotenv').config()

const url = process.env.MONGODB_URI;

const configDatabase = async() => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

const listarContactos = async(Contacto) => {
    const contactos = await Contacto.find({}, (err, docs) => {
        return docs
    })
    return contactos;
}

const borrarContacto = async(Contacto, id, res) => {
    await Contacto.deleteOne({ _id: id }, (err, docs) => {
        res.redirect('/');
    })
}

const buscarContacto = async(Contacto, id) => {
    const obj = await Contacto.findOne({ _id: id }, (err, docs) => {
        return docs
    })
    return obj
}

const editarDB = async(Contacto, id, req, res) => {
    await Contacto.updateOne({ _id: id }, req.body);
    res.redirect('/');
}

exports.configDatabase = configDatabase;
exports.listarContactos = listarContactos;
exports.borrarContacto = borrarContacto;
exports.buscarContacto = buscarContacto;
exports.editarDB = editarDB;