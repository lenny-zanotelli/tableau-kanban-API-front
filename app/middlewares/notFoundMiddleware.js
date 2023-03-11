function notFoundMiddleware(req, res) {
    res.status(404).send('Service does not exists\nCheck API docs for correct routes');
}

module.exports = notFoundMiddleware;
