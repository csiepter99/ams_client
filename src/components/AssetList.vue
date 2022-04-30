<template>
  <v-data-table v-model="selected" :headers="headers" :items="assets" :search="search" mobile-breakpoint="0">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>財產清單</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="scannerDialog">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-qrcode-scan</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <v-btn text depressed color="primary" @click="changeScannerType">{{ scannerType }}</v-btn>
              <v-spacer />
              <v-btn icon @click="closeScanner">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <QrcodeStream v-if="scannerType === 'from camera'" @detect="onDetect" @init="onInit" />
            <QrcodeCapture v-if="scannerType === 'from file'" @detect="onDetect" />
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialog" max-width="500px" click:outside="close()">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Asset
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-form ref="form" v-model="valid">
                <v-container>
                  <v-row>
                    <v-col>
                      <v-text-field v-model="editedAssetInfo.assetId" label="財產編號"
                        :rules="[v => !!v || 'Asset Id is required']"></v-text-field>
                      <v-text-field v-model="editedAssetInfo.name" label="名稱"
                        :rules="[v => !!v || 'name Id is required']"></v-text-field>
                      <v-text-field v-model="editedAssetInfo.brand" label="廠牌型別"></v-text-field>
                      <v-text-field v-model="editedAssetInfo.type" label="類別"></v-text-field>
                      <v-text-field v-model="editedAssetInfo.location" label="地點"
                        :rules="[v => !!v || 'location Id is required']"></v-text-field>
                      <v-text-field v-model="editedAssetInfo.photoURL" label="照片網址"></v-text-field>
                      <v-textarea v-model="editedAssetInfo.notes" label="備註"></v-textarea>
                      <v-checkbox v-model="editedAssetInfo.isInventoried" label="盤點" :true-value="1" :false-value="0">
                      </v-checkbox>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save" :disabled="!valid"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this asset?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteAssetConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogAssetNotExist" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">This asset is not exist, add this asset?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeAssetNotExist">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="assetNotExistConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon @click="editAsset(item)">mdi-pencil</v-icon>
      <v-icon @click="deleteAsset(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:[`item.borrow`]="{ item }">
      <v-btn v-if="item.borrow === '' || item.borrow === undefined">借用</v-btn>
      <div v-else>{{ item.borrow }}</div>
    </template>
    <template v-slot:[`item.isInventoried`]="{ item }">
      <v-checkbox v-model="item.isInventoried" disabled :true-value="1" :false-value="0"></v-checkbox>
    </template>
  </v-data-table>
</template>

<script>
import { getAllAsset, addNewAsset, inventoryAsset, deleteAsset } from "@/apis/asset"
import { QrcodeStream, QrcodeCapture } from 'vue-qrcode-reader'

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    dialogAssetNotExist: false,
    search: "",
    scannerDialog: false,
    scannerType: "from camera",
    valid: false,
    selected: [],
    headers: [
      {
        text: "asset ID",
        align: "start",
        value: "assetId",
      },
      { text: "Name", value: "name" },
      { text: "Location", value: "location" },
      { text: "borrow", value: "borrow" },
      { text: "type", value: "type" },
      { text: "brand", value: "brand" },
      { text: "photoURL", value: "photoURL" },
      { text: "notes", value: "notes" },
      { text: "isInventoried", value: "isInventoried" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    assets: [],
    editedIndex: -1,
    editedAssetInfo: {
      id: undefined,
      assetId: "",
      name: "",
      location: "",
      type: "",
      brand: "",
      photoURL: "",
      notes: "",
      isInventoried: 0,
    },
    defaultAssetInfo: {
      id: undefined,
      assetId: "",
      name: "",
      location: "",
      type: "",
      brand: "",
      photoURL: "",
      notes: "",
      isInventoried: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Asset" : "Edit Asset";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    dialogAssetNotExist(val) {
      val || this.closeAssetNotExist();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      getAllAsset().then((res) => (this.assets = res.data)).catch((err) => console.log(err));
    },

    editAsset(asset) {
      this.editedIndex = this.assets.indexOf(asset);
      this.editedAssetInfo = Object.assign({}, asset);
      this.dialog = true;
    },

    deleteAsset(asset) {
      this.editedIndex = this.assets.indexOf(asset);
      this.editedAssetInfo = Object.assign({}, asset);
      this.dialogDelete = true;
    },

    deleteAssetConfirm() {
      deleteAsset(this.assets[this.editedIndex].id).then(() => {
        this.initialize()
      })
        .catch((err) => console.log(err));
      // this.assets.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    assetNotExistConfirm() {
      this.closeAssetNotExist()
      console.log(this.editedAssetInfo.assetId)
      this.dialog = true
    },

    close() {
      this.$refs.form.reset()
      this.dialog = false;
      this.$nextTick(() => {
        this.editedAssetInfo = Object.assign({}, this.defaultAssetInfo);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedAssetInfo = Object.assign({}, this.defaultAssetInfo);
        this.editedIndex = -1;
      });
    },

    closeAssetNotExist() {
      this.dialogAssetNotExist = false;
    },

    save() {
      if (this.editedIndex > -1) {
        inventoryAsset(this.editedAssetInfo)
          .then(() => {
            this.initialize()
          })
          .catch((err) => console.log(err));
        this.close();
      } else {
        addNewAsset(this.editedAssetInfo)
          .then(() => {
            this.initialize()
          })
          .catch((err) => console.log(err));
        this.close();
      }
    },

    changeScannerType() {
      if (this.scannerType === "from camera") {
        this.scannerType = "from file"
      } else {
        this.scannerType = "from camera"
      }
    },
    closeScanner() {
      this.scannerDialog = false
    },

    async onDetect(promise) {
      try {
        const {
          content,      // decoded String
        } = await promise
        if (content === null) {
          console.log("code not find")
        } else {
          let asset = this.assets.find(asset => asset.assetId === content)
          if (asset) {
            this.editAsset(asset)
          } else {
            this.editedAssetInfo.assetId = content
            this.dialogAssetNotExist = true
          }
          this.closeScanner()
        }
      } catch (error) {
        console.log("error")
      }
    },

    async onInit(promise) {
      try {
        const { capabilities } = await promise

        console.log(capabilities)
        // successfully initialized
      } catch (error) {
        console.log(error.name)
      } finally {
        // hide loading indicator
      }
    },
  },


  components: {
    QrcodeStream,
    QrcodeCapture
  }
};
</script>

<style>
</style>