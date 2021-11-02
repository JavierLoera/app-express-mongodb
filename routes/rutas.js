const express = require('express');
const { crearContacto, mostrarContactos, eliminarContacto, actualizarContacto, editarContacto } = require('../controllers/contacto.controller.js')
const { body } = require('express-validator');
const router = express.Router();


router.get('/', mostrarContactos);

router.get('/form', (req, res) => {
    res.render('agregar')
})


router.post('/guardar',
    body('nombre', "Ingrese un valor").exists(),
    body('numero', "Ingrese un número con almenos 8 caracteres y maximo 12")
    .isLength({ min: 8, max: 12 }).isNumeric(),
    body('direccion',
        "ingrese una direccion correcta con al menos 20 caracteres").exists().isLength({ min: 20, max: 50 }),
    body('email', "Ingrese un e-mail valido")
    .isEmail(),
    crearContacto)


router.get('/eliminar/:id', eliminarContacto);
router.get('/editar/:id', actualizarContacto);

router.post('/editar/:id', editarContacto)


module.exports = router;