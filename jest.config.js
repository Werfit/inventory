const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  collectCoverage: true,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "~/(.*)": "<rootDir>/src/$1",
  },
};

const transformIgnorePackages = [
  "@formatjs/icu-messageformat-parser",
  "@formatjs/icu-skeleton-parser",
  "@formatjs/fast-memoize",
  "next-intl",
  "use-intl",
  "intl-messageformat",
  "tslib",
];

module.exports = async () => ({
  ...(await createJestConfig(customJestConfig)()),

  // https://github.com/vercel/next.js/issues/36077#issuecomment-1096635363
  transformIgnorePatterns: [
    `node_modules/(?!${transformIgnorePackages.join("|")})`,
  ],
});
