<script lang="ts" setup>
import { ref, watch } from "vue";
import SingleOtpInput from "./single-otp-input.vue";

// keyCode constants
const BACKSPACE = 8;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const DELETE = 46;

type Props = {
  value: string;
  numInputs?: number;
  separator?: string;
  inputClasses?: string | string[];
  conditionalClass?: string[];
  inputType?: "number" | "tel" | "letter-numeric" | "password";
  inputmode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search";
  shouldAutoFocus?: boolean;
  placeholder?: string[];
  isDisabled?: boolean;
  shouldFocusOrder?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  value: "",
  numInputs: 4,
  separator: "",
  inputClasses: "",
  inputmode: "text",
  shouldAutoFocus: false,
  isDisabled: false,
  placeholder: () => [],
  conditionalClass: () => [],
});

const emit = defineEmits<{
  (e: "update:value", value: string): void;
  (e: "on-change", value: string): void;
  (e: "on-complete", value: string): void;
}>();

const activeInput = ref<number>(0);
const otp = ref<string[]>([]);
const oldOtp = ref<string[]>([]);

watch(
  () => props.value,
  (val) => {
    // fix issue: https://github.com/ejirocodes/vue3-otp-input/issues/34
    if (val.length === props.numInputs || otp.value.length === 0) {
      const fill = val.split("");
      otp.value = fill;
    }
  },
  { immediate: true }
);

const handleOnFocus = (index: number) => {
  activeInput.value = index;
};
const handleOnBlur = () => {
  activeInput.value = -1;
};

// Helper to return OTP from input
const checkFilledAllInputs = () => {
  if (otp.value.join("").length === props.numInputs) {
    emit("update:value", otp.value.join(""));
    return emit("on-complete", otp.value.join(""));
  }
  return "Wait until the user enters the required number of characters";
};

// Focus on input by index
const focusInput = (input: number) => {
  activeInput.value = Math.max(Math.min(props.numInputs - 1, input), 0);
};
// Focus on next input
const focusNextInput = () => {
  focusInput(activeInput.value + 1);
};
// Focus on previous input
const focusPrevInput = () => {
  focusInput(activeInput.value - 1);
};

// Change OTP value at focused input
const changeCodeAtFocus = (value: number | string) => {
  oldOtp.value = Object.assign([], otp.value);

  otp.value[activeInput.value] = value.toString();

  if (oldOtp.value.join("") !== otp.value.join("")) {
    emit("update:value", otp.value.join(""));
    emit("on-change", otp.value.join(""));
    checkFilledAllInputs();
  }
};

// Handle pasted OTP
const handleOnPaste = (event: any) => {
  event.preventDefault();
  const pastedData = event.clipboardData
    .getData("text/plain")
    .slice(0, props.numInputs - activeInput.value)
    .split("");
  if (props.inputType === "number" && !pastedData.join("").match(/^\d+$/)) {
    return "Invalid pasted data";
  }

  if (
    props.inputType === "letter-numeric" &&
    !pastedData.join("").match(/^\w+$/)
  ) {
    return "Invalid pasted data";
  }
  // Paste data from focused input onwards
  const currentCharsInOtp = otp.value.slice(0, activeInput.value);
  const combinedWithPastedData = currentCharsInOtp.concat(pastedData);

  combinedWithPastedData.slice(0, props.numInputs).forEach(function (value, i) {
    otp.value[i] = value;
  });

  focusInput(combinedWithPastedData.slice(0, props.numInputs).length);
  return checkFilledAllInputs();
};

const handleOnChange = (value: number | string) => {
  changeCodeAtFocus(value);
  focusNextInput();
};
const clearInput = () => {
  if (otp.value.length > 0) {
    emit("update:value", "");
    emit("on-change", "");
  }
  otp.value = [];
  activeInput.value = 0;
};

const fillInput = (value: string) => {
  const fill = value.split("");
  if (fill.length === props.numInputs) {
    otp.value = fill;
    emit("update:value", otp.value.join(""));
    emit("on-complete", otp.value.join(""));
  }
};

// Handle cases of backspace, delete, left arrow, right arrow
const handleOnKeyDown = (event: KeyboardEvent, index: number) => {
  switch (event.keyCode) {
    case BACKSPACE:
      event.preventDefault();
      changeCodeAtFocus("");
      focusPrevInput();
      break;
    case DELETE:
      event.preventDefault();
      changeCodeAtFocus("");
      break;
    case LEFT_ARROW:
      event.preventDefault();
      focusPrevInput();
      break;
    case RIGHT_ARROW:
      event.preventDefault();
      focusNextInput();
      break;
    default:
      focusOrder(index);
      break;
  }
};

/**
 *
 * @param currentIndex - index of the input
 * @description - This function is used to focus the input in the order of the input index
 *
 * @example
 * 1. If the user is entering the OTP in the order of the input index, then the input will be focused in the order of the input index
 * 2. If the user is entering the OTP in the reverse order of the input index, then the input will be focused in the reverse order of the input index
 */
const focusOrder = (currentIndex: number) => {
  if (props.shouldFocusOrder) {
    setTimeout(() => {
      const len = otp.value.join("").length;
      if (currentIndex - len >= 0) {
        activeInput.value = len;
        otp.value[currentIndex] = "";
      }
    }, 100);
  }
};

defineExpose({
  clearInput,
  fillInput,
});
</script>

<template>
  <div style="display: flex" class="otp-input-container">
    <!--    To turn off autocomplete when otp-input is password-->
    <input
      v-if="inputType === 'password'"
      autocomplete="off"
      name="hidden"
      type="text"
      style="display: none"
    />
    <SingleOtpInput
      v-for="(_, i) in numInputs"
      :key="i"
      :focus="activeInput === i"
      :value="otp[i]"
      :separator="separator"
      :input-type="inputType"
      :inputmode="inputmode"
      :input-classes="inputClasses"
      :conditionalClass="conditionalClass?.[i]"
      :is-last-child="i === numInputs - 1"
      :should-auto-focus="shouldAutoFocus"
      :placeholder="placeholder?.[i]"
      :is-disabled="isDisabled"
      @on-change="handleOnChange"
      @on-keydown="handleOnKeyDown($event, i)"
      @on-paste="handleOnPaste"
      @on-focus="handleOnFocus(i)"
      @on-blur="handleOnBlur"
    />
  </div>
</template>

<style scoped></style>
