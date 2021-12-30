import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";

const Nav = defineComponent({
  template: `
    <nav>
      <a id="profile" href="/profile">My Profile</a>
      <a v-if="admin" id="admin" href="/admin">Admin</a>
    </nav>
  `,
  data() {
    return {
      admin: false,
    };
  },
});

describe("Nav Test", () => {
  test("renders a profile link", () => {
    const wrapper = mount(Nav);

    const profileLink = wrapper.get("#profile");

    expect(profileLink.text()).toEqual("My Profile");
  });

  test("does not render an admin link", () => {
    const wrapper = mount(Nav);

    expect(wrapper.find("#admin").exists()).toBe(false);
  });

  test("renders an admin link", () => {
    const wrapper = mount(Nav, {
      data() {
        return {
          admin: true,
        };
      },
    });

    expect(wrapper.get("#admin").text()).toEqual("Admin");
  });
});
