const {
  json
} = require('body-parser');
const Thing = require('../models/thing');

exports.createThing = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  console.log(sauceObject);
  delete sauceObject._id;
  delete sauceObject._userId;
  const sauce = new Thing({
    ...sauceObject,

    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename }`,
  });
console.log(sauce);
sauce
.save()
.then(() => res.status(201).json({ message: "Sauce enregistrée" }))
.catch((error) => res.status(420).json({ error }));
};


exports.getOneThing = (req, res, next) => {
  Thing.findOne({
    _id: req.params.id
  }).then(
    (thing) => {
      res.status(200).json(thing);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyThing = (req, res, next) => {
  const thingObject = req.file ? {
    ...JSON.parse(req.body.thing),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : {
    ...req.body
  };

  delete thingObject._userId;
  Thing.findOne({
      _id: req.params.id
    })
    .then((thing) => {
      if (thing.userId != req.auth.userId) {
        res.status(401).json({
          message: 'Not authorized'
        });
      } else {
        Thing.updateOne({
            _id: req.params.id
          }, {
            ...thingObject,
            _id: req.params.id
          })
          .then(() => res.status(200).json({
            message: 'Objet modifié!'
          }))
          .catch(error => res.status(401).json({
            error
          }));
      }
    })
    .catch((error) => {
      res.status(400).json({
        error
      });
    });
};

exports.deleteThing = (req, res, next) => {
  Thing.deleteOne({
    _id: req.params.id
  }).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getAllThings = (req, res, next) => {
  Thing.find().then(
    (things) => {
      res.status(200).json(things);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
