const BaseController = require("./base.controller");
const ownerQueries = require("../database/users.queries");

// Define the OwnerController class
class OwnerController extends BaseController {
  constructor(pool) {
    console.log("go");
    super(pool, "access", ownerQueries);
  }
}

// Export the OwnerController instance directly
module.exports = OwnerController;
