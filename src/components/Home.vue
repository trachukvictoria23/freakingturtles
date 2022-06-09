<template>
  <div
    class="home-info"
    :style="{
      background: `url('img/beach.png')`,
      backgroundSize: 'cover',
      backgroundPosition: '50%',
      backgroundRepeat: 'no-repeat',
    }"
  >
    <div class="wrapper">
      <div class="logo-wrapper">
        <img src="img/logo.png" />
      </div>
      
      <div class="imgs">
        <div class="left not-mobile">
          <img src="img/turtle/3.png" />
        </div>

        <div class="center-container">
          <div class="center left-part">
            <div class="wrapper">
              <h2 class="title">
                Mint
              </h2>

              <h2 class="get">
                Public Mint has started. Price is 0.05 ETH. Max 20 turtles per
                transaction.
              </h2>

              <!-- <h2 class="count">{{ total_supply }}/{{ amount }} MINTED</h2> -->

              <h2 class="count">
                MINT YOUR TURTLES
              </h2>

              <div class="connect">
                <div v-if="is_metamask_failed">
                  <button class="button button--disabled">
                    METAMASK NOT FOUND
                  </button>
                </div>

                <div v-else>
                  <div v-if="mint">
                    <input
                      class="mint__input"
                      type="text"
                      v-model="value"
                      @keydown="isNumber"
                      @keyup.enter="mintAction"
                    />
                    <button
                      class="button"
                      :class="{
                        'button--disabled': +total_supply === amount,
                      }"
                      @click="mintAction"
                    >
                      Mint
                    </button>
                  </div>

                  <div v-else>
                    <button
                      v-if="!user_id"
                      class="button"
                      @click="$emit('connect-wallet', true)"
                    >
                      Connect Wallet
                    </button>

                    <button
                      class="button button--disabled"
                      v-if="user_id && wrong_network"
                    >
                      Select Ethereum Network
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="center right-part not-mobile">
            <div class="wrapper" style="justify-content: space-between;">
              <div>
                <h2 class="title">
                  CLAIM
                </h2>
                <h2 class="get">
                  If you eligible to claim free turtles you can do it here
                </h2>
              </div>

              <div class="connect">
                <div v-if="is_metamask_failed">
                  <button class="button button--disabled">
                    METAMASK NOT FOUND
                  </button>
                </div>
                <div v-else>
                  <button
                    v-if="!user_id"
                    class="button"
                    @click="$emit('connect-wallet', true)"
                  >
                    Connect Wallet
                  </button>
                  <button
                    class="button"
                    :class="{
                      'button--disabled': !is_claim_listed || wrong_network,
                    }"
                    v-else
                    @click="claimAction"
                  >
                    {{ wrong_network ? "Select Ethereum Network" : "Claim" }}
                  </button>
                  <p class="error" v-if="!wrong_network && !is_claim_listed">
                    Your address is not eligible for claim
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="right not-mobile">
          <img src="img/turtle/6.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user_id: String,
    user_ETH: String | Number,
    is_metamask_failed: Boolean,
    mint: Boolean,
    total_supply: Number | String,
    wrong_network: Boolean,
    is_claim_listed: Boolean,
  },
  data() {
    return {
      value: 3,
      amount: 9999,
    };
  },
  methods: {
    claimAction() {
      if (!this.is_claim_listed) return;
      if (!this.wrong_network) this.$emit("claim");
    },
    mintAction() {
      // if (!this.isWhiteListed) return;
      if (+this.total_supply === this.amount) return;
      if (!+this.value) return;
      this.$emit("mint", +this.value);
    },
    isNumber(e) {
      let charCode = e.keyCode;
      if (
        e.shiftKey ||
        e.key === "," ||
        e.key === "/" ||
        (charCode > 31 &&
          charCode !== 32 &&
          (charCode !== 44 || isDecimal) &&
          (charCode !== 45 || !allowMinus) &&
          (charCode !== 46 || isDecimal) &&
          (charCode < 48 || charCode > 57) &&
          (charCode < 96 || charCode > 105) &&
          charCode !== 108 &&
          charCode !== 110)
        // charCode !== 190 &&
        //charCode !== 191
      ) {
        e.preventDefault();
        return false;
      } else {
        return true;
      }
    },
    copy() {
      const copyElement = document.querySelector(".copy-el");
      copyElement.focus();
      copyElement.select();
      document.execCommand("copy");
      this.$notify({
        group: "foo",
        text: "Contract is copied!",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.error {
  font-size: 14px;
  color: #dc1919;
}
.mint__input {
  padding: 0 10px;
  text-align: center;
}

.button,
.mint__input {
  font-size: 15px;
  border-radius: 4px;
  width: 90%;
  height: 40px;
  border: 1px solid #4a4a10;
  outline: none;
}

.button {
  margin-top: 10px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s;
  background: linear-gradient(to right, #11ffbd, #aaffa9);
  &--regular {
    cursor: auto;
  }
  &--disabled {
    cursor: auto;
    opacity: 0.5;
  }
  &:hover:not(.button--disabled) {
    background: linear-gradient(
      to right,
      rgba(17, 255, 189, 0.85),
      rgba(170, 255, 169, 0.85)
    );
  }
}

.connect {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  div {
    width: 100%;
  }

  &__login {
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.5);
    display: flex;
    align-items: center;
    border-radius: 100px;
    padding: 12px 16px;
    font-size: 14px;
    line-height: 20px;
    font-weight: 600;
    height: 46px;

    .id {
      background-color: #0041ff;
      color: white;
      font-size: 12px;
      line-height: 18px;
      display: inline-flex;
      align-items: center;
      padding: 5px 12px;
      border-radius: 100px;
      margin-left: 8px;
      width: 130px;
      height: 28px;
      text-transform: uppercase;
      display: flex;
      justify-content: space-between;

      svg {
        cursor: pointer;
      }
    }
  }
}

.home-info {
  height: 100%;
  padding-top: 140px;
  position: relative;
  .wrapper {
    position: relative;
    z-index: 1;
  }
  .bg {
    position: absolute;
    width: 100%;
    // height: 100%;
    left: 0;
    top: 0;
    img {
      width: 100%;
    }
  }

  .logo-wrapper {
    position: relative;
    top: -20px;

    margin: 0 auto;
    width: 30%;
    img {
      //width: 30%;
      width: 100%;
    }
  }

  .imgs {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .left {
      width: 30%;
      margin-top: -4.5%;
      img {
        width: 100%;
      }
    }

    .center {
      width: 60%;
      display: flex;
      justify-content: center;
      position: relative;

      .left-part,
      .right-part {
        width: 48% !important;
      }

      &-container {
        width: 50%;
        display: flex;
      }

      .wrapper {
        width: 95%;
        background: linear-gradient(to top, #039ebfc9, #3878d2c9);
        border-radius: 8px;
        border: 1px solid #4a4a10;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        line-height: 34px;
        color: white;
        padding: 16px 10px;
      }

      .count {
        margin: 8px 0;
      }

      .title {
        font-size: 42px;
        font-weight: 600;
        margin-bottom: 16px;
        text-transform: uppercase;
      }

      .get {
        font-size: 18px;
        font-weight: normal;
        line-height: 30px;
        a:active {
          color: white;
        }
      }

      h2 {
        font-weight: normal;
        font-size: 23px;
      }
    }
    
    .right {
      width: 30%;
      margin-top: -3%;
      img {
        width: 100%;
      }
    }
  }
}
</style>
