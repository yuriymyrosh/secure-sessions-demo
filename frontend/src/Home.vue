<script setup lang="ts">
import { useAuth } from './composables';

const {
  onLogin,
  onLogout,
  getUsers,
  getSessionData,
  username,
  password,
} = useAuth()

</script>

<template>
  <div class="login-container">
    <h2>Login Form</h2>

    <form @submit.prevent="onLogin" class="login-form">
      <input v-model="username" type="text" name="username" class="input-field" placeholder="Username">
      <input v-model="password" type="password" name="password" class="input-field" placeholder="Password">

      <button type="submit" class="login-button">Login</button>
    </form>

    <div class="action-buttons">
      <button @click="onLogout" class="logout-button">Logout</button>
      <button @click="getUsers" class="action-button">Get Users</button>
      <button @click="getSessionData" class="action-button">Get Data</button>
    </div>

    <router-link to="/dashboard" class="dashboard-link">Go to Dashboard</router-link>
  </div>
</template>

<style>
  body {
    font-family: sans-serif;
  }
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }

  .login-form {
    width: 300px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }

  .input-field {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-sizing: border-box;
  }

  .login-button {
    width: 100%;
    padding: 10px;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }

  .action-buttons {
    display: flex;
    justify-content: space-between;
    width: 300px;
  }

  .action-button {
    flex-grow: 1;
    margin: 0 5px;
    padding: 10px;
    background-color: #2ecc71;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }

  .logout-button {
    flex-grow: 1;
    margin: 0 5px;
    padding: 10px;
    background-color: #e74c3c;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }

  .dashboard-link {
    margin-top: 20px;
    color: #3498db;
    text-decoration: none;
    cursor: pointer;
    font-weight: bold;
  }
</style>


