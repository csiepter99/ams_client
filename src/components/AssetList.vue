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
        <v-toolbar-title>財產清單</v-toolbar-title>
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
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        @click="editItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:[`item.status`]="{ item }">
      <v-btn v-if="item.status === ''">
        借用
      </v-btn>
      <div v-else>
        {{item.status}}
      </div>
    </template>
  </v-data-table>  
</template>

<script>
  export default {
    data: () => ({
      search: '',
      selected: [],
      headers: [
        {
          text: 'ID', align: 'start', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Location', value: 'location' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      assets: [
        {id: "001", name: "keyboard", location: "1623", status: "Peter" },
        {id: "002", name: "mouse", location: "1421", status: '' },
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