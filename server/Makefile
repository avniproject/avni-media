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

_zip-app:
	cp ./env-templates/$(template) .env
	npm run build
	tar -czvf avni-media-server.tgz  .
	cp ./env-templates/development.template .env

_zip-app-only:
	cp ./env-templates/$(template) .env
	tar -czvf avni-media-server.tgz .
	cp ./env-templates/development.template .env

zip-app-prod:
	make _zip-app template=production.template

zip-app-staging:
	make _zip-app template=staging.template

zip-app-only-prod:
	make _zip-app-only template=production.template

zip-app-only-staging:
	make _zip-app-only template=staging.template
