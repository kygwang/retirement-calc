<template>
  <div @click="handleDrag">
    <vue-slider
      v-model="newValue"
      :interval="10"
      @change="handleChange"
      :min="0"
      :mask="mask"
      :max="max || 100"
      width="300"
      height="30px"
      :tooltip="'none'"
      @drag-end="handleDrag"
      :lazy="true"
      :disabled="disabled"
    >
      <template v-slot:dot> <span class="custom-inner-dot" /> </template
    ></vue-slider>
  </div>
</template>

<script>
export default {
  name: "vue-custom-slider",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    max: {
      type: Number,
      default: 100,
    },
    value: {
      type: Number,
      default: 0,
    },
    mask: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      newValue: this.value,
    };
  },

  methods: {
    handleDrag() {
      this.$emit("handleDrag");
    },
    handleChange(e) {
      this.$emit("input", e);
    },
  },
  watch: {
    value(val) {
      this.newValue = val;
    },
  },
};
</script>

<style>
.r-container .vue-slider-disabled .vue-slider-process {
  border-radius: 0px;
  background: #bdbdbd;
}
</style>
