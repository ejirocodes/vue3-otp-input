# vue-otp-input

> A fully customizable, OTP (one-time-password) input component built with Vue 3.x and Vue Composition API.

![Gifphy](https://media.giphy.com/media/W4RTzsjgQF447EfNPX/giphy.gif)

## Installation

To install the latest stable version:

```
npm i vue3-otp-input
```

OR

```
yarn add vue3-otp-input
```

Code example:

```javascript

<script>
import OtpInput from 'vue3-otp-input';

export default defineComponent({
  name: 'App',
  components: {
    'v-otp-input': OtpInput,
  },
  setup() {
    const handleOnComplete = (value: string) => {
      console.log('OTP completed: ', value);
    };
    const handleOnChange = (value: string) => {
      console.log('OTP changed: ', value);
    };
    return { handleOnComplete, handleOnChange };
  },
});
</script>

<template>
  <div style="display: flex; flex-direction: row;">
    <OtpInput
      ref="otpInput"
      input-classes="otp-input"
      separator="-"
      :num-inputs="4"
      :should-auto-focus="true"
      :is-input-num="true"
      @on-change="handleOnChange"
      @on-complete="handleOnComplete"
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
</style>
```

## Props

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
      <td>Input type. Optional value: "password", "number", "tel".</td>
    </tr>
  <tr>
    <td>should-auto-focus</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>Auto focuses input on inital page load.</td>
  </tr>
</table>

## Methods

<table>
  <tr>
    <th>Name<br></th>
    <th>Description</th>
  </tr>
  <tr>
     <td>clearInput()</td>
     <td>Use with $refs for clearing all otp inputs, see code example section.</td>
  </tr>
</table>

## Events

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

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.

## Appendix

This component is a rewite of the original [vue-otp-input](https://github.com/bachdgvn/vue-otp-input) component to support Vue 3.x and Vue Composition API. Feel free to use it in your project, report bugs and make PR 👏🏽.
