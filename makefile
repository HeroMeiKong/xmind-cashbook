dev_build:
	pnpm run build && make update_assets

update_assets:
	cp dist/assets/*.js src/assets/js/index.js && cp dist/assets/*.css src/assets/js/index.css
	# IIFE
	node ./build/IIFE.ts ./src/assets/js/index.js

test:
	node ./build/IIFE.ts ./src/assets/js/index.js