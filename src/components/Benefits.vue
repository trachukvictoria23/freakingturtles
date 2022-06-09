<template>
  <section class="benefits">
    <div class="app-container">
      <div class="shell">
        <img src="img/bird.png" />
      </div>

      <h1 class="app-title">EXCLUSIVE BENEFITS</h1>

      <div class="rows">
        <div class="row" v-for="(item, i) in content" :key="i">
          <div class="inner">
            <p v-html="`${item.emoji} ` + item.text"></p>
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
      content: [
        {
          emoji: "🥇",
          text: "Holders of first <span style='font-weight: 600'>500</span> Turtles will participate in 1 ETH giveaway",
        },
        {
          emoji: "🤗",
          text: "Holders of every <span style='font-weight: 600'>500th</span> Turtle will receive free Turtle via airdrop",
        },
        {
          emoji: "🎩",
          text: "Holders of <span style='font-weight: 600'>30+</span> Turtles will receive membership in private community and will be eligible to vote for project decisions",
        },
        {
          emoji: "🤫",
          text: "Stay tuned...",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.benefits {
  background: rgb(242, 249, 248);
  position: relative;

  .app-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .shell {
    position: absolute;
    bottom: -100px;
    left: 40px;
    width: 200px;
    z-index: 1;
    img {
      width: 100%;
    }
  }
  
  .rows {
    display: flex;
    flex-direction: column;
    width: 85%;
    .row {
      background: linear-gradient(to right, #11ffbd, #aaffa9);
      border-radius: 8px;
      border: 1px solid #4a4a10;
      width: 90%;
      margin-top: 40px;

      &:nth-child(2n) {
        align-self: flex-end;
      }

      .inner {
        font-size: 26px;
        padding: 20px;
      }
    }
  }
}
</style>
