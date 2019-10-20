<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-2">
                <div class="sidebar-nav">
                    <a href="#" @click.prevent="selectedPage ='about-us'">About Us</a>
                    <br>
                    <a href="#" @click.prevent="selectedPage ='about-helmet-ratings'">About Helmet Ratings</a>
                    <br>
                    <a href="#" @click.prevent="selectedPage ='about-jacket-ratings'">About Jacket Ratings</a>
                    <br>
                    <a href="#" @click.prevent="selectedPage ='about-gloves-ratings'">About Gloves Ratings</a>
                    <br>
                    <a href="#" @click.prevent="selectedPage ='about-boots-ratings'">About Boots Ratings</a>
                    <br>
                    <a href="#" @click.prevent="selectedPage ='about-pants-ratings'">About Pants Ratings</a>
                    <br>
                </div>
            </div>

            <div class="col-lg-10">
                <div>
                    <div v-if="selectedPage === 'about-us'">
                        <about-us/>
                    </div>

                    <div v-else-if="selectedPage === 'about-helmet-ratings'">
                        <about-helmet-ratings/>
                    </div>

                    <div v-else-if="selectedPage === 'about-jacket-ratings'">
                        <about-jacket-ratings/>
                    </div>

                    <div v-else-if="selectedPage === 'about-gloves-ratings'">
                        <about-gloves-ratings/>
                    </div>

                    <div v-else-if="selectedPage === 'about-boots-ratings'">
                        <about-boots-ratings/>
                    </div>

                    <div v-else-if="selectedPage === 'about-pants-ratings'">
                        <about-pants-ratings/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AboutHelmetRatings from './AboutHelmetRatings'
import AboutJacketRatings from './AboutJacketRatings'
import AboutGlovesRatings from './AboutGlovesRatings'
import AboutBootsRatings from './AboutBootsRatings'
import AboutPantsRatings from './AboutPantsRatings'
import AboutUs from './AboutUs'
export default {
  name: 'About',
  components: {
    'about-helmet-ratings': AboutHelmetRatings,
    'about-jacket-ratings': AboutJacketRatings,
    'about-gloves-ratings': AboutGlovesRatings,
    'about-boots-ratings': AboutBootsRatings,
    'about-pants-ratings': AboutPantsRatings,
    'about-us': AboutUs
  },
  data: function () {
    return {
      selectedPage: 'about-us'
    }
  },
  mounted () {
    this.$Progress.finish()
  }
}
</script>

<style scoped>
.sidebar-nav {
  margin-top: 32px;
}
@media only screen and (min-device-width : 0px) and (max-device-width : 991px) {
  .sidebar-nav {
      text-align: center;
      margin-bottom: 32px;
  }
}
</style>
