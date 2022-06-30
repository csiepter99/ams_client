<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="memberList"
    mobile-breakpoint="0"
    @click:row="viewMemberInfo"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>成員管理</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-dialog
        v-model="memberInfoDialog"
        max-width="500px"
        click:outside="close()"
        scrollable
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
            New Member
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ action }} Member</span>
            <v-spacer />
            <v-icon @click="close()">mdi-close</v-icon>
          </v-card-title>

          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-container>
                <v-col>
                  <v-text-field
                    v-model="editedMemberInfo.studentId"
                    label="學號"
                    :rules="[(v) => !!v || 'Student Id is required']"
                    :readonly="action === 'View'"
                  ></v-text-field>
                  <v-text-field
                    v-model="editedMemberInfo.name"
                    label="姓名"
                    :rules="[(v) => !!v || 'Name is required']"
                    :readonly="action === 'View'"
                  ></v-text-field>
                  <v-list>
                    <v-subheader v-show="action !== 'New'">職位:</v-subheader>
                    <v-list-item v-show="action === 'Edit'">
                      <v-select v-model="selectedRole" :items="roleNameList.filter((e) => {return editedMemberInfo.roles.indexOf(e) == -1})"></v-select>
                    <v-btn @click="addRoleToMember">+</v-btn>
                    </v-list-item>
                    <v-list-item v-for="(item, i) in editedMemberInfo.roles" :key="i">
                      <v-list-item-content>
                        <v-list-item-title v-text="item"></v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-icon v-show="action === 'Edit' && item !== '研究生'">
                        <v-icon @click="demoteMember(item)">mdi-delete</v-icon>
                      </v-list-item-icon>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-container>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="red"
              text
              v-show="action === 'View'"
              @click="deleteMember"
            >
              刪除
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              v-show="action === 'Edit'"
              @click="action = 'View'"
            >
              取消
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              v-show="action === 'View'"
              @click="action = 'Edit'"
            >
              編輯
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="save"
              v-show="action === 'Edit' || action === 'New'"
              :disabled="!valid"
            >
              儲存
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </v-data-table>
</template>

<script>
import { getAllMembers, addNewMember, deleteAsset, addRoleToMember, editMember, demoteMember } from "../apis/member";
import { role_to_zhTW, zhTW_to_role } from "../RoleMapping.ts";

export default {
  data: () => ({
    memberInfoDialog: false,
    action: "New",
    valid: false,
    selectedRole: "",
    selected: [],
    editedIndex: -1,
    roleNameList: [],
    headers: [
      { text: "學號", value: "studentId" },
      { text: "姓名", value: "name" },
      { text: "職位", value: "roles" },
    ],
    memberList: [],
    editedMemberInfo: {
      studentId: "",
      name: "",
      roles: []
    },
    defaultMemberInfo: {
      studentId: "",
      name: "",
      roles: []
    },
  }),

  watch: {
    memberInfoDialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
    this.roleNameList = Object.keys(zhTW_to_role);
  },

  methods: {
    initialize() {
      getAllMembers()
        .then((res) => {
          this.memberList = [];
          res.data.forEach((member) => {
            let roles = [];
            member.roles.forEach((element) => {
              roles.push(role_to_zhTW[element.name]);
            });
            this.memberList.push({
              id: member.id,
              studentId: member.studentId,
              name: member.name,
              roles: roles,
            });
          });
        })
        .catch((err) => console.log(err));
    },

    viewMemberInfo(member) {
      this.action = "View";
      this.editedIndex = this.memberList.indexOf(member);
      this.editedMemberInfo = Object.assign({}, member);
      this.memberInfoDialog = true;
    },

    save() {
      if (this.editedIndex > -1) {
        this.editedMemberInfo.roles.forEach((role, i) => {
          this.editedMemberInfo.roles[i] = zhTW_to_role[role];
        })
        editMember(this.editedMemberInfo)
          .then(() => {
            this.initialize()
          })
          .catch((err) => console.log(err));
        this.close();
      } else {
        addNewMember(this.editedMemberInfo)
          .then(() => {
            this.initialize();
          })
          .catch((err) => console.log(err));
        this.close();
      }
    },

    close() {
      this.$refs.form.reset();
      this.memberInfoDialog = false;
      this.action = "New";
      this.$nextTick(() => {
        this.editedMemberInfo = Object.assign({}, this.defaultMemberInfo);
        this.editedIndex = -1;
      });
    },

    deleteMember() {
      deleteAsset(this.memberList[this.editedIndex].id)
        .then(() => {
          this.initialize();
        })
        .catch((err) => console.log(err));
      this.close();
    },

    addRoleToMember() {
      addRoleToMember(this.memberList[this.editedIndex].studentId, zhTW_to_role[this.selectedRole])
        .then(() => {
          this.initialize();
        })
        .catch((err) => console.log(err));
      this.selectedRole="";
      this.close();
    },

    demoteMember(roleName) {
      demoteMember(this.memberList[this.editedIndex].id, zhTW_to_role[roleName])
       .then(() => {
         this.initialize();
       })
       .catch((err) => console.log(err));
      this.close();
    }
  },
};
</script>

<style>
</style>