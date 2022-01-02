import { mount } from "@vue/test-utils";
import Navbar from "@/components/TestFolder/Navbar.vue";
import Signup from "@/components/TestFolder/Signup.vue";

beforeEach(() => {
  const el = document.createElement("div");
  el.id = "modal";
  document.body.appendChild(el);
});

afterEach(() => {
  document.body.outerHTML = "";
});

test("teleport", async () => {
  const wrapper = mount(Navbar);

  const signup = wrapper.getComponent(Signup);

  await signup.get("input").setValue("valid_username");
  await signup.get("form").trigger("submit.prevent");

  expect(signup.emitted().signup[0]).toEqual(["valid_username"]);
});
