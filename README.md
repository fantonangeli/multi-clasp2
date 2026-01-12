multi-clasp2
===========

This library is inspired by [multi-clasp](https://github.com/steplica/multi-clasp).

`multi-clasp2` is meant to solve a specific problem:
You have multiple google artifacts (sheets, docs, etc.) that all use the same Apps Script project.

You want them to share the same code, but making this Apps Script project into a library significantly slows its performance.

The solution is to maintain a reference to each artifact's Apps Script project, and simultaneously push changes to these projects so they can receive updates while maintaining their non-library performance.

## Install

Install `clasp`:

```sh
npm install -g @google/clasp
```

Install `multi-clasp2`:

```sh
npm install -g multi-clasp2
```

### Example File

Create a .multi-clasp.json file, which is just an array of JSON objects identical to the standard .clasp.json format.

You do not need a .clasp.json file anymore.

```
[
	{
		"scriptId": "1VBe_bo7OtOw1EQ_f86HBKSDEDdcGX3mYfCNIcp5L2tR1P-VAU8Sl7KX1",
		"rootDir": "build"
	},
	{
		"scriptId": "1VBe_bo7OtOw1EQ_f86HBKSDEDdcGX3mYfCNIcp5L2tR1P-VAU8Sl7KX2",
		"rootDir": "build"
	},
	{
		"scriptId": "1VBe_bo7OtOw1EQ_f86HBKSDEDdcGX3mYfCNIcp5L2tR1P-VAU8Sl7KX3",
		"rootDir": "build"
	}
]
```

## Commands

The following clasp commands are supported. For the documentation refer to the official [documentation](https://github.com/google/clasp)

- [`multi-clasp push [--force --retry <n>]`](https://github.com/google/clasp#push) <br>
    in addition to the clasp arguments there is the --retry option: If the push of an App Script fail with it will retry times. Default is 1.

- [`multi-clasp show-file-status [--json]`](https://github.com/google/clasp#status)
- [`multi-clasp open-script`](https://github.com/google/clasp#open)
- [`multi-clasp open-web-app`](https://github.com/google/clasp#open)
- [`multi-clasp open-container`](https://github.com/google/clasp#open)
- [`multi-clasp list-deployments`](https://github.com/google/clasp#deployments)
- [`multi-clasp deploy [--versionNumber <version>] [--description <description>]`](https://github.com/google/clasp#deploy)
- [`multi-clasp undeploy [--all]`](https://github.com/google/clasp#undeploy)
- [`multi-clasp version [description]`](https://github.com/google/clasp#version)
- [`multi-clasp versions`](https://github.com/google/clasp#versions)
- [`multi-clasp run [functionName] [--nondev] [--params <StringArray>]`](https://github.com/google/clasp#run)

