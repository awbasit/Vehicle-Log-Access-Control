// These queries are to handle request for the logs
const logsQueries = {
    saveLogs: "INSERT INTO logs (date_time, number_plate, direction, vehicle_color) VALUES ($1, $2, $3, $4)",
    getLogsQuery: "SELECT * FROM logs"
}

module.exports = logsQueries;