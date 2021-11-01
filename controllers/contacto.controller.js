const Contacto = require('../models/contacto.model.js');
const { listarContactos, borrarContacto, buscarContacto, editarDB } = require('../dbConfig/database.js');
const { validationResult } = require('express-validator');

const mostrarContactos = async function(req, res) {
    const contactos = await listarContactos(Contacto);
    res.render('lista', { contactos })
}


const crearContacto = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const valores = req.body;
        const validacion = errors.array()
        res.render('agregar', { validacion: validacion, valores: valores })

    } else {
        const { nombre, numero, direccion, email } = req.body;
        const contacto = new Contacto({
            nombre: nombre,
            numero: Number(numero),
            direccion: direccion,
            email: email
        })
        contacto.save()
            .then(result => {
                res.redirect('/')
            })
    }
}


const actualizarContacto = async(req, res) => {
    const id = req.params.id;
    const contacto = await buscarContacto(Contacto, id)
    res.render('actualizar', { contacto })
}

const eliminarContacto = async(req, res) => {
    const id = req.params.id;
    await borrarContacto(Contacto, id, res);
}

const editarContacto = async(req, res) => {
    const id = req.params.id
    await editarDB(Contacto, id, req, res)
}


exports.mostrarContactos = mostrarContactos;
exports.crearContacto = crearContacto;
exports.actualizarContacto = actualizarContacto;
exports.eliminarContacto = eliminarContacto;
exports.editarContacto = editarContacto;