all:
	@cp lib/textile.js textile.js
	@uglifyjs -o textile.min.js textile.js

clean:
	@rm textile.js
	@rm textile.min.js

.PHONY: clean all
