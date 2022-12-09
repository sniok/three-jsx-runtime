Babel.registerPreset("three-jsx", {
  plugins: [
    [
      Babel.availablePlugins["transform-react-jsx"],
      {
        runtime: "automatic",
        importSource: "https://unpkg.com/three-jsx-runtime@0.0.5",
      },
    ],
  ],
});
