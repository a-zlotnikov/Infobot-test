<template>
  <v-container class="mt-3">
    <v-label>Стоп-лист</v-label>
    <v-breadcrumbs divider=">">
      <v-breadcrumbs-item>Главная</v-breadcrumbs-item>
      <v-breadcrumbs-divider />
      <v-breadcrumbs-item>Стоп-лист</v-breadcrumbs-item>
    </v-breadcrumbs>
    <v-card class=" pa-6 grey lighten-4 p" style="min-height: 600px">
      <v-row justify="start" align="center">
        <v-col cols="6" class="d-flex justify-start align-center">
          <v-text-field
                  v-model="search"
                  prepend-icon="search"
                  label="Искать"
                  single-line
                  hide-details
                  class="d-flex align-center">
            <template v-slot:append-outer>
              <v-btn rounded class="primary ml-4">найти</v-btn>
              <v-btn x-small fab class="red ml-4"><v-icon color="white" @click="clear">close</v-icon></v-btn>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="5" class="d-flex justify-end align-center">
          <v-btn rounded class="success" @click="addNumber">добавить</v-btn>
        </v-col>
      </v-row>
      <v-card>Телефон</v-card>
      <v-card
              append-icon="delete"
      >79159874536</v-card>
      <v-card>1-25</v-card>

    </v-card>
    <v-dialog v-model="addNewDialog" v-if="addNewDialog" width="70%">
      <v-card min-height="500px">
        <v-label>Стоп-лист</v-label>
        <v-row justify="center" align="center">
          <v-col cols="10" class="d-flex justify-center align-center">
            <v-text-field>
              <template v-slot:append-outer>
                <v-btn fab small class="primary pl-11">
                  <v-icon>checked</v-icon>
                </v-btn>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-btn rounded color="grey lighten-3" @click="closeNewDialog">Назад</v-btn>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      search: '',
      addNewDialog: false
    }
  },
  methods: {
    clear() {
      this.search = ''
    },
    addNumber() {
      this.addNewDialog = true
    },
    closeNewDialog() {
      this.addNewDialog = false
    }
  },
  components: {
  }
}
</script>
