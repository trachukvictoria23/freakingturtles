<template>
  <section class="roadmap">
    <div class="app-container">
      <h1 class="app-title text-center">Roadmap</h1>

      <div class="wrapper">
        <div class="img">
          <img src="img/turtle/2.png" />
        </div>

        <div class="roadmap__container">
          <div
            class="row"
            v-for="(item, i) in list"
            :key="i"
            :class="{ 'row-reverse': i % 2 === 1 }"
          >
            <div class="name" :class="{ 'rotateZ-180': i % 2 === 1 }">
              <h3 :class="{ 'rotateZ-180': i % 2 === 1 }">Stage {{ i + 1 }}</h3>
            </div>
            <div class="inner" :class="{ 'left-part': i % 2 === 1 }">
              <ul>
                <li>
                  <p>
                    {{ item }}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      list: [
        "Integrate with Rarity Tools to let you see how rare your NFT is and compare all of the traits.",
        "Establish partnerships in the NFT space and continue to grow the community.",
        "Get collection featured on Rarity Tools.",
        "Get the Freaking Turtles collection on OpenSea verified.",
        "Randomly selected Freaking Turtles owners will win a NiftySlab Card.",
        "Launch a merch store exclusively for Freaking Turtles holders with limited edition merch.",
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
$color-lines: rgb(181, 184, 252);

$default-color: #4a4a10;

ul {
  padding-left: 0;
}

.roadmap {
  background: linear-gradient(
    to bottom,
    rgb(242, 249, 248),
    rgb(228, 190, 120)
  );
  width: 100%;

  .wrapper {
    display: flex;
    justify-content: space-between;
    .img {
      width: 30%;
      position: relative;
      left: -160px;
      img {
        width: 170%;
      }
    }
  }

  .app-title {
    margin-bottom: 40px;
  }

  &__container {
    position: relative;
    width: 70%;

    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      .name,
      .inner {
        width: 50%;
      }
      .inner {
        padding-left: 2rem;
        li {
          list-style: none;
          display: flex;
          margin-bottom: 0.8rem;
          font-size: 20px;
          span {
            //color: rgb(181, 184, 252);
            color: $default-color;
          }
          p {
            margin-left: 16px;
          }
        }
      }
      .left-part {
        padding-right: 40px;
        display: flex;
        justify-content: flex-end;
      }
      .name {
        position: relative;
        h3 {
          display: flex;
          align-items: center;
          justify-content: center;
          // background-color: $color-lines;
          //    background-color: rgb(255, 63, 135);
          background-color: #de9100;
          position: relative;
          z-index: 5;
          color: rgb(255, 255, 255);
          font-weight: 500;
          width: 150px;
          font-size: 1.1rem;
          border-radius: 0.5rem;
          padding: 0.7rem 0px;
          margin: 0px auto;
        }
        &::before,
        &::after {
          content: "";
          position: absolute;
          top: 50%;
          right: 0px;
        }
        &::after {
          border-top: 2px dashed $default-color;

          height: 2px;
          width: 220px;
          transform: translateY(-50%);
        }
      }
    }
    &::before {
      position: absolute;
      width: 2px;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      content: "";
      margin: auto;
      border-left: 2px dashed $default-color;
    }
  }
}
</style>
