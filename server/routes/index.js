const e = require('express');
const express = require('express');
const router = express.Router();
const getData = require('./favorite.js');
const dbConnect = require('./mongodb');
// const insert = require('./insert');

router.use(express.json());

router.route('/resource')
  .get(async function(req, res) {
    try{
      let data = await dbConnect();
      const query = req.query;
      if( Object.keys(query).length ) {
        data = await data.find(query).toArray();
      } else {
        data = await data.find().toArray();
      }
      res.send({response: data, success: true});
    } catch(e) {
      res.send({success: false});
    }
  })
  .post(async function(req, res)  {
    try{
      let data = await dbConnect();
      let result = await data.insertOne(req.body);
      res.send({result, success: true});
    } catch(e) {
      res.send({success: false});
    }
  });

router.route('/resource/:id')
  .delete(async function(req, res)  {
    const param = {empId: req.params.id};
    try {
      let data = await dbConnect();
      let result = await data.deleteOne(param);
      if( result.acknowledged ) {
        res.send({response: 'Record deleted', success: true});
      } else {
        res.send({success: false});
      }
    } catch(e) {
      res.send({success: false});
    }
  })
  .put(async function(req, res)  {
    const param = {empId: req.params.id};
    try {
      const data = await dbConnect();
      const query = req.query;
      const result =  await data.updateOne(
        param, {
          $set: query
        }
      );
      if( result.acknowledged ) {
        res.send({response: 'Record updated', success: true});
      } else {
        res.send({success: false});  
      }
    } catch(e) {
      res.send({success: false});
    }
  });
module.exports = router;