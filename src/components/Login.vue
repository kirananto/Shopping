<template>
    <div>
       <div class="d-flex justify-content-center align-items-center" style="height:60rem">
            <div class="bod">
                <img src="/static/shopping.svg" class="img-responsive img-logo" alt="">
                <h1 class="text-logo">OneStop Shopping</h1>
                <button class="btn btn-primary btn-github" > Github Oauth</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style>
.bod {
    background: white;
    width:20%;
    height: 30rem;
    border-radius: 1rem;
    /* margin-top:10rem; */
}
.img-logo {
    height: 10rem;
    width: auto;
    margin-top: 5rem;
}

.text-logo {
    font-weight: 800;
    kerning: 2em;
}
.btn-github {
    border: none;
    margin-top: 3rem;
    width: 80%;
    border-radius: 2rem;
    font-weight: 900;
    /* font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;/ */
    height: 3rem;
    background: #649173; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #649173, #dbd5a4); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #649173, #dbd5a4); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
