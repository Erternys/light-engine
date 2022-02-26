import fs from "fs"

fs.copyFile("./types/index.d.ts", "./index.d.ts", () => {})
fs.copyFile("./types/globals.d.ts", "./globals.d.ts", () => {})
fs.copyFile(
  "./types/animations/index.d.ts",
  "./animations/index.d.ts",
  () => {}
)
fs.copyFile("./types/core/index.d.ts", "./core/index.d.ts", () => {})
fs.copyFile("./types/drawing/index.d.ts", "./drawing/index.d.ts", () => {})
fs.copyFile("./types/entities/index.d.ts", "./entities/index.d.ts", () => {})
fs.copyFile(
  "./types/gameobjects/index.d.ts",
  "./gameobjects/index.d.ts",
  () => {}
)
fs.copyFile("./types/hooks/index.d.ts", "./hooks/index.d.ts", () => {})
fs.copyFile("./types/loaders/index.d.ts", "./loaders/index.d.ts", () => {})
fs.copyFile("./types/managers/index.d.ts", "./managers/index.d.ts", () => {})
fs.copyFile("./types/nodes/index.d.ts", "./nodes/index.d.ts", () => {})
fs.copyFile("./types/states/index.d.ts", "./states/index.d.ts", () => {})
