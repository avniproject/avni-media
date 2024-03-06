clean:
	rm -rf node_modules

deps:
	npm install --legacy-peer-deps

define _create_env
	cp ./env-templates/$1.template .env
endef

start:
	$(call _create_env,development)
	npm run dev

start-local-staging:
	$(call _create_env,local.staging)
	npm run dev

_build-app:
	$(call _create_env,)
	npm run build

build-app:
	$(call _create_env,development)
	npm run build

build-app-prod:
	$(call _create_env,production)
	npm run build

build-app-staging:
	$(call _create_env,staging)
	npm run build

build-app-prerelease:
	$(call _create_env,prerelease)
	npm run build

build-app-rwb-prod:
	$(call _create_env,rwb.production)
	npm run build

build-app-rwb-staging:
	$(call _create_env,rwb.staging)
	npm run build
