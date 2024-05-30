<script setup lang="ts">
import { ref, unref } from "vue";
import Vue3OtpInput from ".";

const otpInput = ref<InstanceType<typeof Vue3OtpInput> | null>(null);
const bindValue = ref("");

const handleOnComplete = (value: string) => {
  console.log("OTP completed: ", value);
  console.log("OTP v-model:value: ", unref(bindValue));
};

const handleOnChange = (value: string) => {
  console.log("OTP changed: ", value);
  console.log("OTP v-model:value: ", unref(bindValue));
};
const clear = () => {
  if (unref(otpInput)) {
    (unref(otpInput) as any).clearInput();
  }
};

const fill = () => {
  if (unref(otpInput)) {
    unref(otpInput)?.fillInput("12ee99");
  }
};
</script>

<template>
  <div style="display: flex; flex-direction: row">
    <button @click="clear">clear</button>
    <button @click="fill">fill</button>
    <vue3-otp-input
      ref="otpInput"
      input-classes="otp-input"
      :conditionalClass="['one', 'two', 'three', 'four']"
      separator="-"
      inputType="letter-numeric"
      :num-inputs="4"
      v-model:value="bindValue"
      :should-auto-focus="true"
      :should-focus-order="true"
      @on-change="handleOnChange"
      @on-complete="handleOnComplete"
      :placeholder="['*', '*', '*', '*']"
      @update:value="bindValue = $event"
    />
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
