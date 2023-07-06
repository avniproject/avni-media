clean:
	rm -rf scripts/node_modules

deps:
	cd scripts && npm install --legacy-peer-deps

_zip-app-client:
	tar -czvf avni-media-client-$(env).tgz  -C client .

_zip-app-server:
	tar -czvf avni-media-server-$(env).tgz  -C server .

zip-app-client-prod:
	make _zip-app-client env=prod

zip-app-client-staging:
	make _zip-app-client env=staging

zip-app-client-prerelease:
	make _zip-app-client env=prerelease

zip-app-server-prod:
	make _zip-app-server env=prod

zip-app-server-staging:
	make _zip-app-server env=staging

zip-app-server-prerelease:
	make _zip-app-server env=prerelease