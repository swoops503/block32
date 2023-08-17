const express = require('express');
const router = express.Router();

const { getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame } = require('../db/videoGames');

// GET - /api/video-games - get all video games
router.get('/', async (req, res, next) => {
    try {
        // retrieve all videogames
        const videoGames = await getAllVideoGames();
        // send list of videogames as a response
        res.send(videoGames);
        // error catch
    } catch (error) {
        next(error);
    }
});

// GET - /api/video-games/:id - get a single video game by id
router.get('/:id', async (req, res, next) => {
    try {
        // request single video game by id
        const videoGameId = req.params.id;
        const videoGame = await getVideoGameById(videoGameId);
        // send single video game as response
        res.send(videoGame);
        // error catch
    } catch (error) {
        next(error);
    }
});

// POST - /api/video-games - create a new video game
router.post('/', async (req, res, next) => {
    try {
        // extract new video game details from body
        const newVideoGame = req.body;
        // create new video game in database
        const createdVideoGame = await createVideoGame(newVideoGame);
        // send new video game
        res.send(createdVideoGame);
        // error catch
    } catch (error) {
        next(error);
    }
});

// PUT - /api/video-games/:id - update a single video game by id
router.put('/:id', async (req, res, next) => {
    try {
        // Extract the video game ID from the request parameters
        const videoGameId = req.params.id;
         // Extract the updated video game details from the request body
        const updatedVideoGame = req.body;
        await updateVideoGame(videoGameId, updatedVideoGame);
        // send updated video game
        res.send('Video game updated successfully.');
        // error catch
    } catch (error) {
        next(error);
    }
});

// DELETE - /api/video-games/:id - delete a single video game by id
router.delete('/:id', async (req, res, next) => {
    try {
         // Extract the video game ID from the request parameters
        const videoGameId = req.params.id;
          // Delete the video game record from the database with the specified ID
        await deleteVideoGame(videoGameId);
        // success message in response
        res.send('Video game deleted successfully.');
        // error catch
    } catch (error) {
        next(error);
    }
});

module.exports = router;
