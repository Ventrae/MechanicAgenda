<template>
  <div class="card">
    <div>
      <div class="imgSize">
        <font-awesome-icon :icon="currentUserImage" />
      </div>
    </div>
    <h2 class="mt-2">{{ currentUser.name }} {{ currentUser.surname }}</h2>
    <div class="my-2">
      <span
        class="badge"
        :class="{'badge-warning': currentUser.isOwner}"
        v-if="currentUser.isOwner"
      >Właściciel zakładu</span>
      <span
        class="badge"
        :class="{'badge-primary':!currentUser.isOwner}"
        v-if="!currentUser.isOwner"
      >Pracownik zakładu</span>
    </div>

    <div id="accordion">
      <div class="card">
        <div class="card-header" id="headingOne">
          <h5 class="mb-0">
            <button
              class="btn btn-link"
              data-toggle="collapse"
              data-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >Zmień e-mail</button>
          </h5>
        </div>

        <div
          id="collapseOne"
          class="collapse"
          aria-labelledby="headingOne"
          data-parent="#accordion"
        >
          <div class="card-body col-6 mx-auto">
            <form>
              <p align="left">Wpisz nowy e-mail:</p>
              <input class="form-control" type="email" placeholder="Adres e-mail" />
              <br /><p align="left">Potwierdź nowy e-mail:</p>
              
              <div class="form-group">
              <input class="form-control" type="email" placeholder="Adres e-mail" />
              </div>
              <input class="btn btn-red" type="submit" value="Akceptuj" />
            </form>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="headingTwo">
          <h5 class="mb-0">
            <button
              class="btn btn-link collapsed"
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >Zmień hasło</button>
          </h5>
        </div>
        <div
          id="collapseTwo"
          class="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordion"
        >
          <div class="card-body col-6 mx-auto">
            <form>
              <p align="left">Wpisz stare hasło:</p>
              <input class="form-control" type="password" placeholder="Stare hasło" />
              <br /><p align="left">Wpisz nowe hasło:</p>
              <input class="form-control" type="password" placeholder="Nowe hasło" />
              <br /><p align="left">Potwierdź nowe hasło:</p>
              <input class="form-control" type="password" placeholder="Nowe hasło" />
              <br />
              <input class="btn btn-red" type="submit" value="Akceptuj" />
            </form>
          </div>
        </div>
      </div>
    </div>
    <queue-view
                :transactions="currentUser.transactions"
            />
  </div>
</template>





<script>
import queueView from "@/components/page-agenda/queue-view";

export default {
  name: "user-data",
  props: {},
  components: {
    queueView
  },
  computed: {
    currentUserImage() {
      if (this.$store.state.currentUser.isOwner === true) return "crown";
      else return "wrench";
    },
    currentUser() {
      return this.$store.state.currentUser;
    },
    currentUserTransactions() {
      this.$store.state.transactions;
    }
  }
};
</script>

<style scoped>
.card {
  margin: auto;
  text-align: center;
}
.imgSize {
  width: 150px;
  height: 150px;
  font-size: 75px;
  box-sizing: border-box;
  padding: 20px;
  margin: auto;
  border: 2px solid black;
}
h2 {
  display: flex;
  margin: auto;
}
.badge {
  font-size: 16px;
}
.changeEmail {
}
.changePassword {
}
</style>