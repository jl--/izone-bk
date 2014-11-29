;
'use strict';

var config = require('../configs/config');
var jwt = require('express-jwt');
var Portfolio = require('../models/portfolio');
var router = require('express').Router();

var fs = require('fs');

router.param('portfolioId',function(req,res,next,portfolioId){
    req.portfolioId = portfolioId;
    next();
});

router.route('/')
    .get(function(req, res) {
        Portfolio.find().exec(function(err,portfolio){
            return err ? res.status(400).send([]) : res.status(200).send(portfolio || []);
        });
    })
    .post(jwt({
        secret: config.auth.secretToken
    }), function(req, res) {
        for(var file in req.files){
            fs.rename( req.files[file].path, __dirname + '/../statics/portfolio/' + req.files[file].name, function(err){
                if(err){
                    return res.status(400).send({msg: err});
                }
                var portfolio = new Portfolio({
                    title: req.body.title || '',
                    img: config.server.domain + '/statics/portfolio/' + req.files[file].name,
                    file: req.files[file].name,
                    link: req.body.link || '',
                    type: req.body.type,
                    description: req.body.description || ''
                });
                if(req.body.createdAt){
                    portfolio.createdAt = req.body.createdAt;
                }
                portfolio.save(function(err,p){
                    return err ? res.status(400).send({msg: err}) : res.status(201).send(p);
                });
            });
        }
    });

router.route('/:portfolioId')
    .put(jwt({secret: config.auth.secretToken}),function(req,res){
        delete req.body._id;
        delete req.body.status;
        Portfolio.findByIdAndUpdate(req.portfolioId, req.body, function(err, portfolio) {
            return portfolio ? res.status(200).send(portfolio) : res.status(404).send(err || {});
        });

    })
    .delete(jwt({secret: config.auth.secretToken}),function(req,res){
        Portfolio.findById(req.portfolioId,function(err,portfolio){
            if(err){
                return res.status(400).send({msg:err});
            }

            fs.unlink(  __dirname + '/../statics/portfolio/' + portfolio.file, function(err){
                if(err){
                    return res.status(400).send({msg:err});
                }
                portfolio.remove(function(err,p){
                    return err ? res.status(400).send({msg:err}) : res.status(200).send({msg: 'sssscceed'});
                });
            });

        });
    });


module.exports = router;