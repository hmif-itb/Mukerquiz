<template>
  <img :style="style" src="../assets/arrow.png" class="next-button" alt="next" />
</template>

<script>
export default {
  name: "NextButton",
  props: {
    down: Boolean,
    up: Boolean
  },
  computed: {
    style() {
      if (this.down) {
        return "transform: rotate(90deg)";
      } else if (this.up) {
        return "transform: rotate(-90deg)";
      } else {
        return null;
      }
    }
  }
};
</script>

<style>
.next-button {
  cursor: pointer;
  position: fixed;
  right: 15%;
  bottom: 100px;
  width: auto;
  max-height: 80px;
  filter: invert(1);
}

@media screen and (max-width: 991px) {
  .next-button {
    right: 25px;
    bottom: 35px;
    max-height: 45px;
  }
}
</style>
