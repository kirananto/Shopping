<template>
  <div class="hello ">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#"> <img src="/static/shopping.svg" class="img-logo" alt=""></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">ONESTOP SHOPPING <span class="sr-only">(current)</span></a>
      </li>
      <li>
      <form class="form-inline">
        <input class="form-control mr-sm-2 search" v-model="searchtext" type="search" placeholder="Search" aria-label="Search">
      </form>
      </li>
    </ul>
    <div class="nav-item">
      <span v-on:click="viewCart" class="nav-link"><i class="fas fa-shopping-cart"></i></span>
    </div>
    <div class="nav-item">
      <a href="#" class="nav-link"><img :src="currentUser.photoURL" class="user-img" alt=""></a>
    </div>
  </div>
</nav>
<div class="container-fluid">
  <div class="row">
    <div class=" filters col-md-3">
      <div class="filter card container">
        <h2 class="h-filter">FILTERS</h2>
        <div class="row " style="margin-top:2rem;">
          <div class="col">
            <strong>SORT BY :</strong>
          </div>
          <div class="col">
          <button @click="sort('price', 'asc')" class="btn btn-primary">PRICE ASC</button>
          <button @click="sort('price', 'desc')" class="btn btn-primary">PRICE DESC</button>
          <button @click="sort('rating', 'asc')" class="btn btn-primary">RATING ASC</button>
          <button @click="sort('rating', 'desc')" class="btn btn-primary">RATING DESC</button>
          </div>
        </div><div class="row" style="margin-top:2rem;">
          <div class="col">
          <strong>TYPE</strong>
          </div><div class="col">
          <button @click="typ('car')" class="btn btn-primary">CAR</button>
          <button @click="typ('phone')" class="btn btn-primary">PHONE</button>
        </div>
        </div>
      </div>
    </div>
    <div class="products col-md-9 container">
      <div class="row" v-if="products.length >0">
        <div class="card product" v-for="(prod,k) in products" :key="k" style="width: 18rem;">
          <img class="card-img-top" :src="prod.photoURL" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">{{prod.title}}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <span><strong>PRICE : {{prod.price}}</strong></span>
            <a href="#" class="btn btn-primary" @click="addToCart(prod)">ADD TO CART</a>
          </div>
        </div>

      </div>
      <div class="row" v-else>
        <div class="card col-md-11" style="min-height: 20rem;">
          <h2 style="font-weight: 900; margin-top: 10rem;">SORRY NO PRODUCTS</h2>
        </div>
      </div>
    </div>
  </div>
</div>

<sweet-modal ref="modal" width="80%">
  <h2>MY CART</h2>
  <div class="container-fluid">
      <div class="row">
        <div class="card product" v-for="(prod,k) in cart.products" :key="k" style="width: 18rem;">
          <img class="card-img-top" :src="prod.photoURL" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">{{prod.title}}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <span><strong>PRICE : {{prod.price}}</strong></span>
            <a href="#" class="btn btn-primary" @click="addToCart(prod)">ADD TO CART</a>
          </div>
        </div>
         <div class="card product"  style="width: 38rem;">
          <div class="card-body">
            <h5 class="card-title">CART SUMMARY</h5>
            <p class="card-text"><strong>TOTAL AMOUNT : {{cart.total}}</strong></p>
            <a href="#" class="btn btn-primary" @click="swal('Congrats')">CHECKOUT</a>
          </div>
        </div>
      </div>
    </div>
</sweet-modal>
  </div>
</template>

<script>
import firebase from 'firebase'
import { SweetModal, SweetModalTab } from 'sweet-modal-vue'
import swal from 'sweetalert'
require('firebase/firestore')
export default {
  name: 'Home',
  components: {
    SweetModal,
    SweetModalTab
  },
  data () {
    return {
      searchtext: null,
      products: [],
      cart: {
        products: [],
        total: null
      }
    }
  },
  methods: {
    sort: function (val, order) {
      firebase.firestore().collection('products').orderBy(val, order).get().then(querySnapshot => {
        this.products = []
        querySnapshot.forEach(doc => {
          this.products.push(doc.data())
        })
      })
    },
    typ: function (val) {
      firebase.firestore().collection('products').where('type', '==', val).get().then(querySnapshot => {
        this.products = []
        querySnapshot.forEach(doc => {
          this.products.push(doc.data())
        })
      })
    },
    addToCart: function (product) {
      firebase.firestore().collection('user').doc(this.currentUser.uid).collection('cart').add(product).then(success => {
        swal('Success', 'Added to card', 'success')
      }).catch(err => {
        console.log(err)
        swal('Oops!', 'Something went wrong!', 'error')
      })
    },
    swal: function (mes) {
      swal(mes)
    },
    viewCart: function () {
      console.log('d')
      firebase.firestore().collection('user').doc(this.currentUser.uid).collection('cart').get().then(querySnapshot => {
        this.cart.products = []
        this.cart.total = 0
        querySnapshot.forEach(doc => {
          this.cart.products.push(doc.data())
          this.cart.total += doc.data().price
        })
        this.$refs.modal.open()
      })
    }
  },
  computed: {
    currentUser: () => firebase.auth().currentUser
  },
  mounted () {
    firebase.firestore().collection('products').get().then(querySnapshot => {
      this.products = []
      querySnapshot.forEach(doc => {
        this.products.push(doc.data())
      })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search {
  background: rgb(231, 231, 231);
  border: none;
  margin-left: 10%;
  width: 80rem;
  height: 2.5rem;
}
.filters {
  margin-top: 2rem;
  padding-left: 3rem;
}
.btn {
  margin: .3rem;
  min-width: 10rem;
}
.filter {
  padding-top: 2rem;
  min-height: 30rem;
  /* border-radius: 1rem; */
  /* background: white; */
}
.products {
  margin-top: 2rem;
  padding-left: 3rem;
}
.product {
  background: white;
  margin-left: 1rem;
  min-height: 15rem;
  border-radius: 1rem;
}
.nav-back {
  background: white;
}
a {
  font-weight: 900;
}
.user-img {
  float: left;
  height: 3rem;
  border-radius: 2rem;
  width: auto;
}
.img-logo {
  height: 2rem;
  margin-left: 2rem;
  width: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.text-logo {
  font-weight: 800;
  font-size: 30pt;
  margin-top: 1rem;
  margin-left: 3rem;
  kerning: 2em;
}
</style>
