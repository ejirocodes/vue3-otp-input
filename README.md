# vue3-otp-input

> Vue 3 OTP Input is a 5.0 KB fully customizable OTP (one-time password) input component for OTPs, transaction pins, and passwords built with Vue 3.x and Vue Composition API..

## 📹 Demo

![Gifphy](https://media.giphy.com/media/Db04PkC7vMzqksOpq6/giphy.gif)

## ⚙️ Installation

To install the latest stable version:

```sh
npm i vue3-otp-input
```

OR

```sh
yarn add vue3-otp-input
```

OR

Without Build Tools

```sh
<script src="https://unpkg.com/vue3-otp-input"></script>
```

## 📖 Usage

### 1/3. Register as a Vue component locally OR

```javascript

<script>
// Import in a Vue component
import VOtpInput from 'vue3-otp-input';

export default defineComponent({
  name: 'App',
  components: {
    VOtpInput,
  },
  setup() {
    const otpInput = ref(null)

    const handleOnComplete = (value: string) => {
      console.log('OTP completed: ', value);
    };

    const handleOnChange = (value: string) => {
      console.log('OTP changed: ', value);
    };

     const clearInput = () => {
      otpInput.value.clearInput()
    }

    return { handleOnComplete, handleOnChange, clearInput, otpInput };
  },
});
</script>

```

### 1/3. Register as a Vue component globally

```js
//  main.js or main.ts
import { createApp } from 'vue'
import App from './App.vue'

import VOtpInput from "vue3-otp-input";

const app = createApp(App)

app.component('v-otp-input', VOtpInput).mount('#app')

```

### 2/3. Use the registered component in your Vue template

```html
<template>
  <div style="display: flex; flex-direction: row;">
    <v-otp-input
      ref="otpInput"
      input-classes="otp-input"
      separator="-"
      :num-inputs="4"
      :should-auto-focus="true"
      :is-input-num="true"
      :conditionalClass="['one', 'two', 'three', 'four']"
      :placeholder="['*', '*', '*', '*']"
      @on-change="handleOnChange"
      @on-complete="handleOnComplete"
    />
  </div>
  <button @click="clearInput()">Clear Input</button>
</template>
```

### 3/3 [Optional]. Some basic styling options

#### This css has to go into a `<style>` tag which does not have scoped attributed

```css
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
/* Background colour of an input field with value */
.otp-input.is-complete {
  background-color: #e4e4e4;
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
```

## 🍔 Props

<table>
  <tr>
    <th>Name<br></th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>num-inputs</td>
    <td>number</td>
    <td><strong>true</strong></td>
    <td>4</td>
    <td>Number of OTP inputs to be rendered.</td>
  </tr>
  <tr>
    <td>separator</td>
    <td>component<br></td>
    <td>false</td>
    <td></td>
    <td>Provide a custom separator between inputs by passing a component. For instance, <code>&lt;span&gt;-&lt;/span&gt;</code> would add <code>-</code> between each input</td>
  </tr>
  <tr>
    <td>input-classes</td>
    <td>className (string)</td>
    <td>false</td>
    <td>none</td>
    <td>Style applied or class passed to each input.</td>
  </tr>
  <tr>
      <td>input-type</td>
      <td>string</td>
      <td>false</td>
      <td>"tel"</td>
      <td>Input type. Optional value: "password", "number", "tel", "letter-numeric".</td>
  </tr>
  <tr>
      <td>inputmode</td>
      <td>string</td>
      <td>false</td>
      <td>"numeric"</td>
      <td>This allows a browser to display an appropriate virtual keyboard. Optional value: "numeric", "text", "tel". [Learn More](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode)</td>
  </tr>
  <tr>
    <td>should-auto-focus</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>Auto focuses input on inital page load.</td>
  </tr>
  <tr>
    <td>placeholder</td>
    <td>array</td>
    <td>false</td>
    <td>[]</td>
    <td>Specify an expected value for each input. Example: <code>:placeholder="['*', '*', '*', '*']"</code>. The length of this array should be equal to <code>num-inputs</code>.</td>
  </tr>
  <tr>
    <td>conditionalClass</td>
    <td>array</td>
    <td>false</td>
    <td>[]</td>
    <td> Specify a class to be applied to each input based on the value of the input. Example: <code>:conditionalClass="['one', 'two', 'three', 'four']"</code>. The length of this array should be equal to <code>num-inputs</code>.</td>
  </tr>
  <tr>
    <td>is-disabled</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>Disables all the input fields.</td>
  </tr>
</table>

## 🤺 Methods

<table>
  <tr>
    <th>Name<br></th>
    <th>Description</th>
  </tr>
  <tr>
     <td>clearInput()</td>
     <td>Use with ref for clearing all otp inputs, see code example section.</td>
  </tr>
</table>

## 🐴 Events

<table>
  <tr>
    <th>Name<br></th>
    <th>Description</th>
  </tr>
  <tr>
     <td>on-change</td>
     <td>Return OTP code was changing when we made a change in inputs.</td>
    </tr>
  <tr>
    <td>on-complete</td>
    <td>Return OTP code typed in inputs.</td>
  </tr>
</table>

## 🤟🏽 License

[MIT](https://choosealicense.com/licenses/mit/)

## 📓 Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.

## 🧸 Appendix

This component is a rewite of [vue-otp-input](https://github.com/bachdgvn/vue-otp-input) component to support Vue 3.x. Feel free to use it in your project, report bugs and make PR 👏🏽.
