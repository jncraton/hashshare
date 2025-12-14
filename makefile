all: hashshare.min.js

hashshare.min.js: hashshare.js
	npx uglify-js@3.19.3 --compress --mangle -- $< > $@
	wc -c $@
