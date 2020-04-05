<template>
  <div class="question-wrapper">
    <b-loading :is-full-page="true" :active.sync="loadQuestions"></b-loading>
    <div v-if="questions.length > 0" :class="transitionName">
      <p class="question-title is-size-4-mobile">{{ title }}</p>
      <div class="range-wrapper">
        <label
          class="radio-styled-container"
          :id="'val-'.concat(val)"
          v-for="val in [1, 2, 3, 4, 5]"
          :key="val"
          @click="blurInput"
        >
          <input type="radio" v-model="answer" :value="val" />
          <span class="radio-styled" />
          <span class="radio-styled-label" v-if="val === 1">Disagree</span>
          <span class="radio-styled-label" v-if="val === 5">Agree</span>
        </label>
      </div>
      <next-button v-if="!last" down @click.native="idxNext" />
      <next-button class="up-button" v-if="!last && !first" up @click.native="idxPrev" />
      <a class="submit-styled" v-if="last" @click="submit">Finish</a>
    </div>
  </div>
</template>

<script>
import NextButton from "./NextButton.vue";
export default {
  name: "questions",
  components: {
    NextButton
  },
  props: {
    swipe: String
  },
  async mounted() {
    try {
      const data = await fetch("https://mukerquiz.herokuapp.com/questions", {
        mode: "cors"
      });
      this.questions = await data.json();
      this.loadQuestions = false;
    } catch (error) {
      this.loadQuestions = false;
      console.error(error);
    }
    document.addEventListener("keyup", this.handleKey);
  },
  data() {
    return {
      index: 0,
      questions: [],
      answers: [],
      answer: 3,
      loadQuestions: true,
      transitionName: null,
      onTransition: false
    };
  },
  methods: {
    handleKey() {
      if (event.keyCode == 38) {
        this.idxPrev();
      } else if (event.keyCode == 40) {
        this.idxNext();
      }
    },
    blurInput(e) {
      e.target.blur();
    },
    idxNext() {
      if (!this.onTransition && this.index < this.questions.length - 1) {
        this.transitionName = "exit-up";
        this.answers[this.index] = this.answer;
        this.onTransition = true;
        setTimeout(() => {
          this.onTransition = false;
          this.index += 1;
          this.transitionName = "enter-up";
          this.answer = this.answers[this.index] || 3;
        }, 500);
      }
    },
    idxPrev() {
      if (!this.onTransition && this.index > 0) {
        this.transitionName = "exit-down";
        this.answers[this.index] = this.answer;
        this.onTransition = true;
        setTimeout(() => {
          this.onTransition = false;
          this.index -= 1;
          this.transitionName = "enter-down";
          this.answer = this.answers[this.index] || 3;
        }, 500);
      }
    },
    async submit() {
      this.answers[this.index] = this.answer;
      this.$emit("next-step", { answers: this.answers });
    }
  },
  watch: {
    swipe(val) {
      if (val === "top") this.idxNext();
      else if (val === "bottom") this.idxPrev();
      this.$emit("swiped");
    }
  },
  computed: {
    title() {
      return this.questions[this.index];
    },
    last() {
      return this.index === this.questions.length - 1;
    },
    first() {
      return this.index === 0;
    }
  }
};
</script>

<style scoped>
.question-wrapper {
  margin-top: -90px;
}

.question-title {
  text-align: center;
  width: 60%;
  margin: 0 auto;
  font-size: 38px;
  padding-bottom: 32px;
}

.submit-styled {
  font-family: "Montserrat", sans-serif;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 100px;
  width: auto;
  font-size: 36px;
  font-weight: bold;
  text-transform: uppercase;
  color: #f177a6;
}

.range-wrapper {
  width: 50%;
  height: 150px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0 auto;
  padding-top: 32px;
}

.radio-styled-container {
  display: block;
  cursor: pointer;
  position: relative;
  height: 100px;
  width: 100px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

#val-2 {
  margin-right: -20px;
}

#val-4 {
  margin-left: -20px;
}

#val-2,
#val-4 {
  transform: scale(0.8);
}

#val-3 {
  transform: scale(0.6);
}

/* Hide the browser's default radio button */
.radio-styled-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.radio-styled {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: transparent;
  border: 6px solid #f177a6;
  border-radius: 50%;
  transition: 0.2s all;
}

#val-2 .radio-styled,
#val-4 .radio-styled {
  border: 7px solid #f177a6;
}

#val-3 .radio-styled {
  border: 8px solid #f177a6;
}

.radio-styled-container:hover input ~ .radio-styled {
  background-color: #f177a6;
}

.radio-styled-container input:checked ~ .radio-styled {
  background-color: #f177a6;
}

.radio-styled-label {
  position: absolute;
  bottom: -80px;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 20px;
}

.radio-styled-label:nth-child(2) {
  direction: rtl;
}

.up-button {
  right: calc(15% + 80px);
}

@media screen and (max-width: 991px) {
  .question-wrapper {
    margin-top: 0;
  }

  .question-title {
    padding-bottom: 0;
    width: 100%;
  }

  .submit-styled {
    left: 50%;
    transform: translateX(-50%);
    bottom: 35px;
    width: auto;
    font-size: 24px;
    text-align: center;
  }

  .range-wrapper {
    width: 100%;
    margin-top: -16px;
    padding-top: 0;
  }

  .radio-styled-container {
    height: 60px;
    width: 60px;
  }

  .radio-styled-label {
    bottom: -40px;
    font-weight: 400;
  }

  #val-2 {
    margin-right: -10px;
  }

  #val-4 {
    margin-left: -10px;
  }

  #val-2,
  #val-4 {
    transform: scale(0.8);
  }

  #val-3 {
    transform: scale(0.6);
  }

  .radio-styled {
    border: 4px solid #f177a6;
  }

  #val-2 .radio-styled,
  #val-4 .radio-styled {
    border: 5px solid #f177a6;
  }

  #val-3 .radio-styled {
    border: 6px solid #f177a6;
  }

  .up-button {
    right: 90px;
  }
}

@media screen and (max-width: 320px) {
  .radio-styled-container {
    height: 50px;
    width: 50px;
  }
}

.exit-up {
  animation: exit-up 0.5s ease-in-out;
}

@keyframes exit-up {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    margin-top: -1000px;
  }
}

.enter-up {
  animation: enter-up 0.5s ease-in-out;
}

@keyframes enter-up {
  from {
    opacity: 0;
    margin-top: 1000px;
  }
  to {
    opacity: 1;
  }
}

.exit-down {
  animation: exit-down 0.5s ease-in-out;
}

@keyframes exit-down {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    margin-top: 1000px;
  }
}

.enter-down {
  animation: enter-down 0.5s ease-in-out;
}

@keyframes enter-down {
  from {
    opacity: 0;
    margin-top: -1000px;
  }
  to {
    opacity: 1;
  }
}
</style>
