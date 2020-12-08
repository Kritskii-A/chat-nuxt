<template>
  <v-app app dark>
    <v-navigation-drawer app v-model="drawer" mobile-break-point="650">
      <v-list subheader>
        <v-subheader>Список людей в комнате</v-subheader>
        <v-list-tile v-for="user in users" :key="user.id" avatar @click.prevent>
          <v-list-tile-content>
            <v-list-tile-title>{{ user.name }}</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-icon :color="user.id === 2 ? 'primary' : 'grey'"
              >chat_bubble</v-icon
            >
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click="exit"><v-icon>arrow_back</v-icon></v-btn>

      <v-toolbar-title>Чат комнаты {{ user.room }}</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <div style="height: 100%">
        <nuxt />
      </div>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex"; // импортируем, чтобы могли получить данные в user.room
export default {
  data: () => ({
    drawer: true,
    users: [{ id: 1, name: "User 1" }, { id: 2, name: "User 2" }]
  }),
  computed: mapState(["user"]), // подключаем, чтобы могли получить данные в user.room
  methods: {
    ...mapMutations(["clearData"]),
    exit() {
      this.$socket.emit("userLeft", this.user.id, () => {
        this.$router.push("/?message=leftChat");
        this.clearData();
      });
    }
  }
};
</script>
