<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="assets"
    :search="search"
    mobile-breakpoint="0"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>待購清單</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              +
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">test</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="assets.id"
                      label="Dessert name"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
              >
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
      search: '',
      selected: [],
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
      assets: [
        { studentId: "", applicant: "", productName: "", link: "", price: "", amount: "",  totalPrice: "" , comment: "" },
        { studentId: "001", applicant: "peter", productName: "computer", link: "https://123", price: "10000", amount: "2",  totalPrice: "0000" , comment: "none" },
      ]
    }),
    methods: {
      editItem(item){
        console.log(item);
        return null;
      }
    }
  }
</script>

<style>
</style>