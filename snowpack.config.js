// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
	optimize: {
		bundle: true,
		minify: true,
	},
	mount: {
		/* ... */
	},
	plugins: ["@snowpack/plugin-sass"],
	packageOptions: {
		/* ... */
	},
	devOptions: {
		/* ... */
	},
	buildOptions: {
		/* ... */
	},
};
