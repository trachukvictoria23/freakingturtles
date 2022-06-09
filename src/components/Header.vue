<template>
  <header class="header">
    <div class="app-container header-wrap">

      <ul class="navigation not-mobile">
        <li v-for="(link, i) in nav_links" :key="i">
          <a
            @click="$emit('change-active-link', link)"
            :class="{
              active: active_link === link,
              'border-left': i == 0,
              'border-right': i == nav_links.length - 1,
            }"
            >{{ link }}</a
          >
        </li>
      </ul>

      <!-- <div>
                <a class="app-timer">
                  {{ "MINT STARTS IN: " }} <timer></timer
                ></a>
              </div> -->

      <ul class="navigation">
        <a
          class="def-link"
          :href="link.to"
          v-for="(link, j) in default_links"
          :key="j"
          target="_blank"
        >
          <img
            :class="`img-${link.id}`"
            :src="`img/def-${link.id}.${link.id === 'dis' ? 'png' : 'svg'}`"
          />
        </a>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    default_links: Array,
    nav_links: Array,
    active_link: String,
  },
};
</script>


<style lang="scss" scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: center;
  height: 80px;
  padding: 20px 0;
  background: rgba(85, 150, 206, 0.7);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  transition: all 0.5s;
  z-index: 997;
  &__input {
    opacity: 0;
  }

  &-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__logo {
    width: 140px;
    img {
      width: 100%;
    }
  }
  .app-button {
    margin-left: 30px;
    // height: 50px;
    //  padding: 20px 40px;
  }
}
</style>
