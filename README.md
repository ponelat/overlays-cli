# Overlays

This is a **prototype** for digging into https://github.com/OAI/Overlay-Specification/

It is published as an npm package `overlays-cli` which includes a simple binary cli.
To use, pipe in an Overlay definition and it'll output the result as YAML.

```sh
curl -sNL https://gist.githubusercontent.com/ponelat/daac5912ede1871629b6028bbe715d3a/raw/2871f9f27fb93d1c01567d198fb60cd1271e7dcf/overlay.yml | npx overlays-cli@latest
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

# Contributing

This is a prototype, and all are welcome to hack it. Some of us are on the OpenAPI slack and discord channels if you wanna chat!
