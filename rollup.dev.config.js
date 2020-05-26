import resolve from "rollup-plugin-node-resolve"
import builtins from "rollup-plugin-node-builtins"
import commonjs from "rollup-plugin-commonjs"
import typescript from "rollup-plugin-typescript"
import { builder } from "./helper"

export default {
	input: "src/app.ts",
	output: [
		builder("umd", "light.js"),
		builder("esm", "light.esm.js"),
		builder("cjs", "light.cjs.js"),
		builder("iife", "light.iife.js")
	],
	plugins: [
		resolve({preferBuiltins: true}),
		builtins(),
		typescript(),
		commonjs({extensions: [".ts", ".js"]})
	]
}
