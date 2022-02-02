declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $translate: (key: string) => string;
  }
}

export interface Lang {
  [key: string]: string | Lang;
}
