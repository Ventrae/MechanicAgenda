<template>
  <div class="page login container" id="login-page">
    <form class="card border-gray mx-auto my-5" @submit.prevent="login()">
      <div class="card-body">
        <h3 class="card-title">Malinowa Car Mechanic</h3>
        <hr/>
        <div class="card-text">
          <input type="text" class="form-control my-2" placeholder="Nazwa użytkownika" />
          <input type="password" class="form-control my-2" placeholder="Hasło użytkownika" />
          <button class="btn btn-red btn-block" type="submit">Zaloguj</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
  import {firestoreRequests} from "@/mixins/firestoreRequests";

  export default {
    name: "Login",
    mixins: [ firestoreRequests ],
    methods: {
      login(){
        alert('Loguję!');
        this.$router.push('/agenda');
      }
    }
  }
</script>
<style scoped>
  form {
    width: 25em;
  }
</style>