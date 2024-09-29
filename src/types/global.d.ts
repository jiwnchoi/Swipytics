declare global {
  namespace JSX {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    type IntrinsicElements = Record<string, any>;

    interface IntrinsicAttributes {
      [`data-log-${string}`]?: {
        key: string;
        data: object;
      };
    }
  }
}

export {};
