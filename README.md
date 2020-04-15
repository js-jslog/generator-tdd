# generator-tdd
A Yeoman Generator to create a simple tdd project

If the eslint configuration generator invites you to install dependencies which are not yet included then you can accept but it would be wise to run `yarn install` again afterwards as `npm` has been shown to remove required dependencies at this stage. It is probably lying at any rate since all the dependencies required for an IDE integrated elint setup with airbnb config extensions is already included as part of the generator.

Following completion, the following actions must be taken:

- Add the following to the `plugins` section of the eslint config. Each may or may not be relevant depending on the config setup you have requested:
  - 'jest'
  - '@typescript-eslint'
  - 'import'

- Run `yarn install` just to be sure that any automatic `npm` installs haven't removed required dependencies
- Run `yarn run test` and `yarn run lint` to make sure that things are working
  - The lint might fail depending on the config you've chosen but the test should pass. 
