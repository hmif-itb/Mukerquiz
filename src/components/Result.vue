<template>
  <div>
    <b-loading :is-full-page="true" :active.sync="loadResults"></b-loading>
    <div class="text-wrapper" v-if="!invalid">
      <h2 class="subtitle is-size-3-mobile is-marginless">{{ name }},</h2>
      <h2 class="subtitle is-size-3-mobile is-marginless">based on your answers,</h2>
      <h2 class="subtitle is-size-3-mobile is-marginless">
        <b>these are your results!</b>
      </h2>
    </div>
    <div class="text-wrapper" v-else>
      <h2 class="subtitle is-size-3-mobile is-marginless">
        <b>It's still too tricky to find your Sugar Baby role,</b>
      </h2>
      <h2
        class="subtitle is-size-3-mobile is-marginless"
      >Please try this quiz again and vary your answers.</h2>
    </div>
    <div v-if="suggestions.length > 0" class="columns is-desktop result-wrapper" :class="noPadding">
      <div v-for="suggestion in suggestions" :key="suggestion" class="column">
        <div class="result-box" :class="selectedClass(suggestion)" @click="setSelected(suggestion)">
          <h2 class="subtitle is-size-3-mobile has-text-centered">
            <b>{{ suggestion }}</b>
          </h2>
          <p class="sub-more">
            <b class="more-text">read more</b>
            <img src="../assets/arrow.png" class="more-button" alt="next" />
          </p>
        </div>
        <result-strip v-if="selected === suggestion" :result="selected" />
      </div>
    </div>
    
  </div>
</template>

<script>
import ResultStrip from "./ResultStrip.vue";

export default {
  name: "Result",
  components: {
    ResultStrip,
  },
  props: { quizData: Object },
  data() {
    return {
      loadResults: true,
      suggestions: [],
      selected: null,
      invalid: false,
      bintang: false
    };
  },
  async mounted() {
    this.bintang = this.quizData.user.major !== "Management";
    const total = Object.keys(this.quizData.answers).reduce(
      (accum, key) => (accum += this.quizData.answers[key]),
      0
    );
    if (total == 0 || total == Object.keys(this.quizData.answers).length * 5) {
      this.invalid = true;
      this.loadResults = false;
      return;
    }
    try {
      const data = await fetch("https://mukerquiz.herokuapp.com/answers", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.quizData)
      });
      const json = await data.json();
      this.suggestions = json.suggestion;
      this.loadResults = false;
    } catch (error) {
      this.loadResults = false;
      console.error(error);
    }
  },
  methods: {
    setSelected(suggestion) {
      this.selected = suggestion;
      setTimeout(() => window.scroll(0, 400), 300);
    },
    selectedClass(key) {
      return this.selected === key ? "selected" : null;
    }
  },
  computed: {
    name() {
      return this.quizData.user.name;
    },
    noPadding() {
      return !this.selected ? "is-paddingless" : null;
    }
  }
};
</script>

<style scoped>
.columns {
  padding-bottom: 61vh;
}

.stretch{
  margin: 0 !important;
  padding: 0 !important;
}
.column {
  padding: 15px;
}

.result-wrapper {
  margin-top: 15px;
}

.result-box {
  background: rgb(0, 0, 0);
  min-height: 300px;
  border-radius: 15px;
  padding: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s all;
  cursor: pointer;
  position: relative;
}

.result-box .subtitle {
  color: #f177a6 !important;
  text-transform: capitalize;
  transition: 0.2s all;
}

.result-box:hover {
  background: linear-gradient(to right, rgb(57, 93, 102), rgb(34, 53, 58));
}

.result-box:hover .subtitle {
  color: #fff !important;
}

.result-box.selected {
  background: linear-gradient(to right, rgb(57, 93, 102), rgb(34, 53, 58));
}

.result-box.selected .subtitle {
  margin: 0;
  color: #fff !important;
}

.sub-more {
  position: absolute;
  display: flex;
  bottom: 30px;
  align-items: center;
}

.more-button {
  max-height: 40px;
  transition: 0.2s all;
}

.more-text {
  padding-right: 10px;
  font-size: 24px;
  color: #000942 !important;
  transition: 0.2s all;
}

.result-box:hover .more-text {
  color: #fff !important;
}

.result-box:hover .more-button {
  filter: invert(1);
}

.result-box.selected .more-text {
  display: none;
}

.result-box.selected .more-button {
  display: none;
}

@media screen and (max-width: 991px) {
  .columns {
    padding-bottom: unset;
  }

  .result-box {
    min-height: 150px;
  }

  .sub-more {
    bottom: 15px;
  }

  .more-button {
    max-height: 15px;
  }

  .more-text {
    font-size: 16px;
  }
}
</style>
