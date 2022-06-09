<template>
  <div class="app-footer">
    <div class="app-footer-img not-mobile">
      <img src="img/footer.png" />
    </div>

    <div class="app-container">
      <div class="app-footer__wrapper">
        <div class="app-footer__item">
          <p class="date">© 2021 Freaking Turtles</p>
        </div>

        <div class="app-footer__item">
          <a
            :href="link.to"
            class="link"
            target="_blank"
            v-for="(link, i) in default_links"
            :key="i"
          >
            {{ link.name }}
          </a>
          <a
            href="mailto:freakingturtlesnft@gmail.com"
            class="link"
            target="_blank"
          >
            Email
          </a>
          <a
            href="https://etherscan.io/address/0x3222aa7053fd6d3cc433df62160564421c16bab3"
            class="link not-mobile"
            target="_blank"
          >
            Contract
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    default_links: Array,
  },
};
</script>

<style lang="scss" scoped>
.app-footer {
  position: relative;
  background: rgb(228, 190, 120);
  display: flex;
  justify-content: center;
  padding: 40px 0 40px;
  padding-top: 80px;
  width: 100%;

  &-img {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 340px;
    z-index: 1;
    img {
      width: 100%;
      position: relative;
      bottom: -4px;
    }
  }

  &__item {
    display: flex;

    .title,
    .link {
      line-height: 20px;
      margin-right: 48px;
      color: black;
    }
    .title {
      font-weight: 800;
    }
    .link {
      font-weight: 400;
      text-decoration: none;
      font-size: 16px;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }

  &__wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
  }

  &__logo {
    margin-bottom: 16px;
    img {
      width: 100px;
      overflow: hidden;
    }
  }
}

@media screen and (min-device-width: 320px) and (max-width: 768px) {
  .app-footer {
    padding: 40px 0;
    
    &__wrapper {
      display: block;
    }

    &__item {
      align-items: center;
      &:not(:last-child) {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
