# Overlays

This is a **prototype** for digging into https://github.com/OAI/Overlay-Specification/

It is published as an npm package `overlays-cli` which includes a simple binary cli.
To use, pipe in an Overlay definition and it'll output the result as YAML.

```sh
```

**Example Overlay**

```yaml
overlays: 1.0.0
extends: https://petstore3.swagger.io/api/v3/openapi.json
actions:
  - target: '$.paths'
    remove: true
  - target: '$.components'
    remove: true
  - target: '$.info'
    update:
      title: Overlayed!
      description: |
        This API has been overlayed 😎 
```

**Example usage**

```sh
cat overlays-sample.yml | npx overlays-cli@latest
# ... and with curl
curl -sNL https://example.com | npx overlays-cli@latest
# and with a real curl
curl -sNL https://gist.githubusercontent.com/ponelat/daac5912ede1871629b6028bbe715d3a/raw/2871f9f27fb93d1c01567d198fb60cd1271e7dcf/overlay.yml | npx overlays-cli@latest

# If you clone the repo and want to run locally
cat overlays-sample.yml | node ./index.js
```

## Testing

There is a simple (I hope) test suite framework inspired by the awesome [JSON Schema test suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

```yml
# Example test
docs: https://github.com/OAI/Overlay-Specification/blob/main/versions/1.0.0.md#actionObject
test: ActionObject with remove true

refs:
  http://example.com:
    openapi: 3.0.3
    paths:
      /foo:
        get: {}
        post: {}
      /bar: {}

input:
  overlay: 1.0.0
  extends: http://example.com
  actions:
    - target: $.paths.*.*
      remove: true

output:
  openapi: 3.0.3
  paths:
    /foo: {}
    /bar: {}
```
  
# Docker

This project uses a weird Makefile that allows me to build using nix (go check nix out, it's really cool), as well as for folks who don't have nix.
Building the docker image does _NOT_ require nodejs installed, it will build the project entirely within the docker context. Which is great for consistency.

> Thanks @jasmingacic for the contribution!

# Contributing

This is a prototype, and all are welcome to hack it. Some of us are on the OpenAPI slack and discord channels if you wanna chat!


# License

This project is licensed under the [Apache 2.0 license](./LICENSE) and includes additional notes in the [NOTICE](./NOTICE) file.
