module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "es6": true,
        "amd": true
    },
    "settings": {
        "react": {
          "pragma": "React", 
          "version": "16.4",
        },
    },
    "parserOptions": {
        "ecmaVersion": 2017,
        "sourceType": "module"
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "rules": {
        "linebreak-style": [
            "error",
            "unix"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-extra-boolean-cast": 0,
        "curly": 2,
        "eqeqeq": 2,
        "no-new": 2,
        "max-params": [ "error", 5 ],
        "max-depth": [ "error", 5 ],
        "max-statements": [ "error", 5 ],
        'no-console': 'off',
    }
}