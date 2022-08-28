module.exports = {
	env: {
		es2021: true,
		node: true
	},
	extends: ['airbnb-base', 'prettier', 'eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint'],
	rules: {
		'no-console': 'warn',
		'no-use-before-define': 'error',
		// --
		'import/prefer-default-export': 'off',
		'import/extensions': 'off',
		'lines-between-class-members': 'off',
		'no-underscore-dangle': 'off',
		'import/first': 'off',
		'import/no-named-default': 'off',
		'default-param-last': 'off',
		'no-shadow': 'off',
		'default-case': 'off',
		'no-promise-executor-return': 'off',
		'class-methods-use-this': 'off',
		'arrow-body-style': 'off',
		'new-cap': 'off',
		'prefer-destructuring': 'off',
		'@typescript-eslint/no-inferrable-types': 'off',
		'import/no-extraneous-dependencies': 'off',
		camelcase: 'off',
		'consistent-return': 'off',
		'eslint-disable-next-line ': 'off',
		'no-useless-catch': 'off'
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx']
			}
		}
	}
};
