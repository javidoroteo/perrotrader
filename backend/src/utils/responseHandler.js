class ResponseHandler {
    static success(res, data, message = 'Success', statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            data
        });
    }

    static error(res, message = 'Internal Server Error', statusCode = 500, details = null) {
        return res.status(statusCode).json({
            success: false,
            message,
            ...(details && { details })
        });
    }

    static notFound(res, message = 'Resource not found') {
        return this.error(res, message, 404);
    }

    static badRequest(res, message = 'Bad request', details = null) {
        return this.error(res, message, 400, details);
    }

    static unauthorized(res, message = 'Unauthorized') {
        return this.error(res, message, 401);
    }
}

module.exports = ResponseHandler;