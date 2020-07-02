const logger = require('./logger')

module.exports = (err, req, res, next) => {
    logger.error(err.message)

    if (err.name === 'CastError') {
        return res.status(400).send({error: 'Malformatted id'})
    } else if (err.name === 'ValidationError') {
        return res.status(400).json({error: err.message})
    } else if (err.name === 'SyntaxError') {
        return res.status(400).json({error: err.message})
    } else if (err.name === 'NotFoundError') {
        return res.status(404).json({error: err.message})
    }

    next(err)
}