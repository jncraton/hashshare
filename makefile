all: hashshare.min.js

lint:
	npx prettier@3.6.2 --check .
	npx jshint@2.13.6
	
format:
	npx prettier@3.6.2 --write .

test: index.html lint
	pytest --browser firefox --browser chromium

hashshare.min.js: hashshare.js
	npx uglify-js@3.19.3 --compress --mangle -- $< > $@
	wc -c $@

clean:
	rm -f hashshare.min.js
