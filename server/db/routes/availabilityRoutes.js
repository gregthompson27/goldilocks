const { Router } = require('express');
const { Op } = require('sequelize');
const { Availability } = require('../index');

const availabilityRouter = Router();

availabilityRouter
  .get('/', (req, res) => {
    Availability.findAll()
      .then((availabilities) => res.send(availabilities))
      .catch((err) => res.status(500).send(err));
  })
  .get('/currentAvailabilities/:listingId', (req, res) => {
    const { listingId } = req.params;
    Availability.findAll({
      where: {
        [Op.and]: [
          { accepted: false },
          { listing_id: listingId },
        ],
      },
    })
      .then((availabilities) => res.send(availabilities))
      .catch((err) => res.status(500).send(err));
  })
  .get('/others/currentUserListing/:listingId', (req, res) => {
    const { listingId } = req.params;
    Availability.findAll({
      where: {
        [Op.and]: [
          { accepted: false },
          {
            listing_id: {
              [Op.not]: listingId,
            },
          },
        ],
      },
    })
      .then((availabilities) => res.send(availabilities))
      .catch((err) => res.status(500).send(err));
  });

module.exports = {
  availabilityRouter,
};
