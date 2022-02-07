import path from "path"

import resolve from "rollup-plugin-node-resolve"
import builtins from "rollup-plugin-node-builtins"
import commonjs from "rollup-plugin-commonjs"
import typescript from "rollup-plugin-typescript"
import { terser } from "rollup-plugin-terser"
import copy from "rollup-plugin-copy"

function generate(name, input, output, definitionFile = null) {
  return {
    input,
    output: [
      builder("umd", output, name),
      builder("esm", output.replace(".js", ".esm.js"), name),
    ],
    plugins:
      definitionFile !== null
        ? [
            ...plugins,
            copy({
              targets: [
                {
                  src: definitionFile,
                  dest: path.dirname(output) + path.sep,
                  rename: "index.d.ts",
                },
              ],
            }),
          ]
        : plugins,
  }
}
function builder(format, filename, name) {
  return {
    exports: "named",
    name,
    file: filename,
    format,
  }
}

const plugins = [
  resolve({ preferBuiltins: false }),
  builtins(),
  typescript(),
  commonjs({ extensions: [".ts", ".js"] }),
]

const config = [generate("LightEngine", "./src/app.ts", "./light.js")]

if ("BUILD" in process.env) {
  plugins.push(terser())
  config.push(
    generate(
      "Core",
      "./src/core/index.ts",
      "./core/index.js",
      "./types/core.d.ts"
    ),
    generate(
      "Hooks",
      "./src/hooks/index.ts",
      "./hooks/index.js",
      "./types/hooks.d.ts"
    ),
    generate(
      "Managers",
      "./src/managers/index.ts",
      "./managers/index.js",
      "./types/managers.d.ts"
    ),
    generate(
      "GameObjects",
      "./src/objects/index.ts",
      "./gameobjects/index.js",
      "./types/gameobjects.d.ts"
    ),
    generate(
      "Entities",
      "./src/objects/entities/index.ts",
      "./entities/index.js",
      "./types/entities.d.ts"
    ),
    generate(
      "States",
      "./src/states/index.ts",
      "./states/index.js",
      "./types/states.d.ts"
    ),
    generate(
      "Nodes",
      "./src/objects/nodes/index.ts",
      "./nodes/index.js",
      "./types/nodes.d.ts"
    )
  )
}

export default config
