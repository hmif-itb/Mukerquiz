<template>
  <div>
    <div class="text-wrapper">
      <h1 class="title is-size-2-mobile">First of all,</h1>
      <h2 class="subtitle is-size-3-mobile">
        Your name is
        <input
          v-model="name"
          type="text"
          class="subtitle is-size-3-mobile input-styled"
        />,
      </h2>
      <h2 class="subtitle is-size-3-mobile">
        And you are a
        <select
          v-model="major"
          class="subtitle is-size-3-mobile input-styled select-styled"
        >
          <option
            v-for="choice in majorChoices"
            :value="choice"
            :key="choice"
            class="select-option-styled is-size-3-mobile"
          >{{ choice }}</option>
        </select>
        student
      </h2>
    </div>
    <next-button v-if="validInfo" @click.native="nextStep" class="animate-show" />
  </div>
</template>

<script>
import NextButton from "./NextButton.vue";

export default {
  name: "Who",
  components: {
    NextButton
  },
  data() {
    return {
      name: "",
      email: "",
      major: "",
      majorChoices: [
        "IF",
        "STI",
      ]
    };
  },
  methods: {
    nextStep() {
      this.$emit("next-step", {
        name: this.name,
        email: this.email,
        major: this.major
      });
    },
    validEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  },
  computed: {
    validInfo() {
      return (
        this.name.length > 0 &&
        this.major.length > 0 
      );
    }
  }
};
</script>

<style scoped>
.input-styled {
  border: none;
  background: transparent;
  border-bottom: 4px solid #f378a7;
  color: #f378a7;
  outline: none;
}

.select-styled {
  appearance: none;
  text-transform: capitalize;
}

.select-option-styled {
  color: #000942;
  text-transform: capitalize;
}

.text-wrapper {
  width: 100%;
}

.animate-show {
  animation: show 0.2s linear;
  animation-fill-mode: both;
}

@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Responsiveness */
@media screen and (max-width: 991px) {
  .text-wrapper {
    width: 100%;
  }

  .input-styled {
    width: 80vw;
  }
}
</style>
