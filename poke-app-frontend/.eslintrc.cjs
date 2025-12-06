module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: ['*.cjs', '*.js'],
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  parserOptions: {
    project: ['./tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/require-default-props': [
      'error',
      {
        forbidDefaultForRequired: true,
        ignoreFunctionalComponents: true,
      },
    ],
  },
}
