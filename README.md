# Monode Serverless
Monode is an infastructure as code framework for configuring cloud services in a TypeScript project. This libarary in particular provides the nessecary dependencies for a Monode project that exports to a [serverless framework](https://www.serverless.com/) based project.

## Installation
This library should only be installed using the [Monode CLI](https://www.npmjs.com/package/monode-cli)

## Usage
### Cloud Components
Cloud components are bundles of cloud resources that work together. For example, if you wanted to define a new cloud component:
  1. Create a file in your Monode project and name it `<ComponentName>.ts`.
  2. At the top of the file add `import { CloudComponent } from 'monode-serverless';`
  3. Define and export your cloud component instance. `export const ComponentName = CloudComponent.defineNew({...});`
The example project contains a more detailed example of an S3 cloud component. 

### Cloud Component Types
Often multiple cloud components follow the same pattern. In these cases you might want to use a Cloud Component Type.
  1. Create a file in your Monode project, and name it `<TypeName>.ts`. By convention these files reside under `<project-root>/src/cloud-types`.
  2. At the top of the file add `import { CloudComponentType } from 'monode-serverless';`
  3. Export your cloud component type. `export const <TypeName> = CloudComponentType.defineNew({...});`
  5. As part of `CloudComponentType.defineNew`'s args, create the function that will be used to define instances of this cloud component type. It should have a look something like this.
```
defineNew(args: <argtype>) {
  return {
    cloudFormationExports: {
      functions: {
        ...
      },
      resources: {
        ...
      },
    },
    ...
  }
}
```
Here, the functions entries will be translated to serverless function enteries, and the resources entries will be translated to serverless/CloudFormation resoruce entries. Feel free to explore the example cloud component types.

### Compiling
When you run `$ mnd compile` or `$ monode compile` in your Monode project, Monode will analyze the cloud componet types and instances, and export their config and code to the sepcified serverless project.

## Dependencies
  - This library should be installed and compiled using the [Monode CLI](https://www.npmjs.com/package/monode-cli).
  - This library should be used with the [serverless framework](https://www.serverless.com/).
