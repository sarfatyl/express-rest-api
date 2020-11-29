const express = require('express');
const router = express.Router();
require('../authentication/local.authentication');
require('../authentication/jwt.authentication');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const UsersService = require('../services/users.service');

router.use(passport.initialize());

router.post('/login',passport.authenticate('local',{session:false}),async function (req,res,next) {
    const token = await jwt.sign({
        hello: 'world',
        userId : req.user.id
    }, 'secret string');
    res.send(`jwt token: ${token}`);
})

//all route that starts in api
router.use('/',passport.authenticate('jwt',{session:false}));


router.route('/users')
    .get(function (req,res) {
        // const service = new UsersService();
        res.send(UsersService.getUsers());
    })
    .post(function (req,res) {
        res.send(UsersService.createUser(req.body.firstName,req.body.lastName))
    })

router.route('/users/:id(\\d+)')
    .all(function (req,res,next) {
        const user = UsersService.getSingleUser(req.params.id);
        if(user) {
            next();
        }else {
            res.status(400).send('User not found')
        }
    })
    .delete(function (req,res) {
        res.send(UsersService.deleteUser(req.params.id));
    })
    .put(function (req, res) {
        res.send(UsersService.updateUser(req.params.id,req.body.firstName,req.body.lastName));
    })
    .get(function (req,res) {
        res.send(UsersService.getSingleUser(req.params.id))
    })

module.exports = router;
