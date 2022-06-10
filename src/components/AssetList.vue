<template>
  <v-data-table v-model="selected" :headers="headers" :items="assets" :search="search" mobile-breakpoint="0" @click:row="viewAsset">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>財產清單</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field v-model="search" class = "md-1" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        <v-combobox
          v-model="selectedField"
          :items="headers"
          :search-input.sync="cbSearch"
          label="Select the field that you want to show"
          class = "mt-6 ml-6"
          auto-select-first
          multiple
          hide-selected
          small-chips
          @change="setFieldAlign()"
        >
          <!-- setting of selected field -->
          <template v-slot:selection="{ attrs, item, parent, selected }">
            <v-chip
              v-if="item === Object(item)"
              v-bind="attrs"
              color='amber lighten-4'
              :input-value="selected"
              label
              small
            >
              <span class="pr-2">
                {{ item.text }}
              </span>
              <v-icon
                small
                @click="parent.selectItem(item)"
              >
                $delete
              </v-icon>
            </v-chip>
          </template>
          <!-- setting of optional field in drop-down list -->
          <template v-slot:item="{ item }">
            <v-chip
              color='amber lighten-4'
              label
              small
            >
              {{ item.text + (item.disabled ? ' : default' : '')}}
            </v-chip>
          </template>
        </v-combobox>
        <v-spacer></v-spacer>
        <v-dialog v-model="scannerDialog">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-qrcode-scan</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <v-spacer />
              <v-btn icon @click="closeScanner">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <qrcode-scanner
              :qrbox="250" 
              :fps="10" 
              :scan="scannerDialog"
              style="width: auto;"
              @result="onScan"
            />
          </v-card>
        </v-dialog>
        <v-dialog v-model="assetInfoDialog" max-width="500px" click:outside="close()" scrollable>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-show="role.includes('ROLE_GENERAL_AFFAIRS') || role.includes('ROLE_FINANCE_AFFAIRS')" color="primary" dark class="mb-2 ml-2" @click="getExportCSV">
              Export
            </v-btn>
            <v-btn v-show="role.includes('ROLE_GENERAL_AFFAIRS')" color="primary" dark class="mb-2" v-bind="attrs" v-on="on" >
              New Asset
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ action }} Asset</span>
              <v-spacer/>
              <v-icon @click="close()">mdi-close</v-icon>
            </v-card-title>

            <v-card-text>
              <v-form ref="form" v-model="valid">
                <v-container>
                  <v-chip v-if="assetBorrowInfo.time === 'None'" v-show="action === 'View'"  color="green" outlined>您 可 以 借 用 此 財 產</v-chip>
                  <v-chip v-else v-show="action === 'View'" color="red" outlined>此 財 產 正 被 借 用 中</v-chip>
                  <v-col>
                    <v-file-input @change="uploadImage" accept="image/*" v-model="image" label="財產圖片"
                    v-show="action === 'New' || action === 'Edit'"></v-file-input>
                    <img v-bind:src="''+editedAssetInfo.photo" width="100%" v-show="editedAssetInfo.photo!=''">
                    
                    <v-text-field v-model="editedAssetInfo.assetNumber" label="財產編號"
                      :rules="[v => !!v || 'Asset number is required']" :readonly="action === 'View'"></v-text-field>
                    <v-text-field v-model="editedAssetInfo.name" label="名稱"
                      :rules="[v => !!v || 'name Id is required']" :readonly="action === 'View'"></v-text-field>
                    <v-text-field v-model="editedAssetInfo.brand" label="廠牌型別" :readonly="action === 'View'"></v-text-field>
                    <v-text-field v-model="editedAssetInfo.type" label="類別" :readonly="action === 'View'"></v-text-field>
                    <v-text-field v-model="editedAssetInfo.location" label="地點"
                      :rules="[v => !!v || 'location Id is required']" :readonly="action === 'View'"></v-text-field>
                    <v-text-field v-model="editedAssetInfo.inventoryDate" label="盤點日期" v-show="action === 'View'" readonly></v-text-field>
                    <v-textarea rows="1" auto-grow v-model="editedAssetInfo.notes" label="備註" :readonly="action === 'View'"></v-textarea>
                  </v-col>
                  <v-col v-show="assetBorrowInfo.time !='None' && (action === 'View' || action ==='Edit')">
                    <v-text-field filled v-model="assetBorrowInfo.borrowerName" label="借用人" readonly></v-text-field>
                    <v-text-field filled v-model="assetBorrowInfo.time" label="借用時間" readonly></v-text-field>
                    <v-text-field filled v-model="assetBorrowInfo.purpose" label="借用目的" readonly></v-text-field>
                  </v-col>
                </v-container>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-btn color="red" text v-show="role.includes('ROLE_GENERAL_AFFAIRS') && (action === 'View')" @click="deleteAsset"> 刪除 </v-btn>
              <v-btn color="blue darken-1" text v-show="role.includes('ROLE_GENERAL_AFFAIRS') && (action === 'View')" @click="inventoryAsset"> 盤點 </v-btn>
              <v-btn v-if="assetBorrowInfo.time === 'None'" color="blue darken-1" text v-show="action === 'View'" @click="borrowAsset"> 借用財產 </v-btn>
              <v-btn v-else color="blue darken-1" text v-show="action === 'View'" @click="returnAsset"> 歸還財產 </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text v-show="action === 'Edit'" @click="action = 'View'"> 取消 </v-btn>
              <v-btn color="blue darken-1" text v-show="role.includes('ROLE_GENERAL_AFFAIRS') && (action === 'View')" @click="action = 'Edit'"> 編輯 </v-btn>
              <v-btn color="blue darken-1" text @click="save" v-show="action === 'Edit' || action === 'New'" :disabled="!valid"> 儲存 </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">您確定要刪除此財產嗎?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteAssetConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogReturn" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">您確定要歸還此財產嗎?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeReturn">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="returnAssetConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogBorrow" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">填寫借用資訊</v-card-title>

            <v-card-text>
              <v-form ref="form" v-model="valid">
                <v-container>
                  <v-col>
                    <v-text-field filled v-model="assetBorrowInfo.borrowerName" label="借用人" readonly></v-text-field>
                    <v-text-field v-model="assetBorrowInfo.purpose" label="借用目的"
                      :rules="[v => !!v || 'borrowerPurpose is required']"></v-text-field>                    
                  </v-col>
                </v-container>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeBorrow">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="borrowAssetConfirm" :disabled="!valid">OK</v-btn>
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
    <template v-slot:[`item.borrowStatus`]="{ item }">
      <v-chip v-if="item.borrowInfo.borrowerName == 'None'" color="green" outlined>可 借 用</v-chip>
      <v-chip v-else color="red" outlined>借 用 中</v-chip>
    </template>
  </v-data-table>
</template>

<script>
import { getAllAssets, addNewAsset, editAsset, inventoryAsset, deleteAsset, borrowAsset, returnAsset} from "@/apis/asset"
import { getExport } from "@/apis/export"
import FileSaver from "file-saver";
import store from '@/store';

export default {
  data: () => ({
    role: store.state.auth.roles,
    currentStudentName: store.state.auth.name,
    action: "New",
    assetInfoDialog: false,
    dialogDelete: false,
    dialogBorrow: false,
    dialogReturn: false,
    dialogAssetNotExist: false,
    search: "",
    image:null,
    scannerDialog: false,
    scannerType: "from camera",
    valid: false,
    selected: [],
    headers: [
      { text: "財產編號", align: "center", value: "assetNumber" },
      { text: "名稱", value: "name" },
      { text: "地點", value: "location" },
      { text: "借用狀態", value: "borrowStatus" },
      { text: "類別", value: "type" },
      { text: "廠牌型別", value: "brand" },
      { text: "備註", value: "notes" },
      { text: "盤點日期", value: "inventoryDate" },
    ],
    assets: [],
    editedIndex: -1,
    editedAssetInfo: {
      id: undefined,
      assetNumber: "",
      name: "",
      location: "",
      type: "",
      brand: "",
      photo: "",
      notes: "",
      inventoryDate: "",
    },
    defaultAssetInfo: {
      id: undefined,
      assetNumber: "",
      name: "",
      location: "",
      type: "",
      brand: "",
      photo: "",
      notes: "",
      inventoryDate: "",
    },
    assetBorrowInfo: {
      id: undefined,
      borrowerName: "",
      purpose:"",
      time:"",
    },
    selectedField:[],
    cbSearch: '',
  }),

  watch: {
    assetInfoDialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    dialogBorrow(val){
      val || this.closeBorrow();
    },
    dialogReturn(val){
      val || this.closeReturn();
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
      getAllAssets().then((res) => this.assets = res.data).catch((err) => console.log(err));
    },

    viewAsset(asset) {
      this.action = "View";
      this.editedIndex = this.assets.indexOf(asset);
      this.editedAssetInfo = Object.assign({}, asset);
      this.assetInfoDialog = true;
      this.assetBorrowInfo.borrowerName = asset.borrowInfo.borrowerName
      this.assetBorrowInfo.purpose = asset.borrowInfo.purpose;
      this.assetBorrowInfo.time = asset.borrowInfo.time;
    },

    cancelEdit() {
      this.action = "View";
    },

    inventoryAsset() {
      let date = new Date();
      inventoryAsset(this.editedAssetInfo.id, date.toLocaleDateString()).then(() => {
        this.assetInfoDialog = false;
        this.initialize();
      }).catch((err) => console.log(err));
    },

    deleteAsset() {
      this.dialogDelete = true;
    },

    borrowAsset() {
      this.dialogBorrow = true;
      this.assetBorrowInfo.borrowerName = this.currentStudentName
      this.assetBorrowInfo.purpose = "";
    },

    returnAsset() {
      this.dialogReturn = true;
    },

    borrowAssetConfirm() {
      this.dialogBorrow = false;
      let date = new Date();
      this.assetBorrowInfo.time = date.toLocaleDateString();
      borrowAsset(this.assets[this.editedIndex].id, this.assetBorrowInfo).then(() => {
        this.initialize();
      })
        .catch((err) => console.log(err));
      this.closeBorrow();
      this.close();
    },

    returnAssetConfirm() {
      this.dialogReturn = false;
      
      returnAsset(this.assets[this.editedIndex].id).then(() => {
        this.initialize();
        this.assetBorrowInfo.borrowerName = "None";
        this.assetBorrowInfo.time = "None";
        this.assetBorrowInfo.purpose = "None";
      })
        .catch((err) => console.log(err));
      this.closeReturn();
    },

    deleteAssetConfirm() {
      this.assetInfoDialog = false;
      deleteAsset(this.assets[this.editedIndex].id).then(() => {
        this.initialize()
      })
        .catch((err) => console.log(err));
      this.closeDelete();
    },

    assetNotExistConfirm() {
      this.closeAssetNotExist()
      this.assetInfoDialog = true
    },

    close() {
      this.$refs.form.reset()
      this.assetInfoDialog = false;
      this.action = "New";
      this.$nextTick(() => {
        this.editedAssetInfo = Object.assign({}, this.defaultAssetInfo);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
    },

    closeBorrow() {
      this.$refs.form.reset();
      this.dialogBorrow = false;
    },

    closeReturn() {
      this.dialogReturn = false;
    },

    closeAssetNotExist() {
      this.dialogAssetNotExist = false;
    },

    save() {
      if (this.editedIndex > -1) {
        editAsset(this.editedAssetInfo)
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

    onScan (decodedText) {
      let asset = this.assets.find(asset => asset.assetNumber === decodedText)
        if (asset) {
          this.viewAsset(asset)
        } else {
          this.editedAssetInfo.assetNumber = decodedText
          this.dialogAssetNotExist = true
        }
        this.closeScanner()
    },

    getExportCSV() {
      var filterInfo = [];
      if(this.selectedField.length != 0) {
        this.selectedField.forEach((item) => {
          filterInfo.push(item.value);
        });
      } else {
        this.headers.forEach((item) => {
          filterInfo.push(item.value);
        });
      }

      getExport(filterInfo).then(
        (res)=>{
          //exportContent防止中文亂碼
          var exportContent = "\uFEFF";
          var blob = new Blob([exportContent+res.data], {type: "text/csv;charset=UTF-8"});
          FileSaver.saveAs(blob, 'Asset.csv');
        }
      ).catch((err) => console.log(err));
    },

    setFieldAlign() {
      this.cbSearch='';
      if(this.selectedField.length != 0) {
        this.headers.forEach((item) => {
          if(this.selectedField.find((field)=> field.value == item.value))
            item.align = 'start';
          else
            item.align = ' d-none';
        });
      } else {
        this.headers.forEach((item) => {
          item.align = 'start';
        });
      }
    },
    uploadImage(){
      const file = this.image
      if(!file) this.editedAssetInfo.photo = ""
      else{
        const reader = new FileReader()
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          // console.log(reader.result);
          this.editedAssetInfo.photo = reader.result;
        }
      }
    }
  },
};
</script>

<style>
</style>