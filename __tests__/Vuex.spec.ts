import { defineComponent, createApp } from "vue";
import { createStore, Store } from "vuex";
import { mount } from "@vue/test-utils";

interface State {
  count: number;
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}

const store = createStore({
  state() {
    return {
      count: 0,
    };
  },
  mutations: {
    increment(state: State) {
      state.count += 1;
    },
  },
});

const App = defineComponent({
  template: `
    <div>
      <button @click="increment" />
      Count: {{ count }}
    </div>
  `,
  computed: {
    count() {
      return this.$store.state.count;
    },
  },
  methods: {
    increment() {
      this.$store.commit("increment");
    },
  },
});

const app = createApp(App);
app.use(store);

test("vuex", async () => {
  const wrapper = mount(App, {
    global: {
      plugins: [store],
    },
  });

  await wrapper.find("button").trigger("click");

  expect(wrapper.html()).toContain("Count: 1");
});

test("vuex using a mock store", async () => {
  const $store = {
    state: {
      count: 25,
    },
    commit: jest.fn(),
  };

  const wrapper = mount(App, {
    global: {
      mocks: {
        $store,
      },
    },
  });

  expect(wrapper.html()).toContain("Count: 25");
  await wrapper.find("button").trigger("click");
  expect($store.commit).toHaveBeenCalled();
});

test("increment mutation", () => {
  const store = createStore({
    state: {
      count: 0,
    },
    mutations: {
      increment(state) {
        state.count += 1;
      },
    },
  });

  store.commit("increment");

  expect(store.state.count).toBe(1);
});

const createVuexStore = (initialState: State) =>
  createStore({
    state: {
      //count: 0,
      ...initialState,
    },
    mutations: {
      increment(state, value = 1) {
        state.count += value;
      },
    },
  });

test("increment mutation without passing a value", () => {
  const store = createVuexStore({ count: 20 });
  store.commit("increment");
  expect(store.state.count).toBe(21);
});

test("increment mutation with a value", () => {
  const store = createVuexStore({ count: -10 });
  store.commit("increment", 15);
  expect(store.state.count).toBe(5);
});
