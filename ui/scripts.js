// scripts.js
'use strict';

function handleLogin(event) {
  event.preventDefault(); // Prevent the form from submitting the traditional way

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Here you would typically send a request to your backend to authenticate the user
  // For this example, we'll just check if the username and password are not empty
  if (username && password) {
    // You can also add more complex logic here, such as verifying credentials with a backend server
    alert('Login successful!');
    window.location.href = 'index.html'; // Redirect to the dashboard
  } else {
    alert('Please enter a valid username and password.');
  }
}

function logout() {
  alert("Logging out...");
  window.location.href = "login.html"; // Redirect to login page
}

function user() {
  window.location.href = "users.html";
}

function logs() {
  window.location.href = "logs.html";
}

function access() {
  window.location.href = "access.html";
}

function goBack() {
  window.location.href = "index.html"; // Redirect back to dashboard
}

async function loadUsers() {
  try {
    const response = await fetch('http://localhost:5001/api/v1/owners');
    const users = await response.json();
    const userContent = document.getElementById('user-content');
    userContent.innerHTML = '';
    users.forEach(user => {
      const p = document.createElement('p');
      p.textContent = `${user.employee_names} : ${user.number_plate}`;
      userContent.appendChild(p);
    });
  } catch (error) {
    console.error('Error loading users:', error);
  }
}

async function loadLogs() {
  try {
    const response = await fetch('http://localhost:5001/api/v1/logs');
    const logs = await response.json();
    const logsContent = document.getElementById('logs-content');
    logsContent.innerHTML = '';

    // Reverse the logs to bring the newest to oldest 
    logs.reverse();

    logs.forEach(log => {
      const p = document.createElement('p');
      p.textContent = `${log.date_time}: ${log.number_plate}: ${log.direction}: ${log.vehicle_color}`;
      logsContent.appendChild(p);
    });
  } catch (error) {
    console.error('Error loading logs:', error);
  }
}

async function loadData() {
  await loadUsers();
  await loadLogs();
}
