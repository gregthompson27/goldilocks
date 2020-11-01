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
  .get('/currentAvailabilities/:hostId', (req, res) => {
    const { hostId } = req.params;
    Availability.findAll({
      where: {
        [Op.and]: [
          { accepted: false },
          { host_id: hostId },
        ],
      },
    })
      .then((availabilities) => res.send(availabilities))
      .catch((err) => res.status(500).send(err));
  })
  .get('/others/currentUser/:hostId', (req, res) => {
    const { hostId } = req.params;
    Availability.findAll({
      where: {
        [Op.and]: [
          { accepted: false },
          {
            host_id: {
              [Op.not]: hostId,
            },
          },
        ],
      },
    })
      .then((availabilities) => res.send(availabilities))
      .catch((err) => res.status(500).send(err));
  })
  .get('/countSwaps/:userId', (req, res) => {
    const { userId } = req.params;
    Availability.findAndCountAll({
      where: {
        [Op.and]: [
          { accepted: true },
          { host_id: userId },
        ],
      },
    })
      .then((swaps) => res.send(swaps))
      .catch((err) => console.log(err));
  });

module.exports = {
  availabilityRouter,
};
