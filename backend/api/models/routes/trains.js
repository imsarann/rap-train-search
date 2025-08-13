const express = require('express');
const Train = require('../Train');
const router = express.Router();
require('dotenv').config();

router.get('/stations', async (req, res) => {
  try {
    const trains = await Train.find({});
    const allStations = new Set();

    trains.forEach(train => {
      train.stops.forEach(stop => {
        allStations.add(stop.station);
      });
    });

    const stations = Array.from(allStations).sort();
    res.json(stations);
  } catch (error) {
    console.error('Stations fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch stations' });
  }
});

router.get('/search', async (req, res) => {
  try {
    const { source, destination, sort } = req.query;

    if (!source || !destination) {
      return res.status(400).json({ error: 'Source and destination are required' });
    }

    const directTrains = await Train.find({
      $and: [
        { 'stops.station': source },
        { 'stops.station': destination }
      ]
    });

    const connectingTrains = await Train.find({
      $or: [
        { 'stops.station': source },
        { 'stops.station': destination }
      ],
      $nor: [
        {
          $and: [
            { 'stops.station': source },
            { 'stops.station': destination }
          ]
        }
      ]
    });

    let results = [];

    const addTrainResult = (train, type) => {
      const sourceStop = train.stops.find(stop => stop.station === source);
      const destStop = train.stops.find(stop => stop.station === destination);

      if (!sourceStop || !destStop) return;

      const sourceIndex = train.stops.findIndex(stop => stop.station === source);
      const destIndex = train.stops.findIndex(stop => stop.station === destination);

      if (sourceIndex >= destIndex) return;

      let totalDistance = 0;
      for (let i = sourceIndex + 1; i <= destIndex; i++) {
        totalDistance += train.stops[i].distanceFromPrevious;
      }

      const price = Math.round(totalDistance * 1.25 * 100) / 100;

      results.push({
        trainName: train.name,
        departureTime: sourceStop.departureTime,
        arrivalTime: destStop.departureTime,
        distance: totalDistance,
        price,
        type
      });
    };

    directTrains.forEach(train => addTrainResult(train, 'Direct'));
    connectingTrains.forEach(train => addTrainResult(train, 'Connecting'));

    if (sort === 'price') {
      results.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      results.sort((a, b) => b.price - a.price);
    }

    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Failed to search trains' });
  }
});

module.exports = router;
