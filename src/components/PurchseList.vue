<template>
  <v-data-table v-model="selected" :headers="headers" :items="purchase" :search="search" mobile-breakpoint="0">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>待購清單</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New purchase
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">New purchase</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field v-model="purchaseInfo.studentId" label="學號" :rules="[rules.required]"></v-text-field>
                    <v-text-field v-model="purchaseInfo.studentName" label="姓名" :rules="[rules.required]"></v-text-field>
                    <v-text-field v-model="purchaseInfo.productName" label="產品名稱" :rules="[rules.required]"></v-text-field>
                    <v-text-field v-model="purchaseInfo.link" label="產品網址連結" :rules="[rules.required]"></v-text-field>
                    <v-text-field v-model="purchaseInfo.price" label="單價" :rules="[rules.required, rules.isNumber, rules.nonZero]"></v-text-field>
                    <v-text-field v-model="purchaseInfo.quantity" label="數量" :rules="[rules.required, rules.isNumber, rules.nonZero]"></v-text-field>
                    <v-text-field v-model="purchaseInfo.totalPrice" label="總價" readonly></v-text-field>
                    <v-textarea v-model="purchaseInfo.notes" label="備註"></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text :disabled="saveDisabled" @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.link`]="{ item }">
      <a target="_blank" :href="item.link">
        {{ item.link }}
      </a>
    </template>
  </v-data-table>
</template>

<script>
import { getAllPurchaseAsset, requestPurchaseAsset } from "@/apis/purchase"

export default {
  data: () => ({
    saveDisabled: true,
    dialog: false,
    search: '',
    selected: [],
    headers: [
      { text: '學號', value: 'studentId' },
      { text: '姓名', value: 'studentName' },
      { text: '產品名稱', value: 'productName' },
      { text: '產品網址連結', value: 'link' },
      { text: '單價', value: 'price' },
      { text: '數量', value: 'quantity' },
      { text: '總價', value: 'totalPrice' },
      { text: '備註', value: 'notes' }
    ],
    purchase: [],
    purchaseInfo: {
      studentId: "",
      studentName: "",
      productName: "",
      link: "",
      price: "",
      quantity: "",
      totalPrice: "",
      notes: ""
    },    
    defaultPurchaseInfo: {
      studentId: "",
      studentName: "",
      productName: "",
      link: "",
      price: "",
      quantity: "",
      totalPrice: "",
      notes: ""
    },
    rules: {
      required: value => !!value || 'Required.',
      nonZero: value => Number(value)!=0 || 'Invalid number, non zero.',
      isNumber: value => {
        const pattern = /^[0-9]*$/
        return pattern.test(value) || 'Invalid number.'
      },
    },
  }),

  watch: {
    dialog(val) {
      val || this.close()
    },
    purchaseInfo: {
      handler: "handlePurchaseInfo",
      deep: true
    },
  },

  created() {
    this.getAllPurchaseAsset()
  },

  methods: {
    getAllPurchaseAsset() {
      getAllPurchaseAsset().then((res) => (
        this.purchase = res.data
      )).catch((err) => console.log(err));
    },

    close() {
      this.dialog = false
      this.saveDisabled = true
      this.$nextTick(() => {
        this.purchaseInfo = Object.assign({}, this.defaultPurchaseInfo)
      })
    },

    save() {
      requestPurchaseAsset(this.purchaseInfo).then(
        this.getAllPurchaseAsset()
      ).catch((err) => console.log(err));
      this.close()
      window.location.reload()
    },

    handlePurchaseInfo() {
      this.checkAllInfoFillIn(),
      this.countTotalPrice()
    },

    checkAllInfoFillIn() {
      if(this.purchaseInfo.price != "" && this.purchaseInfo.quantity != "" && this.purchaseInfo.studentId != "" 
        && this.purchaseInfo.studentName != "" && this.purchaseInfo.productName != "" 
        && this.purchaseInfo.link != "" && this.purchaseInfo.totalPrice != "0"){
        this.saveDisabled = false
      } else {
        this.saveDisabled = true
      }
    },

    countTotalPrice() {
      if(parseInt(this.purchaseInfo.price) >= 0 && parseInt(this.purchaseInfo.quantity) >= 0) {
        this.purchaseInfo.totalPrice = String(parseInt(this.purchaseInfo.price) * parseInt(this.purchaseInfo.quantity));
      } else {
        this.saveDisabled = true
      }
    },
  }
}
</script>

<style>
</style>