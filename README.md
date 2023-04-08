A GitHub Action for configuring npm.

```yaml
# Configure registries for npm and GitHub Packages.
- uses: nodef/npm-config.action@v0.1.0
  with:
    registries: |-
      registry.npmjs.org=${{secrets.NPM_TOKEN}}
      npm.pkg.github.com=${{secrets.GITHUB_TOKEN}}


# Automatically configure registries using environment variables.
# Needs $NPM_TOKEN and $GH_TOKEN/$GITHUB_TOKEN to be set.
- uses: nodef/npm-config.action@v0.1.0
  with:
    registries: auto


# Add a scope for GitHub Packages, and allow packages to be publicly visible
- uses: nodef/npm-config.action@v0.1.0
  with:
    registries: auto
    entries: |-
      @myorg:registry=https://npm.pkg.github.com
      access=public
```

<br>


#### Options

```yaml
- uses: nodef/npm-config.action@v0.1.0
  with:
    path: $HOME/.npmrc  # Path to the .npmrc file
    reset: false        # Reset the .npmrc file
    registries: |-      # Registries to configure
      myregistry1=authtoken1
      myregistry2=authtoken2
      ...
    entries: |-         # Additional entries to add
      key1=value1
      key2=value2
      ...
```

<br>
<br>


## References

- [healthplace/npmrc-registry-login-action : Matthew Inamdar](https://github.com/healthplace/npmrc-registry-login-action)
- [google-github-actions/get-secretmanager-secrets](https://github.com/google-github-actions/get-secretmanager-secrets)
- [npmrc: The npm config files](https://docs.npmjs.com/cli/v9/configuring-npm/npmrc)
- [GitHub Actions: Creating a JavaScript Action](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action)
- [How to use array input for a custom GitHub Actions](https://stackoverflow.com/a/75420778/1413259)
