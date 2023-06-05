clean:
	rm -rf node_modules

deps:
	npm install --legacy-peer-deps

start:
	npm run start

start-dev:
	npm run start:dev

start-prod:
	npm run start:prod

_build-app:
	cp ./env-templates/$(template) .env
	npm run build
	cp ./env-templates/development.template .env

build-app-prod:
	make _zip-app template=production.template

build-app-staging:
	make _zip-app template=staging.template