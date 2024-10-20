const BaseController = require('./base.controller')
const logsQueries = require('../database/logs.queries')

// The LogsController class extends the functionalities of the BaseController 
class LogsController extends BaseController {
    constructor(pool){
        super(pool, 'logs', logsQueries)
    }
}

// Export the LogsController instance directly
module.exports = LogsController;