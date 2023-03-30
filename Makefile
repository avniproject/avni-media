clean:
	rm -rf scripts/node_modules

deps:
	cd scripts && npm install --legacy-peer-deps
