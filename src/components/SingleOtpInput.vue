<template>
  <div>
    <input
      :type="inputType"
      ref="inputSingle"
      min="0"
      max="9"
      maxlength="1"
      pattern="[0-9]"
      v-model="model"
      :class="inputClasses"
      @input="handleOnChange"
      @keydown="handleOnKeyDown"
      @paste="handleOnPaste"
      @focus="handleOnFocus"
      @blur="handleOnBlur"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';

export default defineComponent({
  name: 'SingleOtpInput',
  props: {
    inputType: {
      type: String,
      default: 'tel',
    },
    value: {
      type: String,
    },
    separator: {
      type: String,
    },
    focus: {
      type: Boolean,
    },
    inputClasses: {
      type: String,
    },
    shouldAutoFocus: {
      type: Boolean,
    },
    isLastChild: {
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const model = ref(props.value || '');
    const inputSingle = ref<HTMLInputElement | null>(null) as Ref<HTMLInputElement>;

    const handleOnChange = () => {
      if (model.value.length > 1) {
        model.value = model.value.slice(0, 1);
      }
      return emit('on-change', model.value);
    };

    const isCodeNumeric = (charCode: number) => (charCode >= 48 && charCode <= 57) || (charCode >= 96 && charCode <= 105);
    // numeric keys and numpad keys

    const handleOnKeyDown = (event: KeyboardEvent) => {
      // Only allow characters 0-9, DEL, Backspace and Pasting
      const keyEvent = event || window.event;
      const charCode = keyEvent.which ? keyEvent.which : keyEvent.keyCode;
      if (
        isCodeNumeric(charCode)
        || charCode === 8
        || charCode === 86
        || charCode === 46
      ) {
        emit('on-keydown', event);
      } else {
        keyEvent.preventDefault();
      }
    };

    const handleOnPaste = (event: KeyboardEvent) => emit('on-paste', event);

    const handleOnFocus = () => {
      inputSingle.value.select();
      return emit('on-focus');
    };

    const handleOnBlur = () => emit('on-blur');

    return {
      handleOnChange,
      handleOnKeyDown,
      handleOnPaste,
      handleOnFocus,
      handleOnBlur,
      inputSingle,
      model,
    };
  },
});
</script>

<style scoped>
</style>
