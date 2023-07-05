const express = require('express')
const router = express.Router()
const passport = require('passport')
const multer = require('../middlewares/multer')
const { registerValidator, loginValidator } = require('../middlewares/validator/userValidator')

router.get('/login', (req, res) => {
    res.render('auth/login',{ title:'Inicio de Sesion'})
})
router.post('/login', passport.authenticate('login' ), loginValidator, async (req,res) => {
    res.json({ message:"Success", user: req.user })
})

router.post('/signup', multer.single('avatar'), registerValidator, passport.authenticate('signup' ), async (req,res) => {
    res.json({ message:"Success", user: req.user })
})

router.get('/logout',(req, res)=>{
    req.logout();
    res.redirect('/auth/login')
})

module.exports = router