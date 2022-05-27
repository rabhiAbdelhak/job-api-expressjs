const notFound = (req, res) => res.status(404).json({msg : 'Route does not exist', route : req.url})

module.exports = notFound
