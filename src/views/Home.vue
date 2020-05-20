<template>
  <v-container class="mt-3">
    <v-label>Стоп-лист</v-label>
    <v-breadcrumbs>
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
      <v-card class="d-flex justify-space-between mb-1">
        <v-card-text>Телефон</v-card-text>
        <v-card-text>Действия</v-card-text>
      </v-card>
      <v-card class="d-flex justify-space-around mb-1">
        <v-card-text>79159874536</v-card-text>
        <v-icon @click="">create</v-icon>
        <v-icon color="red" @click="">delete</v-icon>
      </v-card>
      <v-card class="d-flex flex-row">
        <v-card-text>Строк на странице</v-card-text>
        <v-select
          :items="numbersShow"
        ></v-select>
        <v-pagination></v-pagination>
      </v-card>

    </v-card>
    <v-dialog v-model="addNewDialog" v-if="addNewDialog" width="70%">
      <v-card min-height="500px">
        <v-label>Стоп-лист</v-label>
        <v-row justify="center" align="center">
          <v-col cols="10" class="d-flex justify-center align-center">
            <v-text-field
                    v-model="addPhone"
                    label="Телефон"
                    single-line
                    hide-details
                    class="d-flex align-center">
              <template v-slot:append-outer>
                <v-btn fab small class="primary">
                  <v-icon>done</v-icon>
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
      addPhone: '',
      addNewDialog: false,
      numbersShow: [10, 15, 25]
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
