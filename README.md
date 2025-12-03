A GitHub Action for configuring npm.

```yaml
# Configure credentials for npm and GitHub Packages.
- uses: nodef/npm-config.action@v1.2.0
  with:
    credentials: |-
      registry.npmjs.org=${{secrets.NPM_TOKEN}}
      npm.pkg.github.com=${{secrets.GITHUB_TOKEN}}


# Automatically configure credentials using environment variables.
# Needs $NPM_TOKEN and $GH_TOKEN/$GITHUB_TOKEN to be set.
- uses: nodef/npm-config.action@v1.2.0
  with:
    credentials: auto


# Automatically configure credentials, add a scope for GitHub Packages,
# and allow packages to be publicly visible.
- uses: nodef/npm-config.action@v1.2.0
  with:
    entries: |-
      @myorg:registry=https://npm.pkg.github.com
      access=public
```

<br>


#### Options

```yaml
- uses: nodef/npm-config.action@v1.2.0
  with:
    path: $HOME/.npmrc  # Path to the .npmrc file
    reset: false        # Reset the .npmrc file
    credentials: |-     # Credentials to configure [auto]
      myregistry1=authtoken1
      myregistry2=authtoken2
      ...
    entries: |-         # Entries to add
      key1=value1
      key2=value2
      ...
```

<br>
<br>


## References

- [healthplace/npmrc-registry-login-action : Matthew Inamdar](https://github.com/healthplace/npmrc-registry-login-action)
- [google-github-actions/get-secretmanager-secrets](https://github.com/google-github-actions/get-secretmanager-secrets)
- [config: More than you probably want to know about npm configuration - npm Docs](https://docs.npmjs.com/cli/v9/using-npm/config)
- [npmrc: The npm config files - npm Docs](https://docs.npmjs.com/cli/v9/configuring-npm/npmrc)
- [scope: Scoped packages - npm Docs](https://docs.npmjs.com/cli/v9/using-npm/scope)
- [Creating a JavaScript Action - GitHub Docs](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action)
- [Metadata syntax for GitHub Actions - GitHub Docs](https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions)
- [How to use array input for a custom GitHub Actions](https://stackoverflow.com/a/75420778/1413259)
- [Give credentials to npm login command line](https://stackoverflow.com/a/54540693/1413259)
- [How to restore/reset npm configuration to default values?](https://stackoverflow.com/a/20934521/1413259)
- [Why does the npm userconfig not get picked up?](https://stackoverflow.com/a/52316526/1413259)

![](https://ga-beacon.deno.dev/G-RC63DPBH3P:SH3Eq-NoQ9mwgYeHWxu7cw/github.com/nodef/npm-config.action)
