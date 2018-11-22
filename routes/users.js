var express = require('express');
var router = express.Router();
const db = require('../db')

router.post('/signup', function(req, res, next){
  db.createUser(req.body.username, req.body.password, req.body.email, "USER", (err, result) => {
    if(err) res.redirect('/signup?fail=true')
    require('../mail')(req.body.email, 'Bem vindo ao nosso chat', 'Olá ' + req.body.username + ', obrigado por se cadastrar!')
    res.redirect('/')
  })
})
 
router.get('/signup', function(req, res, next) {
  if(req.query.fail)
    res.render('signup', { message: 'Falha no cadastro do usuário!' });
  else
    res.render('signup', { message: null });
})

router.get('/forgot', function(req, res, next) {
  res.render('forgot', { });
})

router.post('/forgot', function(req, res, next) {
  db.findUser(req.body.email, (err, doc) => {
    if(err || !doc) res.redirect('/')//manda pro login mesmo que não ache
    const newpass = require('../utils').generatePassword()
    db.changePassword(req.body.email, newpass)
    require('../mail')(req.body.email, 'Sua nova senha do chat', 'Olá ' + doc.username + ', sua nova senha é ' + newpass)
    res.redirect('/')
  })
})

router.post('/logoff', function(req, res, next){
  req.logOut();
  res.redirect('/login');
})
 
module.exports = router;