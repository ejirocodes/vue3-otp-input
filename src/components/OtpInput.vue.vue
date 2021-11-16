<template>
  <div><SingleOtpInput /></div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SingleOtpInput from './SingleOtpInput.vue';

export default defineComponent({
  name: 'OtpInput',
  components: {
    SingleOtpInput,
  },
  props: {
    numInputs: {
      default: 4,
    },
    separator: {
      type: String,
      default: '**',
    },
    inputClasses: {
      type: String,
    },
    inputType: {
      type: String,
      validator(value: string) {
        return ['number', 'tel', 'password'].includes(value);
      },
    },
    shouldAutoFocus: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const activeInput = ref<number>(0);
    const otp = ref<[]>([]);
    const oldOtp = ref<[]>([]);

    const handleOnFocus = (index: number) => {
      activeInput.value = index;
    };
    const handleOnBlur = () => {
      activeInput.value = -1;
    };

    // Helper to return OTP from input
    const checkFilledAllInputs = () => {
      if (otp.value.join('').length === props.numInputs) {
        return emit('on-complete', otp.value.join(''));
      }
      return 'Wait until the user enters the required number of characters';
    };
    return {
      activeInput, otp, oldOtp, handleOnBlur, handleOnFocus, checkFilledAllInputs,
    };
  },
});
</script>

<style scoped>
</style>
