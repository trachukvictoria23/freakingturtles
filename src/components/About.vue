<template>
  <section class="about">
    <div class="app-container">
      <div class="palm palm-right">
        <img src="img/palm1.png" />
      </div>
      <div class="palm palm-left">
        <img src="img/palm2.png" />
      </div>
      <div class="palm star">
        <img src="img/star.png" />
      </div>

      <h1 class="app-title">Who are freaking turtles?</h1>

      <div class="view">
        <p class="info">
          Freaking Turtles are a limited hand-drawn squad of the 9,999 unique
          turtles. 150+ different possible traits and over 300 million
          combinations. Now they're living on the Ethereum Blockchain in the
          form of an NFT. Each Freaking Turtle is one-of-a-kind, completely
          individual and 100% owned by you. Be careful, some of them have laser
          eyes!
        </p>

        <carousel-3d
          :height="400"
          :width="400"
          :autoplay="true"
          :autoplayTimeout="1500"
          class="carousel"
          :perspective="0"
        >
          <slide v-for="(slide, i) in 7" :index="i" :key="i">
            <template>
              <img :src="`img/about/${slide}.png`" />
            </template>
          </slide>
        </carousel-3d>
      </div>
    </div>
  </section>
</template>

<script>
import { Carousel3d, Slide } from "vue-carousel-3d";

export default {
  components: {
    Carousel3d,
    Slide,
  },
};
</script>

<style lang="scss">
.about {
  background: rgb(242, 249, 248);
  position: relative;
  background-position: 0px 0px, 80% 80%;
  background-size: 180px;
  background-repeat: repeat, repeat;

  .app-title {
    position: relative;
    z-index: 1;
    margin-bottom: 32px;
  }

  .palm {
    position: absolute;
    z-index: 1;
    &-right {
      right: 0;
      top: 0;
      width: 340px;
    }
    &-left {
      left: 0;
      top: 140px;
      width: 340px;
    }
    img {
      width: 100%;
    }
  }

  .star {
    right: 5%;
    bottom: -60px;
    width: 200px;
  }

  .view {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    p {
      width: 85%;
    }
    .carousel {
      display: flex;
      justify-content: flex-end;
    }
  }

  .info {
    margin-top: 40px;
    text-align: center;
    font-size: 24px;
  }
}

.carousel-3d-slide {
  border: 1px solid black !important;

  img {
    border: 10px solid white !important;
  }
}
</style>
