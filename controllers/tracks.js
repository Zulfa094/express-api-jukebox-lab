const Track = require('../models/track')

const express = require('express')

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const createdTrack = await Track.create(req.body)
    res.status(201).json(createdTrack)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const foundTracks = await Track.find()
    res.status(200).json(foundTracks)
  } catch {
    res.status(500).json({ error: error.message })
  }
})

router.get('/:trackId', async (req, res) => {
  try {
    const foundTrack = await Track.create(req.params.trackId)
    if (!foundTrack) {
      res.status(404)
      throw new Error('Pet not Found')
    }
    res.status(200).json(foundTrack)
  } catch {
    if (res.statusCode === 404) {
      res.json({ error: error.message })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

router.put('/:trackId', async (req, res) => {
  try {
    const updatedTrack = await Track.create(req.params.trackId)
    if (!updatedTrack) {
      res.status(404)
      throw new Error('Pet not Found')
    }
    res.status(200).json(updatedTrack)
  } catch {
    if (res.statusCode === 404) {
      res.json({ error: error.message })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

router.delete('/:trackId', async (req, res) => {
  try {
    let deletedTrack = await Track.findByIdAndDelete(req.params.trackId)
    if (!deletedTrack) {
      res.status(404)
      throw new Error('Track not Found')
    }
    res.status(200).json({
      message: `Successfully deleted the Track with ID of ${req.params.trackId}!`
    })
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

module.exports = router
