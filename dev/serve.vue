<script lang="ts">
import { defineComponent } from "vue";
import Vue3OtpInput from "@/vue3-otp-input.vue";

export default defineComponent({
  name: "ServeDev",
  components: {
    Vue3OtpInput,
  },
  setup() {
    const handleOnComplete = (value: string) => {
      console.log("OTP completed: ", value);
    };
    const handleOnChange = (value: string) => {
      console.log("OTP changed: ", value);
    };

    return { handleOnComplete, handleOnChange };
  },
});
</script>

<template>
  <div id="app">
    <div style="display: flex; flex-direction: row">
      <vue3-otp-input
        ref="otpInput0"
        input-classes="otp-input"
        :conditionalClass="['one', 'two', 'three', 'four']"
        separator="-"
        inputType="letter-numeric"
        :num-inputs="4"
        :should-auto-focus="true"
        @on-change="handleOnChange"
        @on-complete="handleOnComplete"
        :placeholder="['*', '*', '*', '*']"
      />
    </div>
  </div>
</template>

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
.otp-input.is-complete {
  background-color: #e4e4e4;
}
.otp-input.error {
  border: 1px solid red !important;
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input::placeholder {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
}
</style>
