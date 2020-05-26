export function builder(format, filename){
	return {
		exports: "named",
		name: "LightEngine",
		file: "lib/" + filename,
		format
	}
}