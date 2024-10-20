const BaseController = require("./base.controller");
const ownerQueries = require("../database/users.queries");

// Define the OwnerController class
// The LogsController class extends the functionalities of the BaseController
class OwnerController extends BaseController {
  constructor(pool) {
    super(pool, "access", ownerQueries);
  }
}

// Export the OwnerController instance directly
module.exports = OwnerController;
