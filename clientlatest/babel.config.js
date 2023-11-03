module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['react-native-reanimated/plugin'],
  env: {
    // Only used modules are imported instead of whole library for smaller bundle size
    // See: https://callstack.github.io/react-native-paper/docs/guides/getting-started/
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
