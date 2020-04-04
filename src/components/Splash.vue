<template>
  <div>
    <img src="../assets/logo.png" class="logo" alt="ICMSS 2019" />
    <div class="text-wrapper">
      <h1 class="title after-logo is-size-2-mobile">Hello.</h1>
      <h2
        class="subtitle after-logo is-size-3-mobile"
      >Ready to find out what type of Sugar Baby you are?</h2>
    </div>
    <next-button class="after-logo" @click.native="nextStep" />
  </div>
</template>

<script>
import NextButton from "./NextButton.vue";

export default {
  name: "Splash",
  components: {
    NextButton
  },
  methods: {
    nextStep() {
      this.$emit("next-step");
    }
  }
};
</script>

<style scoped>
.text-wrapper {
  width: 55%;
}

/* Animations */
.after-logo {
  animation: after-logo 1s linear 5s;
  animation-fill-mode: both;
}

.logo {
  animation: move-logo 1s ease-in-out 4s;
  animation-fill-mode: both;
  position: fixed;
  width: auto;
  max-height: 100vh;
  top: 0;
  right: 50%;
  top: 50%;
  transform: translateX(50%) translateY(-50%);
}

@keyframes after-logo {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes move-logo {
  from {
    max-height: 30vh;
  }
  to {
    max-height: 15vh;
    right: 20%;
    top: 100px;
    transform: translateX(50%) translateY(0);
  }
}

@keyframes move-logo-mobile {
  from {
    max-height: 25vh;
  }
  to {
    max-height: 10vh;
    right: 20%;
    top: 35px;
    transform: translateX(50%) translateY(0);
  }
}

/* Responsiveness */
@media screen and (max-width: 991px) {
  .text-wrapper {
    width: 100%;
  }

  .logo {
    animation: move-logo-mobile 1s ease-in-out 4s;
    animation-fill-mode: both;
  }
}
</style>
