install: 
	npm ci

publish:
	npm publish --dry-run

link:
	NODE_OPTIONS=--experimental-vm-modules npx jest