NIX_RUN = nix-shell --run 
BASH_RUN = bash -c 
DOCKER_ORG = ponelat
PLATFORMS?=linux/amd64,linux/arm64

# Check if nix-shell exists, use that. Else use bash.
# Nix is a package manager that will install all the packages needed,
# else you'll need to manually ensure you have all dependencies (like docker, docker-compose, nodejs, caddy, etc)
ifneq (, $(shell which nix-shell))
RUN := $(NIX_RUN)
else
RUN := $(BASH_RUN)
endif

help: ## Prints help for targets with comments
	@grep -E '^[a-zA-Z._-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		sort | \
		awk 'BEGIN {\
				FS = ":.*?## "; \
				print "If you are lost, read the README.md.\nList of tasks.\n";\
			}; { \
		    printf "\033[36m%-30s\033[0m %s\n", $$1, $$2; \
			}'

dependencies: ## Prints list of dependencies in the project (for non-nix users)
	@grep -E '^ *[a-zA-Z._-]+ *.*?## .*$$' shell.nix | \
		sort | \
		awk 'BEGIN {FS = "## "; \
			print "List of required cli tools.\n";\
			}; { \
			split($$2, descArr, "\\(optional\\)"); \
			dep = $$1; \
			desc = $$2; \
			color = "35m"; \
			if (length(descArr) > 1) {\
			  dep = dep  " (optional)"; \
			  desc = descArr[2]; \
				color = "33m"; \
			} \
			gsub(/^[ \t]+/,"",dep); \
			gsub(/^[ \t]+/,"",desc); \
			printf "\033[%s%-30s\033[0m%s\n",color,dep,desc \
		}'

VERSION := $(shell $(RUN) "npm pkg get version")
print-version: ## Print version in package.json
	@echo $(VERSION)
docker-release: ## Build/Push (multi-arch) docker images to ponelat/overlays-cli
	$(RUN) "docker buildx create --name overlays-cli --node overlays-cli"
	$(RUN) "docker buildx use overlays-cli"
	$(RUN) "docker buildx build --platform '${PLATFORMS}' --push -t ponelat/overlays-cli:latest -t ponelat/overlays-cli:${VERSION} ."
	$(RUN) "docker buildx stop overlay-cli"

docker-build: ## Build local docker image only for testing. Use docker-release for main build/push.
	$(RUN) "docker buildx build -t ponelat/overlays-cli:latest ."

docker-smoke-test-basic: 
	$(RUN) "cat samples/basic.yml | docker run -i ponelat/overlays-cli:latest"

docker-smoke-test-volume: 
	$(RUN) "cat samples/x-internal.overlay.yml | docker run -i -v $$(pwd)/samples:/overlays ponelat/overlays-cli:latest"

docker-smoke-test: docker-build docker-smoke-test-basic docker-smoke-test-volume ## Try out the docker smoke tests after building an image

install: ## npm install deps (for dev only, docker does not need this)
	$(RUN) "npm install"

test-only: ## npm run test (only)
	$(RUN) "npm run test"

test: install test-only ## Run test suite after installing



