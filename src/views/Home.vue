<template>
  <v-container class="mt-4">
    <h3 class="text-left ml-5">Стоп-лист</h3>
    <v-breadcrumbs>
      <v-breadcrumbs-item>Главная</v-breadcrumbs-item>
      <v-breadcrumbs-item>Стоп-лист</v-breadcrumbs-item>
    </v-breadcrumbs>
    <v-card class=" pa-6 grey lighten-4 p" style="min-height: 600px">
      <v-data-iterator
        :items="getPhones"
        :items-per-page.sync="itemsPerPage"
        :page="page"
        :search="search"
        :sort-by="sortBy"
        hide-default-footer
      >
        <template v-slot:header>
          <v-row justify="start" align="center">
            <v-col cols="6" class="d-flex justify-start align-center">
              <v-text-field
                      v-model="search"
                      prepend-icon="search"
                      label="Искать"
                      single-line
                      hide-details
                      class="d-flex align-center">
              </v-text-field>
              <v-btn rounded class="primary ml-4">найти</v-btn>
              <v-btn x-small fab class="red ml-4"><v-icon color="white" @click="clear">close</v-icon></v-btn>
            </v-col>
            <v-col cols="5" class="d-flex justify-end align-bottom">
              <v-btn rounded class="success" @click="addNumber">добавить</v-btn>
            </v-col>
          </v-row>
        </template>

        <v-card class="d-flex justify-space-between mb-1" width="100%">
          <v-card-text class="text-left ml-2">Телефон</v-card-text>
          <v-card-text class="text-right mr-2">Действия</v-card-text>
        </v-card>
        <template v-slot:default="props">
          <v-card
                  v-for="(phone, i) in props.items"
                  :key="i"
                  class="d-flex justify-space-between mb-1">
            <v-card-text class="text-left ml-2" style="width: 90%" >{{ phone.number }}</v-card-text>
            <v-icon @click="showEditDialog(phone, i)">create</v-icon>
            <v-icon color="red" @click="deletePhone(phone)" class="pr-8">delete</v-icon>
          </v-card>
        </template>

        <template v-slot:footer>
          <v-card class="d-flex flex-row justify-end">
            <v-card-subtitle class="d-flex flex-row align-center" style="width: 50%">
              <v-card-text>Строк на странице:</v-card-text>
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn
                          text
                          class="ml-2"
                          v-on="on"
                  >
                    {{ itemsPerPage }}
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                          v-for="(number, index) in itemsPerPageArray"
                          :key="index"
                          @click="updateItemsPerPage(number)"
                  >
                    <v-list-item-title>{{ number }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-card-text>Страница {{ page }} из {{numberOfPages}} </v-card-text>
              <v-pagination></v-pagination>
            </v-card-subtitle>
          </v-card>
        </template>
      </v-data-iterator>
    </v-card>

    <v-dialog v-model="addNewDialog" v-if="addNewDialog" width="70%">
      <v-card min-height="500px">
        <v-card-title class="pt-8 pl-12">Добавить новый номер</v-card-title>
        <v-row justify="center" align="center">
          <v-col cols="10" class="d-flex justify-center align-center">
            <v-text-field
                    v-model.number="newPhone"
                    label="Телефон"
                    single-line
                    hide-details
                    class="d-flex align-center">
              <template v-slot:append-outer>
                <v-btn @click="addPhone(newPhone)" fab small class="primary">
                  <v-icon>done</v-icon>
                </v-btn>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10" class="d-flex justify-start">
            <v-btn rounded color="grey lighten-3" @click="closeNewDialog">Назад</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>

    <v-dialog v-model="addEditDialog" v-if="addEditDialog" width="70%">
      <v-card min-height="500px">
        <v-card-title class="pt-8 pl-12">Редактировать номер</v-card-title>
        <v-row justify="center" align="center">
          <v-col cols="10" class="d-flex justify-center align-center">
            <v-text-field
                    v-model="selectedPhone.number"
                    single-line
                    hide-details
                    class="d-flex align-center">
              <template v-slot:append-outer>
                <v-btn @click="editPhone(selectedPhone, oldPhone)" fab small class="primary">
                  <v-icon>done</v-icon>
                </v-btn>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10" class="d-flex justify-start">
            <v-btn rounded color="grey lighten-3" @click="closeEditDialog">Назад</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      search: '',
      newPhone: null,
      addNewDialog: false,
      addEditDialog: false,
      selectedPhone: null,
      oldPhone: null,
      itemsPerPage: 25,
      itemsPerPageArray: [10, 15, 25],
      page: 1,
      sortBy: 'number'
    }
  },
  computed: {
    ...mapGetters(['getPhones']),
    numberOfPages () {
      return Math.ceil(this.getPhones.length / this.itemsPerPage)
    }
  },
  async mounted() {
    this.fetchPhones()
  },
  methods: {
    ...mapActions(['fetchPhones', 'addNewPhone', 'deleteNewPhone', 'editNewPhone']),
    clear() {
      this.search = ''
    },
    addNumber() {
      this.addNewDialog = true
    },
    closeNewDialog() {
      this.addNewDialog = false
      this.newPhone = ''
    },
    showEditDialog(phone, i) {
      this.selectedPhone = phone
      this.oldPhone = {...phone}
      this.selectedPhone.key = i
      this.addEditDialog = true
    },
    closeEditDialog() {
      this.addEditDialog = false
      this.selectedPhone = null
    },
    updateItemsPerPage(num) {
      this.itemsPerPage = num
    },
    addPhone() {
      this.addNewPhone(this.newPhone)
      this.addNewDialog = false
      this.newPhone = ''
    },
    deletePhone(phone) {
      this.deleteNewPhone(phone)
    },
    editPhone(newPhone, oldPhone) {
      this.editNewPhone({newPhone, oldPhone})
      this.addEditDialog = false
      this.selectedPhone = null
      this.oldPhone = null
    }
    },
  components: {

  }
}
</script>
