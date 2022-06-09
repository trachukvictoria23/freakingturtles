<template>
  <transition name="fade">
    <div id="app">
      <div class="bg-wrapper">
        <section class="home">
          <app-header
            :default_links="default_links"
            :nav_links="nav_links"
            :active_link="active_link"
            :class="{
              'header-active': active_link !== 'home' || is_active_header,
            }"
            @change-active-link="nextLink"
          >
          </app-header>
        </section>

        <home
          :user_id="user_id"
          :user_ETH="user_ETH"
          :mint="mint"
          :is_metamask_failed="is_metamask_failed"
          :total_supply="total_supply"
          :wrong_network="wrong_network"
          :is_claim_listed="is_claim_listed"
          @claim="claim"
          @mint="mintPreSale"
          @connect-wallet="connectWallet"
        ></home>

        <about />
        <benefits />
        <roadmap />

        <app-footer :default_links="default_links" />
      </div>

      <notifications group="custom-template" :width="'fit-content'">
        <template slot="body" slot-scope="props">
          <div class="vue-notification-template vue-notification">
            <a class="title">
              {{ props.item.title }}
            </a>
            <br />
            <a class="link" @click="props.close">
              {{ props.item.text }}
            </a>
          </div>
        </template>
      </notifications>
    </div>
  </transition>
</template>

<script>
import Vue from "vue";
import Notifications from "vue-notification";

Vue.use(Notifications);
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Home from "@/components/Home";
import Roadmap from "@/components/Roadmap";
import Benefits from "@/components/Benefits";
import Timer from "@/components/Timer";

import detectEthereumProvider from "@metamask/detect-provider";

import Web3 from "web3";
const ADDRESS = "0x3222aa7053fd6d3cc433df62160564421c16bab3";
import ABI from "../abi.json";
import WIGHTLIST from "../wl.json";
import CLAIMLIST from "../claim.json";

import { bus } from "./main";

export default {
  name: "app",
  components: {
    appHeader: Header,
    appFooter: Footer,
    About,
    Roadmap,
    Home,
    Benefits,
    Timer,
  },
  created() {
    window.addEventListener("scroll", this.scrollContainer);
    window.ethereum.on("chainChanged", (chainId) => {
      this.mint = false;
      this.getChainId();
    });
    window.ethereum.on("accountsChanged", (accounts) => {
      //this.mint = false;
      this.requestAccounts(false);
    });

    bus.$on("setNotifyLink", this.setNotifyLink);
  },
  mounted() {
    if (localStorage.getItem("autoConnect")) this.is_auto_connect = true;
    this.connectWallet();
    this.getWeb3();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollContainer);
    bus.$off("setNotifyLink", this.setNotifyLink);
  },
  data() {
    return {
      // const
      WIGHTLIST,
      CLAIMLIST,
      // user data
      user_ETH: 0,
      user_id: null,
      is_auto_connect: false,
      is_metamask_failed: true,
      //contract data
      total_supply: 0,
      mint: false,
      turtles_contract: null,
      wrong_network: true,
      is_white_listed: false,
      is_claim_listed: false,
      // links
      is_active_header: false,
      nav_links: ["home", "about", "benefits", "roadmap"],
      active_link: "home",
      default_links: [
        {
          to: "https://twitter.com/freakingturtles",
          id: "tel",
          name: "Twitter",
        },
        {
          to: "https://discord.com/invite/freakingturtles",
          id: "dis",
          name: "Discord",
        },
        {
          to: "https://opensea.io/collection/freaking-turtles-nft",
          id: "opensea",
          name: "Opensea",
        },
      ],
    };
  },
  methods: {
    async getChainId() {
      ethereum
        .request({
          method: "eth_chainId",
        })
        .then((info) => {
          if (info == 0x1) {
            this.mint = true;
            this.wrong_network = false;
          } else {
            this.mint = false;
            this.wrong_network = true;
          }
        });
    },
    async connectWallet(try_to_connect = false) {
      if (this.mint) this.mint = false;
      const provider = await detectEthereumProvider();

      if (provider) {
        this.is_metamask_failed = false;
        // Initialize your app
        if (provider !== window.ethereum) {
          console.error("Do you have multiple wallets installed?");
        }
      } else {
        this.is_metamask_failed = true;
        this.is_auto_connect = false;
        localStorage.setItem("autoConnect", this.is_auto_connect);
        return;
      }
      if (this.is_auto_connect || try_to_connect) {
        this.requestAccounts();
      }
    },
    requestAccounts(isUpdateChain = true) {
      ethereum
        .request({ method: "eth_requestAccounts" })
        .then((info) => {
          this.user_id = info[0];
          this.is_auto_connect = true;
          /* let is_white_listed = false;
          this.WIGHTLIST.forEach((item) => {
            if (item.toLocaleLowerCase() === this.user_id.toLocaleLowerCase())
              is_white_listed = true;
          });*/

          let is_claim_listed = false;
          this.CLAIMLIST.forEach((item) => {
            if (item.toLocaleLowerCase() === this.user_id.toLocaleLowerCase())
              is_claim_listed = true;
          });

          //   this.is_white_listed = is_white_listed;
          this.is_claim_listed = is_claim_listed;

          localStorage.setItem("autoConnect", this.is_auto_connect);
          if (isUpdateChain) this.getChainId();
        })
        .catch((err) => {
          this.is_auto_connect = false;
          localStorage.setItem("autoConnect", this.is_auto_connect);
          if (err.code === 4001) {
            this.is_metamask_failed = true;
            // alert("Please connect to MetaMask.");
          } else {
            //alert(err.message);
          }
        });
    },
    async mintPreSale(val) {
      const nft_price = 50000000000000000;
      const price = Number(nft_price) * val;
      const user_id = this.user_id;

      /* const gasAmount = await this.turtles_contract.methods
        .mintPreSale(val)
        .estimateGas({ from: user_id, value: price });
      */

      this.turtles_contract.methods
        .mintSale(val)
        .send({ from: user_id, value: price })
        .on("transactionHash", function (hash) {
          bus.$emit("setNotifyLink", hash);
        });
    },
    async claim() {
      this.turtles_contract.methods
        .claimReserved()
        .send({ from: this.user_id })
        .on("transactionHash", function (hash) {
          bus.$emit("setNotifyLink", hash);
        });
    },
    setNotifyLink(hash) {
      this.$notify({
        duration: 5000,
        group: "custom-template",
        title: "Transaction submitted:",
        text: `https://etherscan.io/tx/${hash}`,
      });
    },
    async getWeb3() {
      if (!window.ethereum) return;
      const web3 = new Web3(window.ethereum);
      this.turtles_contract = new web3.eth.Contract(ABI, ADDRESS);
      const total_supply = await this.turtles_contract.methods
        .totalSupply()
        .call();
      this.total_supply = total_supply ? total_supply : 0;
    },
    nextLink(name) {
      this.active_link = name;
      document
        .querySelector(`.${name}`)
        .scrollIntoView({ block: "start", behavior: "smooth" });
    },
    scrollContainer() {
      if (window.scrollY >= 100) return (this.is_active_header = true);

      this.is_active_header = false;
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/style/main.scss";

.app-timer {
  margin-left: 20px;
  font-size: 20px !important;
  border-right: 1px solid rgba(255, 255, 255, 0.5) !important;
  border-radius: 8px;
  cursor: default !important;
  &:hover {
    background: #348dd6a3 !important;
    color: white !important;
  }
}

.navigation {
  display: flex;
  align-items: center;
  padding-left: 10px;

  .def-link {
    //display: flex;
    height: 32px;
    padding-right: 20px;
    .img-tel {
      width: 32px;
    }
    .img-dis {
      width: 28px;
    }
    .img-oc {
      width: 36px;
    }
  }

  li {
    list-style: none;
  }
  .border-left {
    border-radius: 8px 0 0 8px;
  }

  .border-right {
    border-radius: 0 8px 8px 0;
    border-right: 1px solid rgba(255, 255, 255, 0.5) !important;
  }

  a:not(.def-link) {
    height: 40px;
    padding: 0 20px;
    font-size: 16px;
    line-height: 16px;
    transition: 0.3s;
    text-decoration: none;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-right: none;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    cursor: pointer;
    height: 48px;
    text-transform: uppercase;
    background: #348dd6a3;
    &:hover {
      background-color: #fff;
      color: #000;
    }
  }

  .active {
    color: white;
  }
}
</style>
