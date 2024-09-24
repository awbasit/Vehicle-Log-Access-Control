const ownerQueries = {
    getAllQuery: "SELECT * FROM access",
    getOneQuery: "SELECT * FROM access WHERE employee_id = $1",
    getNumberPlate: "SELECT * FROM access WHERE number_plate = $1",
    saveLogs: "INSERT INTO logs (date_time, number_plate, direction, vehicle_color) VALUES ($1, $2, $3, $4)",
    getLogsQuery: "SELECT * FROM logs",
    createQuery: "INSERT INTO owners (employee_id, employee_names, number_plate) VALUES ($1, $2, $3) RETURNING employee_id",
    updateQuery: "UPDATE access SET employee_id = $1, employee_names = $2, number_plate = $3",
    deleteQuery: "DELETE FROM access WHERE employee_id = $1",
  };

  module.exports = ownerQueries;