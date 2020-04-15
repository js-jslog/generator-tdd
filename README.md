# generator-tdd
A Yeoman Generator to create a simple tdd project

If the eslint configuration generator invites you to install dependencies which are not yet included then you can accept but it would be wise to run `yarn install` again afterwards as `npm` has been shown to remove required dependencies at this stage. It is probably lying at any rate since all the dependencies required for an IDE integrated elint setup with airbnb config extensions is already included as part of the generator.

Following completion, the following actions must be taken:

- Remove the `postinstall` npm script from the generated package.json
- Add 'jest' to the plugins section of the eslint configuration
- You may or may not need to also add the folloing to the plugins section of the eslint configuration depending on your setup
  - @typescript-eslint
  - import
- Run `yarn install` just to be sure that any automatic `npm` installs haven't removed required dependencies
- Run `yarn run test` and `yarn run lint` to make sure that things are working
  - The lint might fail depending on the config you've chosen but the test should pass. 
