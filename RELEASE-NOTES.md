# Upgrade Steps
- None; just checkout new tag in any existing `npm link`ed repository

# Breaking Changes
- `yarn` is required by the consumer now in addition to `npm` and `node`

# New Features
- N/A

# Bug Fixes
- Replaced npm with yarn to workaround bug similar to https://github.com/npm/npm/issues/17929

# Improvements
- The jest and typescript initiators are now run at post-install
- Post install actions moved from `npm` run script to generator `end` hook 
- Additional `npm` run scripts in resulting `package.json`
- Additional dependencies included in `package.json`

# Other Changes
- Removed dependency on base generator `generator-dotfiles`
