all:
	@cp lib/textile.js textile.js
	@uglifyjs -o textile.min.js textile.js

clean:
	@rm textile.js
	@rm textile.min.js

test:
	@node test/index.js

.PHONY: clean all test
