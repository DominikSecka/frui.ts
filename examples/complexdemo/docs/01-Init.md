# Init the repo

Run in the parent folder:

    yarn create react-app complexdemo --template typescript

Delete the following files created by CRA because we will not need them:

- src/App.css
- src/App.test.tsx
- src/App.tsx
- src/index.css
- src/logo.svg

It means that only `index.tsx`, `react-app-env.d.ts`, `serviceWorker.ts`, and `setupTests.ts` should remain in the `src` folder.

Add configuration to `tsconfig.json`:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

## Required packages

We will install these packages throughout the walkthrough, however, you can install them at once if you want to start quickly.

TODO
