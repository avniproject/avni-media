clean:
	rm -rf node_modules

deps:
	npm install --legacy-peer-deps

start:
	npm run dev

_build-app:
	cp ./env-templates/$(template) .env
	npm run build

build-app:
	make _build-app template=development.template

build-app-prod:
	make _build-app template=production.template

build-app-staging:
	make _build-app template=staging.template

