<template>
  <div>
    <div > Créez un utilisateur</div>
    <form >
        <div>
          <span>Name</span>
          <input type="text" v-model="name" />
        </div>

        <div>
          <span>Firstname</span>
          <input type="text" v-model="firstname"/>
        </div>

        <div>
          <span>Email</span>
          <input type="text" v-model="email"/>
        </div>
        <div @click="submit">Valider</div>
    </form>
  </div>
</template>

<script>
  module.exports = {
    data: () => ({
      name: "",
      firstname: "",
      email: ""
    }),
    components: {
    },
    methods: {
      submit: function(e) {
        // Should call the backend and store data to be displayed in the list.
      }
    }
  }
</script>

<style></style>
