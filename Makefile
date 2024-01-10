clean:
	rm -rf scripts/node_modules

deps:
	cd scripts && npm install --legacy-peer-deps

_zip-app-client:
	tar -czf avni-media-client-$(env).tgz  -C client . --totals --checkpoint=1000

_zip-app-server:
	tar -czf avni-media-server-$(env).tgz  -C server . --totals --checkpoint=1000

zip-app-client-prod:
	make _zip-app-client env=prod

zip-app-client-staging:
	make _zip-app-client env=staging

zip-app-client-prerelease:
	make _zip-app-client env=prerelease

zip-app-client-rwb-prod:
	make _zip-app-client env=rwb-prod

zip-app-client-rwb-staging:
	make _zip-app-client env=rwb-staging

zip-app-server-prod:
	make _zip-app-server env=prod

zip-app-server-staging:
	make _zip-app-server env=staging

zip-app-server-prerelease:
	make _zip-app-server env=prerelease

zip-app-server-rwb-prod:
	make _zip-app-server env=rwb-prod

zip-app-server-rwb-staging:
	make _zip-app-server env=rwb-staging