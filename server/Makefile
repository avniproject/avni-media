clean:
	rm -rf node_modules

deps:
	npm install --legacy-peer-deps

start:
	npm run start

start-dev:
	npm run start:dev

start-local-staging:
	cp ./env-templates/local-staging.template .env
	npm run start:dev

start-prod:
	npm run start:prod

_build-app:
	cp ./env-templates/$(template) .env
	npm run build

build-app:
	make _build-app template=development.template

build-app-prod:
	make _build-app template=production.template

build-app-staging:
	make _build-app template=staging.template

build-app-prerelease:
	make _build-app template=prerelease.template