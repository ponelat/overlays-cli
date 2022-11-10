PLATFORM?=linux/amd64

build:
	docker buildx build --platform ${PLATFORM} -t overlay-cli .