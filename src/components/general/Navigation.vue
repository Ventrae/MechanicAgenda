<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-red" id="navigation">
        <a class="navbar-brand" href="#">Malinowa Car Mechanic</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <router-link
                        to="/agenda"
                        tag="li"
                        class="nav-item"
                        active-class="active"
                        exact>
                    <a class="nav-link">Agenda</a>
                </router-link>
                <router-link
                        to="/profile"
                        tag="li"
                        class="nav-item"
                        active-class="active"
                        exact>
                    <a class="nav-link">Profil</a>
                </router-link>
                <router-link
                        to="/admin"
                        tag="li"
                        class="nav-item"
                        active-class="active"
                        exact>
                    <a class="nav-link">Admin</a>
                </router-link>
                <li class="nav-item">
                    <a href="#" class="nav-link" @click="logout()">Wyloguj</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "Navigation",
        methods: {
            logout(){
                alert('Wylogouje!');
                this.$router.push('/');
            }
        }
    }
</script>

<style scoped>

</style>