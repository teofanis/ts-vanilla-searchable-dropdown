import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import pkg from "../package.json";

export default [
  // browser-friendly UMD build
  {
    input: "index.ts",
    output: {
      name: "index",
      file: pkg.browser,
      format: "umd",
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
  },
];
