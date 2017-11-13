<template>
  <nav class="navbar navbar-expand-lg navbar-dark app-navbar">
    <router-link class="navbar-brand" to="/"><i class="fa fa-motorcycle"/> CrashTested</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
          <nav-item route="/products" text="Products" />
          <nav-item route="/about" text="About" />
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'nav-bar'
}
</script>

<style scoped>
.app-navbar {
  padding: 0.2rem 1rem;
  background-color: #0099ff;
}

.search-box {
  width: 5rem;
  color: transparent;

  -webkit-border-radius: 10rem;
	-moz-border-radius: 10rem;
	border-radius: 10rem;
}

.search-box:hover {
  /*width: 40rem*/
  background-color: white;
}

.search-box:focus {
  width: 40rem;
  cursor: auto;
  color: black;
}

/*
input[type=search] {
	width: 15px;
	padding-left: 10px;
	color: transparent;
	cursor: pointer;
}
#demo-2 input[type=search]:hover {
	background-color: #fff;
}
#demo-2 input[type=search]:focus {
	width: 130px;
	padding-left: 32px;
	color: #000;
	background-color: #fff;
	cursor: auto;
}
#demo-2 input:-moz-placeholder {
	color: transparent;
}
#demo-2 input::-webkit-input-placeholder {
	color: transparent;
}*/
</style>
