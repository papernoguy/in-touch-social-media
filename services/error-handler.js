const createError = require('http-errors');

// General error handler
const generalErrorHandler = (error, req, res) => {
    return res.status(500).send('An error occurred');
};
const getAllChatRoomsByCommunityIdErrorHandler = (error, req, res) => {
    // Log the error for internal review
    console.log(error);

    if (error.message === 'Community not found') {
        res.status(404).send('Community not found');
    } else {
        res.status(500).send('An error occurred while fetching chat rooms');
    }
}

const getCommunityByIdErrorHandler = (error, req, res) => {
    // Log the error for internal review
    console.log(error);

    if (error.message === 'Community not found') {
        res.status(404).send('Community not found');
    } else {
        res.status(500).send('An error occurred while fetching community');
    }
}

// Specific error handler for createCommunity
const createCommunityErrorHandler = (error, req, res) => {
    console.error(error);  // Log the error for debugging

    // Customize the response based on the error message if you'd like
    switch (error.message) {
        case 'Name is required and should be a string':
            return res.status(400).json({ error: 'Name is required and should be a string.' });
        case 'Bio is required and should be a string':
            return res.status(400).json({ error: 'Bio is required and should be a string.' });
        case 'PhotoRef is required and should be a string':
            return res.status(400).json({ error: 'PhotoRef is required and should be a string.' });
        default:
            return res.status(500).json({ error: 'An unexpected error occurred.' });
    }
}; // OVERKILL


// Specific error handler for getCommunitiesByCriteria
const getCommunitiesByCriteriaErrorHandler = (error, req, res) => {
    res.status(400).send('Error fetching communities');
};

const errorHandlers = {
    createCommunity: createCommunityErrorHandler,
    getCommunitiesByCriteria: getCommunitiesByCriteriaErrorHandler,
    // Add more as needed
};

// Function to select and apply the correct error handler
const errorHandler = (operation, handlerName) => {

    return async function (req, res) {
        try {
            await operation(req, res);
        } catch (error) {
            console.log(error);
            const specificHandler = errorHandlers[handlerName] || generalErrorHandler;
            specificHandler(error, req, res);
        }
    };
};

module.exports = errorHandler;



















function validationErrorHandler(err, req, res, next) {
    if (err.name === 'ValidationError') {
        res.status(400).json({ error: 'Validation failed.', details: err.details });
    } else {
        next(err);
    }
}

function authenticationErrorHandler(err, req, res, next) {
    if (err.name === 'AuthenticationError') {
        res.status(401).json({ error: 'Authentication failed.' });
    } else {
        next(err);
    }
}

function authorizationErrorHandler(err, req, res, next) {
    if (err.name === 'AuthorizationError') {
        res.status(403).json({ error: 'You do not have the necessary permissions.' });
    } else {
        next(err);
    }
}

function notFoundErrorHandler(req, res, next) {
    next(createError(404, 'Resource not found.'));
}

function databaseErrorHandler(err, req, res, next) {
    if (err.name === 'MongoError') {
        res.status(500).json({ error: 'Database error.' });
    } else {
        next(err);
    }
}

function genericServerErrorHandler(err, req, res, next) {
    if (!err.status) {
        res.status(500).json({ error: 'Internal server error.', details: err.message });
    } else {
        res.status(err.status).json({ error: err.message });
    }
}


