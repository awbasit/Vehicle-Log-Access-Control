const express = require("express");
require("dotenv").config();
var cors = require('cors')
const OwnerRoutes  = require("./api/routes/routes.users")
const LogsRoutes = require("./api/routes/routes.logs")

const app = express();
app.use(cors())
const port = process.env.PORT;
app.use(express.json())

app.use('/', OwnerRoutes)
app.use('/api/v1/owners', OwnerRoutes)
app.use('/api/v1/logs', LogsRoutes)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
 
