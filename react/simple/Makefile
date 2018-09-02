SHELL := /bin/bash
export PATH := ./node_modules/.bin/:$(PATH)

JS_SRC_FILES := $(shell find js -type f -name '*.js')

dist/app.js: $(JS_SRC_FILES)
	eslint $<
	mkdir -p dist
	NODE_ENV=production browserify -o $@ $< --debug --transform [ babelify --presets [ es2015 ] --plugins [ babel-plugin-transform-runtime babel-plugin-transform-async-to-generator babel-plugin-transform-react-jsx babel-plugin-transform-class-properties babel-plugin-transform-object-rest-spread ] ] -g uglifyify