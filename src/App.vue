<template>
  <h2>Input type default = "tel"</h2>
  <div style="display: flex; flex-direction: row">
    <v-otp-input
      ref="otpInput0"
      input-classes="otp-input"
      separator="-"
      :num-inputs="4"
      :focus="true"
      :should-auto-focus="true"
      @on-change="handleOnChange"
      @on-complete="handleOnComplete"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import OtpInput from './components';

export default defineComponent({
  name: 'App',
  components: {
    'v-otp-input': OtpInput,
  },
  setup() {
    const handleOnComplete = (value: string) => {
      // console.log('OTP completed: ', value);
    };
    const handleOnChange = (value: string) => {
      // console.log('OTP changed: ', value);
    };

    return { handleOnComplete, handleOnChange };
  },
});
</script>

<style>
.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}
.otp-input.error {
  border: 1px solid red !important;
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
