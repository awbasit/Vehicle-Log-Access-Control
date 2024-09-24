const { getOneQuery } = require("../database/users.queries");
// const client = require('../mqttClient')
const express = require('express')
// const router = express.Router()
const axios = require('axios')

class BaseController {
  constructor(pool, tableName, queries) {
    this.pool = pool;
    this.tableName = tableName;
    this.queries = queries;
  }

  async getAll(req, res) {
    try {
      const results = await this.pool.query(this.queries.getAllQuery);
      res.status(200).json(results.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getOne(req, res) {
    try {
      const id = parseInt(req.params.id);
      const results = await this.pool.query(this.queries.getOneQuery, [id]);
      if (results.rows.length === 0) {
        return res.status(404).json({ error: `${this.tableName} not found` });
      }
      res.status(200).json(results.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async create(req, res) {
    try {
      const data = req.body;
      this.pool.query(getOneQuery, [data.name], (err, results) => {
        if (results.rows.length) {
          return res.send("User already exist");
        }
      });
      const insertResults = await this.pool.query(this.queries.createQuery, [
        data.employee_id,
        data.employee_name,
        data.number_plate,
      ]);
      res.status(201).json({
        message: `${this.tableName} added successfully`,
        id: insertResults.rows[0].id,
      });
      console.log(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async update(req, res) {
    try {
      const id = parseInt(req.params.id);
      const data = req.body;
      const results = await this.pool.query(this.queries.updateQuery, [
        data,
        id,
      ]);
      if (results.rowCount === 0) {
        return res.status(404).json({ error: `${this.tableName} not found` });
      }
      res
        .status(200)
        .json({ message: `${this.tableName} updated successfully` });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async delete(req, res) {
    try {
      const id = parseInt(req.params.id);
      const results = await this.pool.query(this.queries.deleteQuery, [id]);
      if (results.rowCount === 0) {
        return res.status(404).json({ error: `${this.tableName} not found` });
      }
      res
        .status(200)
        .json({ message: `${this.tableName} deleted successfully` });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getJson(req, res) {
    //fetching the number plate from the json data
    const { direction, vehicle_color } = req.body;
    const numberplate = req.body.license_plate;
    const date_time = req.body.dateTime;

    if (!numberplate) {
      res.status(400).json({ error: `There is no number plate found` });
    }
    try {
      await this.pool.query(this.queries.saveLogs, [
        date_time,
        numberplate,
        direction,
        vehicle_color,
      ]);
      const results = await this.pool.query(this.queries.getNumberPlate, [
        numberplate,
      ]);
      if (results.rows.length > 0) {
        // Number plate is allowed
         // Open the gate (Relay 0) and set timer to 3 seconds
      axios.get('http://192.168.160.86/relay/0?turn=on&timer=3')
      .then(response => {
        console.log('Gate opened (Relay 0 turned on):', response.data);

        // Set a timeout for 3 seconds to trigger gate closure (Relay 1)
        setTimeout(() => {
          axios.get('http://192.168.160.86/relay/1?turn=on&timer=3')
            .then(response => {
              console.log('Gate closed (Relay 1 turned on):', response.data);
            })
            .catch(error => {
              console.error('Error closing gate (Relay 1):', error);
            });
        }, 3000); // 3000ms = 3 seconds
      })
      .catch(error => {
        console.error('Error opening gate (Relay 0):', error);
      });
        console.log(`Access granted for number plate: ${numberplate}`);
        return res.json({ message: "Access granted", numberplate });
      } else {
        // Number plate is not allowed
        console.log(`Access denied for number plate: ${numberplate}`);
        return res.status(403).json({ message: "Access denied", numberplate });
      }
    } catch (error) {
      console.error("Error querying the database:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  //Displaying the logs data from the database
  async getLogs(req, res) {
    try {
      const result = await this.pool.query(this.queries.getLogsQuery);
      const logs = result.rows;
      res.json(logs);
    } catch (error) {
      // console.error('Error querying the database:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = BaseController;
