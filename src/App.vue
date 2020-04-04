<template>
  <section class="hero is-fullheight is-dark color-shift">
    <div v-touch:swipe="swipeHandler" class="hero-body">
      <div class="container">
        <splash v-if="step === 0" @next-step="nextStep" />
        <who v-else-if="step === 1" @next-step="nextStep" />
        <questions
          v-else-if="step === 2"
          @next-step="nextStep"
          :swipe="swipeDir"
          @swiped="swipeDir = 'none'"
        />
        <result v-else-if="step === 3" :quiz-data="{ user: this.user, answers: this.answers }" />
      </div>
    </div>
    <footer v-if="step ===3" class="footer footer-bg">
      <p class="is-style-accent is-size-4-desktop is-size-5-mobile is-italic is-footer">        
        DISCLAIMER: This quiz is designed to help you know the departments that might be of your interest, but, don't forget to choose the division you truly know you want to be a part of.
      </p>
      <p class="is-style-accent is-size-3-desktop is-size-5-mobile is-footer-2">
        Ready to join the Sugar family? Click <a href="bit.ly/SugarBabyAudition"><b>here</b> </a> to register now.
      </p>
    </footer>
  </section>
</template>

<script>
import Splash from "./components/Splash.vue";
import Who from "./components/Who.vue";
import Questions from "./components/Questions.vue";
import Result from "./components/Result.vue";

export default {
  name: "app",
  components: {
    Splash,
    Who,
    Questions,
    Result
  },
  data() {
    return {
      step: 0,
      user: {},
      answers: {},
      swipeDir: "none"
    };
  },
  methods: {
    nextStep(data) {
      if (this.step === 1) this.user = data;
      if (this.step === 2) {
        const dataObj = data.answers.reduce((accum, value, idx) => {
          return { ...accum, [idx.toString()]: value };
        }, {});
        this.answers = dataObj;
      }
      this.step++;
    },
    swipeHandler(direction) {
      this.swipeDir = direction;
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");
@import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");

* {
  font-family: "Roboto", sans-serif;
  color: #6ecfd1;
}
.is-style-accent {
  font-family: "Monsterrat", sans-serif;
}
html {
  scroll-behavior: smooth;
}
.is-centered {
  justify-content: center;
}
.title {
  font-style: italic;
}

/* too lazy to google how to make it italic  */
.is-italic {
  font-style: italic;
}

/* when in doubt, add more css : */
.is-footer {
  color: #f177a6 !important;
  text-align: center !important;
}
.is-footer-2 {
  color: #f177a6 !important;
  text-align: center !important;
  margin-top: 20px;
  padding-bottom: -2rem;
  margin-bottom: -2rem;
}
.footer{
  padding-bottom: -10px !important;
}
.footer-bg{
  background-color: #000000 !important;
  opacity: 0.7;
}
/* Animations */
.color-shift {
  animation: bg-color 5s linear infinite;
}
@keyframes bg-color {
  0% {
    background-color: rgb(18, 20, 20);
  }
  25% {
    background-color: rgb(57, 93, 102);
  }
  50% {
    background-color: rgb(39, 56, 61);
  }
  75% {
    background-color: rgb(23, 28, 29);
  }
  100% {
    background-color: rgb(18, 20, 20);
  }
}

/* Responsiveness */
@media screen and (min-width: 991px) {
  .title {
    font-size: 72px !important;
  }
  .subtitle {
    font-size: 36px !important;
  }
}

@media screen and (min-width: 1025px) {
  .title {
    font-size: 72px !important;
  }
  .subtitle {
    font-size: 42px !important;
  }
}
</style>
