<template>
  <div class="hello">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#"> <img src="/static/shopping.svg" class="img-logo" alt=""></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">SHOPPING LIST<span class="sr-only">(current)</span></a>
      </li>
      <li>
      <form class="form-inline">
        <input class="form-control mr-sm-2 search" v-model="searchtext" type="search" placeholder="Search" aria-label="Search">
      </form>
      </li>
    </ul>
    <div class="nav-item">
      <span class="nav-link"><img v-on:click="signout" :src="currentUser.photoURL" class="user-img" alt=""></span>
    </div>
  </div>
</nav>
<div class="container-fluid">
  <div class="row">
    <div class="products col-md-12 container">
      <div class="row" v-if="myNotes.length > 0">
        <div v-for="(todos,k) in myNotes" :key="k" class="col">
        <shopping-list class="container" style="margin:1rem; padding: 1rem; min-height: 10rem;" :todos="todos.content"></shopping-list>
        </div>
      </div>
      <!-- <div class="row" v-else>
        <div class="card col-md-11" style="min-height: 20rem;">
          <h2 style="font-weight: 900; margin-top: 10rem;">SORRY NO Notes</h2>
        </div>
      </div> -->
    </div>
  </div>
</div>
<fab
   :position="position"
   :bg-color="bgColor"
   :actions="fabActions"
   @add="add"
></fab>
<sweet-modal ref="modal" width="80%">
</sweet-modal>
  </div>
</template>

<script>
import firebase from 'firebase'
import { SweetModal, SweetModalTab } from 'sweet-modal-vue'
import fab from 'vue-fab'
import swal from 'sweetalert'
import ShoppingList from './ShoppingList'
require('firebase/firestore')
export default {
  name: 'Home',
  components: {
    SweetModal,
    SweetModalTab,
    fab,
    ShoppingList
  },
  data () {
    return {
      users: [],
      myNotes: [],
      searchtext: null,
      SharedNotes: [],
      editedTodo: null,
      visibility: 'all',
      bgColor: '#009688',
      oldNotes: [],
      position: 'bottom-right',
      fabActions: [
        {
          name: 'add',
          icon: 'add'
        }
      ]
    }
  },
  watch: {
    myNotes (newVal) {
      console.log('changed')
      var vm = this
      newVal.forEach(function (doc, index) {
        if (doc.content !== vm.oldNotes[index].content) {
          console.log()
        }
      })
    }
  },
  methods: {
    setValue () {
      this.oldNotes = this.myNotes
    },
    add () {
      this.myNotes.push({
        title: 'SHOPPING LIST',
        content: [],
        sharedWith: null
      })
    },
    signout: function () {
      console.log('he')
      firebase.auth().signOut().then(succ => {
        console.log('he')
        this.$router.replace('/login')
      })
    },
    swal: function (mes) {
      swal(mes)
    }
  },
  computed: {
    currentUser: () => firebase.auth().currentUser
  },
  mounted () {
    firebase.firestore().collection('notes').doc(this.currentUser.uid).collection('myNotes').get().then(querySnapshot => {
      this.myNotes = []
      console.log('h')
      querySnapshot.forEach(doc => {
        var dat = doc.data()
        dat.content.forEach(function (todo, index) {
          todo.id = index
        })
        dat.id = doc.id
        this.myNotes.push(dat)
      })
      this.setValue()
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
