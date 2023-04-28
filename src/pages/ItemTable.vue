<template>
 
    <tr>
        <td>{{ item.name }}</td>
        <td><md-field>
        <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="saleinputs.quantity" @input="handleInput" />
        <input type="hidden" v-model="saleinputs.hiddenValue" />
        </md-field><span><i>In Stock <b>{{ item.quantity }}</b></i></span></td>
        <td>{{ item.price }}</td>
        <td>{{ saleinputs.hiddenValue }}</td>
        <td>{{ item.price * saleinputs.quantity }}</td>
    </tr>
 
</template>

<script>
import axios from 'axios';
import store from '../store/store';
const LOCAL_STORAGE_KEY = 'my-app-key';
export default {
    props: {
        ItemId: Number
    },
    data() {
      return {
         saleinputs: {
            quantity: 1,
            hiddenValue: 0,
            itmoldquan:0
         }
      }
    },
    computed: {
        item() {
          let storedItem = localStorage.getItem('item_' + this.ItemId);
          if (storedItem) {
            return JSON.parse(storedItem);
           } else {
            let item = this.$store.state.items.find(item => item.id === this.ItemId);
            localStorage.setItem('item_' + this.ItemId, JSON.stringify(item));
             return item;
          }
       }
    },
    mounted() {
      
       localStorage.setItem(LOCAL_STORAGE_KEY, this.item.price);
       const price = localStorage.getItem(LOCAL_STORAGE_KEY);
       if (price !== null) {
         this.item.price = price;
        }
       this.saleinputs.hiddenValue = this.item.price;
       store.commit('addSum', this.item.price);
       //console.log('hidden input is' + this.saleinputs.hiddenValue);
    },
    methods: {
     handleInput() {
      console.log('handleInput method called');

      // this.$nextTick(() => {
      //   this.$watch('saleinputs.quantity', (newValue, oldValue) => {
      //     console.log(`Counter changed from ${oldValue} to ${newValue}`);
      //     console.log('Item quan to cal' + oldValue);
      //   })
      // })

      this.$watch('saleinputs.quantity', (newValue, oldValue) => {
        console.log(`saleinputs.quantity changed from ${oldValue} to ${newValue}`);
      });

      //store.state.compPrice = this.item.price * this.saleinputs.quantity;


      // if(store.state.compPrice < this.item.price * this.saleinputs.quantity) {

      //    alert('it works');
      //    let oldprce = this.item.price * this.saleinputs.quantity - store.state.compPrice;
      // }
      
      //this.saleinputs.hiddenValue = this.saleinputs.hiddenValue;
        //let oldprce = this.item.price * (this.saleinputs.quantity - 1);
        //this.saleinputs.hiddenValue = this.item.price * this.saleinputs.quantity;
        //console.log('Item quan to cal' + oldValue);
      //   let oldtotal = this.item.price * this.saleinputs.itmoldquan;
      //   let newtotal = this.item.price * this.saleinputs.quantity;

      //   if(parseInt(totalprc) > parseInt(this.saleinputs.hiddenValue)) {
      //       this.saleinputs.hiddenValue = this.saleinputs.hiddenValue;
      //   }
        //let nwprice = this.item.price * this.saleinputs.quantity;
  
        //let diff =this.hiddenValue - nwprice;

        
        //alert(oldtotal);
      // store.commit('updateSum', {itmtotprce:newtotal, oldprce: oldtotal});


     }

    }
  }
</script>

<style>
 .md-card .table {
    width: 100%;
 }
 tr {
    text-align: center;
 }
 tr td {
  padding: 15px;
 }
</style>