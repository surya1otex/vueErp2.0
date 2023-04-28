<template>
    <div>
        <md-icon class="md-size-2x" @click.native="closepanelitem()">close</md-icon>
        <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-25">
    <md-table v-model="users" md-card>
      <md-table-toolbar>
        <h1 class="md-title">All Items</h1>
         
        
      </md-table-toolbar>
      
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        
        <md-checkbox v-model="itemids" v-bind:value="item.id"></md-checkbox>
        <md-table-cell>{{ item.name }}</md-table-cell>
      </md-table-row>
    </md-table>
    <md-button class="md-raised md-primary" v-if="itemids.length >= '1'" @click="salesorder()">New Sales Order</md-button>
</div>
<div class="md-layout-item md-card">
    <h3><b>Item - {{ item.name }}</b></h3>
    <h4>Price - {{ item.price }}</h4>
    <h4>In Stock - {{ item.quantity }}</h4>
    <h4>Description - {{ item.description }}</h4>
</div>
</div>
    </div>
</template>

<script>
import axios from 'axios';
//import { response } from 'express';
import routes from '../routes/routes';
export default {
  name: 'RegularCheckboxes',
   props: {
    itemID: Number
   },
   data: () => ({
     itemids: [],
     users:[],
     price:'',
     instock: '',
     description: 'Test Description',
     test: false 
   }),
   created() {
    this.users = this.$store.state.items;
     //this.loadItemdata();
    // this.$store.dispatch('getAllitems');

    //  axios.get('http://localhost:8000/api/items').then(response => {

    //   console.log(response.data);
    //     this.$store.commit("setData", response.data);
    //  });

    // console.log('This is the Test' + this.users);

   },
    computed: {
      item() {
         return this.$store.state.items.find(item => item.id === this.itemID)
      }
      //this.users = this.$store.getters.getData;
 
    },
   async mounted() {
    // console.log(checkedNames);
    //this.$store.dispatch('getAllitems');

    // this.users = this.$store.getters.getData;
    console.log(this.users);
    // console.log('Item from store' + this.$store.state.items);
    //console.log(response);

  },
  // computed: {
  //   itemsFromStore() {
  //     return this.users = this.$store.state.items;
  //   },
   methods: {
    getItems() {
        //axios.get('http://localhost:8000/api/items').then(response => {this.users = response.data });


    },
    showalert(e) {

      if (e.target.checked) {
        alert('checkbox checked');
    }
       // 
    },
     closepanelitem() {
       // alert(this.itemID);
        this.$emit('closepanel', true);
     },
     salesorder() {
      //alert('ready to go');
        //router.push({ path: '/dashboard' });
        this.$router.replace({ name: "salesOrder", query: { salesitems: this.itemids.toString().replaceAll(",", " ") } });
        //router.push({ path: 'register', query: { plan: 'private' } })
     },
     loadItemdata() {



      // old method with calling api individually
        // axios
        // .get("http://localhost:8000/api/item/details", {
        //   params: {
        //     itemID: this.itemID,
        //   },
        // })
        // .then(
        //   function (response) {
        //    // this.blocks = response.data;
        //    console.log(response);
        //   this.item = response.data.name;
        //   this.price = response.data.price;
        //   this.instock = response.data.quantity;
        //   this.description = response.data.description;
        //   }.bind(this)
        // );
     }
   }
}
</script>


<style>
.md-size-2x {
    cursor: pointer;
}
.md-primary {
  background-color: #2764b0 !important;
}
</style>