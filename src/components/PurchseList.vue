<template>
  <v-data-table v-model="selected" :headers="headers" :items="purchse" :search="search" mobile-breakpoint="0">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>待購清單</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New purchse
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">New Purchse</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field v-model="editedPurchaseInfo.studentId" label="學號"></v-text-field>
                    <v-text-field v-model="editedPurchaseInfo.applicant" label="姓名"></v-text-field>
                    <v-text-field v-model="editedPurchaseInfo.productName" label="產品名稱"></v-text-field>
                    <v-text-field v-model="editedPurchaseInfo.link" label="產品網址連結"></v-text-field>
                    <v-text-field v-model="editedPurchaseInfo.price" label="單價"></v-text-field>
                    <v-text-field v-model="editedPurchaseInfo.amount" label="數量"></v-text-field>
                    <v-text-field v-model="editedPurchaseInfo.totalPrice" label="總價"></v-text-field>
                    <v-textarea v-model="editedPurchaseInfo.comment" label="備註"></v-textarea>

                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    search: '',
    selected: [],
    editedIndex: -1,
    headers: [
      { text: '學號', value: 'studentId' },
      { text: '姓名', value: 'applicant' },
      { text: '產品名稱', value: 'productName' },
      { text: '產品網址連結', value: 'link' },
      { text: '單價', value: 'price' },
      { text: '數量', value: 'amount' },
      { text: '總價', value: 'totalPrice' },
      { text: '備註', value: 'comment' }
    ],
    purchse: [],
    editedPurchaseInfo: {
      studentId: "",
      applicant: "",
      productName: "",
      link: "",
      price: "",
      amount: "",
      totalPrice: "",
      comment: ""
    },    
    defaultPurchaseInfo: {
      studentId: "",
      applicant: "",
      productName: "",
      link: "",
      price: "",
      amount: "",
      totalPrice: "",
      comment: ""
    },
  }),

  watch: {
    dialog(val) {
      val || this.close()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.purchse = [
        { studentId: "01", applicant: "", productName: "", link: "", price: "", amount: "", totalPrice: "", comment: "" },
        { studentId: "001", applicant: "peter", productName: "computer", link: "https://123", price: "10000", amount: "2", totalPrice: "0000", comment: "none" },
      ]
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedPurchaseInfo = Object.assign({}, this.defaultPurchaseInfo)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.purchse[this.editedIndex], this.editedPurchaseInfo)
      } else {
        this.purchse.push(this.editedPurchaseInfo)
      }
      this.close()
    },
  }
}
</script>

<style>
</style>