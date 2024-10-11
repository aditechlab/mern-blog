//Unsupported (404) routes/path
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    req.status(404);
    next(error);
}


//Middleware to handle errors
const errorHandler = (error, req, res, next) => {
    if(res.headerSent) {
        return next(error);
    }

    res.status(error.code || 500).json({message: error.message || "An uknown error occured"})
    
}

module.exports = { notFound, errorHandler }