<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const username = ref('');

onMounted(() => {
  username.value = sessionStorage.getItem('username') || '';
});
</script>

<template>
  <div class="dashboard-container">
    <h2 class="dashboard-heading">Dashboard</h2>
    <h3 class="greeting">Hi, {{ username }}</h3>
  </div>
</template>

<style scoped>
  .dashboard-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }

  .dashboard-heading {
    color: #3498db;
    font-size: 2em;
    margin-bottom: 20px;
  }

  .greeting {
    color: #2ecc71;
    font-size: 1.5em;
    margin-top: 10px;
  }
</style>
