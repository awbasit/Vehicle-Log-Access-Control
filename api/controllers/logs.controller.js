const BaseController = require('./base.controller')
const logsQueries = require('../database/logs.queries')

class LogsController extends BaseController {
    constructor(pool){
        super(pool, 'logs', logsQueries)
    }
}

module.exports = LogsController;