import { useRouter, useRoute } from "vue-router";
import { defineComponent } from "vue";
import { mount } from "@vue/test-utils";

const Component = defineComponent({
  template: `<button @click="redirect">Click to Edit</button>`,
  props: ["isAuthenticated"],
  setup(props) {
    const router = useRouter();
    const route = useRoute();

    const redirect = () => {
      if (props.isAuthenticated) {
        router.push(`/posts/${route.params.id}/edit`);
      } else {
        router.push("/404");
      }
    };

    return {
      redirect,
    };
  },
});

jest.mock("vue-router", () => ({
  useRoute: jest.fn(),
  useRouter: jest.fn(() => ({
    push: () => {
      void 0;
    },
  })),
}));

const useRouteJM = useRoute as jest.Mock;
const useRouterJM = useRouter as jest.Mock;

test("allows authenticated user to edit a post", async () => {
  useRouteJM.mockImplementationOnce(() => ({
    params: {
      id: 1,
    },
  }));

  const push = jest.fn();
  useRouterJM.mockImplementationOnce(() => ({
    push,
  }));

  const wrapper = mount(Component, {
    props: {
      isAuthenticated: true,
    },
    global: {
      mocks: {
        // No need for the mocks
      },
    },
  });

  await wrapper.find("button").trigger("click");

  expect(push).toHaveBeenCalledTimes(1);
  expect(push).toHaveBeenCalledWith("/posts/1/edit");
});

test("redirect an unauthenticated user to 404", async () => {
  useRouteJM.mockImplementationOnce(() => ({
    params: {
      id: 1,
    },
  }));

  const push = jest.fn();
  useRouterJM.mockImplementationOnce(() => ({
    push,
  }));

  const wrapper = mount(Component, {
    props: {
      isAuthenticated: false,
    },
  });

  await wrapper.find("button").trigger("click");

  expect(push).toHaveBeenCalledTimes(1);
  expect(push).toHaveBeenCalledWith("/404");
});
