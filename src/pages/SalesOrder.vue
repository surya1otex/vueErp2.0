<template>
 <div style="margin-left: 30px;">
    <h1 class="md-title">New Sales Order</h1>
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
      <md-card-content>
          <!-- <div class="md-layout md-gutter"> -->
            <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('cus_name')">
                <label for="first-name">Customer Name</label>
                <md-input name="first-name" id="first-name" v-model="form.cus_name" autocomplete="given-name" />
                <span class="md-error" v-if="!$v.form.cus_name.required">Customer name is required</span>
                <span class="md-error" v-else-if="!$v.form.cus_name.minlength">Invalid first name</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('ord_date')">
                <label for="last-name">Sales Order Date</label>
                <md-input name="last-name" id="last-name" v-model="form.ord_date" autocomplete="family-name" />
                <span class="md-error" v-if="!$v.form.ord_date.required">Order Date is required</span>
              </md-field>
            </div>
          <!-- </div> -->

          <!-- <div class="md-layout md-gutter"> -->
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="last-name">Shipment Date</label>
                <md-input name="last-name" id="last-name" autocomplete="family-name" />
                <span class="md-error">The last name is required</span>
                <span class="md-error">Invalid last name</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="age">Customer Phone</label>
                <md-input  id="age" name="age" autocomplete="age" />
                <span class="md-error">The age is required</span>
                <span class="md-error">Invalid age</span>
              </md-field>
            </div>
          <!-- </div> -->

        </md-card-content>

        <!-- <md-progress-bar md-mode="indeterminate" /> -->
        <table class="table">
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Total</th>
          </tr>
          <ItemTable v-for="item in items" v-bind:key="item" :ItemId="Number(item)"></ItemTable>
        </table>
        
        <md-card-actions>
          <h3 style="margin-right: 350px;">Total Ammount  : {{ this.$store.state.total }}</h3>
           <md-button type="submit" class="md-primary" :disabled="sending">Create user</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar>The user  was saved with success!</md-snackbar>
    </form>
 </div>
</template>
<script>
  import { validationMixin } from 'vuelidate'
  import {
    required,
    email,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators'
import ItemTable from './ItemTable.vue';
export default {
mixins: [validationMixin],
components: {
        ItemTable  
  },
    data() {
         return {
             items: this.$route.query.salesitems.split(" "),
             form: {
               cus_name:'',
               ord_date:''
             },
             sending: false
         };
        },
        validations: {
      form: {
        cus_name: {
          required,
          minLength: minLength(3)
        },
        ord_date: {
          required
        }
      }
        },
        methods: {
          getValidationClass (fieldName) {
            const field = this.$v.form[fieldName]

              if (field) {
                return {
                 'md-invalid': field.$invalid && field.$dirty
               }
             }
        },
          validateUser () {
            this.$v.$touch()

             if (!this.$v.$invalid) {
              alert('test sucess');
                //this.saveUser()
              }
          }
        },
    created() {
      // if(this.$store.state.total != '0') {
      //    this.$store.state.total = '0';
      // }
    }

}
</script>

