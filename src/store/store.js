import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
Vue.use(Vuex);

const store = new Vuex.Store(
    {
        state: {
            authenticated: false,
            name: 'Suryanarayan panda',
            items:[],
            compPrice:0,
            total:0
        },
        mutations: {
            setAuthentication(state, status) {
                state.authenticated = status;
            },
            setData(state, newData) {
                state.items = newData;
            },
            addSum(state,value) {
                state.total = parseInt(state.total) + parseInt(value);
            },
            resetSum(state) {
               state.total = 0;
            },
            updateSum(state,value) {
               // state.total = 0;

               //console.log('total state' + state.total);
               //console.log('item price' + value.itmprce);
                //state.total = parseInt(state.total) - parseInt(value.itmprce);

                console.log(value.oldprce);
                state.total = parseInt(state.total) - parseInt(value.oldprce);
            }
        },
        actions: {
            getAllitems(context) {
                axios.get('http://localhost:8000/api/items').then(response => {
                   // this.users = response.data
                   context.commit('setData', response.data);
                 });
            },
            setAmmount(context,quan,price) {
              context.commit('addSum', quan * price);
            }
        },
        getters: {
            getData (state) {
              return state.items
            }
          }
    }
  );

  export default store