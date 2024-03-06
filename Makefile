install: 
	npm ci

publish:
	npm publish --dry-run

test:
	npm test

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .