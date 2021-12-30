import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";

const Counter = defineComponent({
  template: '<button @click="handleClick">Increment</button>',
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    handleClick() {
      this.count += 1;
      this.$emit("increment", {
        count: this.count,
        isEven: this.count % 2 === 0,
      });
    },
  },
});

test("emits an event when clicked", () => {
  const wrapper = mount(Counter);

  wrapper.find("button").trigger("click");
  wrapper.find("button").trigger("click");

  expect(wrapper.emitted("increment")).toHaveLength(2);

  expect((wrapper.emitted("increment") as unknown[])[0]).toEqual([
    {
      count: 1,
      isEven: false,
    },
  ]);

  expect((wrapper.emitted("increment") as unknown[])[1]).toEqual([
    {
      count: 2,
      isEven: true,
    },
  ]);
});
