import { mount } from "@vue/test-utils";
import SingleOtp from "@/single-otp-input.vue";

describe("SingleOtpInput.vue", () => {
  it("renders input type", () => {
    const wrapper = mount(SingleOtp);
    const singleInput = wrapper.find('[data-test="single-input"]');
    expect(singleInput.attributes("type")).toBe("tel");
  });

  it("renders input mode", () => {
    const wrapper = mount(SingleOtp);
    const singleInput = wrapper.get('[data-test="single-input"]');

    expect(singleInput.attributes("inputmode")).toBe("numeric");
  });

  it("should add a new OTP value", async () => {
    const wrapper = mount(SingleOtp);
    const singleInput = wrapper.get('[data-test="single-input"]');

    await singleInput.trigger("focus");
    await singleInput.trigger("input");
    await singleInput.setValue("2");

    const inputField: HTMLInputElement = wrapper.find(
      '[data-test="single-input"]'
    ).element as HTMLInputElement;

    expect(inputField.value).toBe("2");
  });
});
