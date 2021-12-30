import { mount, VueWrapper } from "@vue/test-utils";
import TodoApp from "../../../src/components/TestFolder/TodoApp.vue";

describe("TodoApp Test", () => {
  let wrapper: VueWrapper;

  beforeAll(() => {
    console.log("mount component");
    wrapper = mount(TodoApp);
  });

  test("creates a todo", async () => {
    expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(1);

    await wrapper.get('[data-test="new-todo"]').setValue("New todo");
    await wrapper.get('[data-test="form"]').trigger("submit");

    expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(2);
  });

  test("complete a todo", async () => {
    await wrapper.get('[data-test="todo-checkbox"]').setValue(true);

    expect(wrapper.get('[data-test="todo"]').classes()).toContain("completed");
  });
});
