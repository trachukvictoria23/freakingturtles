<template>
  <span class="timer"></span>
</template>

<script>
export default {
  created() {
    this.setTimer(true);
  },
  methods: {
    setTimer(isFirstRender) {
      let countDownDate = null;

      let x = setInterval(
        function () {
          countDownDate = new Date(Date.UTC(2021, 9, 1, 18, 0, 0));
          let now = new Date().getTime();
          let distance = countDownDate - now;
          let hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          let seconds = Math.floor((distance % (1000 * 60)) / 1000);

          document.querySelector(".timer").innerHTML =
            " " + hours + "h " + minutes + "m " + seconds + "s ";

          if (distance < 0) {
            clearInterval(x);
            document.querySelector(".timer").innerHTML = "00:00:00";
          }
        },
        isFirstRender ? 0 : 1000
      );
    },
  },
};
</script>
