import { shallowMount } from "@vue/test-utils";
import Test from "@/components/test.vue";

// describe("test.vue", () => {
//   it("Renders props.msg when passed", () => {
//     const name = "NB";
//     const error = true;
//     const wrapper = shallowMount(Test, {
//       props: { name, error },
//     });
//     expect(wrapper.text()).toMatch(name);
//   });
// });

describe("Error", () => {
  it("error render", () => {
    const name = "NB";
    let error = true;
    const wrapper = shallowMount(Test, {
      props: { name, error },
    });
    expect(wrapper.find(".error").exists()).toBeTruthy();
    expect(wrapper.find(".success").exists()).toBeFalsy();
    error = false;

    const swrapper = shallowMount(Test, {
      props: { name, error },
    });
    expect(swrapper.find(".error").exists()).toBeFalsy();
    expect(swrapper.find(".success").exists()).toBeTruthy();
  });
});
