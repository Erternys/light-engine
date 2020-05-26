import { terser } from "rollup-plugin-terser"
import config from "./rollup.dev.config"
import { builder } from "./helper"

export default {
	input: config.input,
	output: [
		...config.output,
		builder("umd", "light.min.js"),
		builder("esm", "light.esm.min.js"),
		builder("cjs", "light.cjs.min.js"),
		builder("iife", "light.iife.min.js")
	],
	plugins: [
		...config.plugins,
		terser()
	]
}
