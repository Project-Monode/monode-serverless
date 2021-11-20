# Monode Serverless
Monode is an infastructure as code framework for configuring cloud services in a TypeScript project. This libarary in particular provides the nessecary dependencies for a Monode project that exports to a [serverless framework](https://www.serverless.com/) based project.

## Installation
This library should only be installed using the [Monode CLI](https://www.npmjs.com/package/monode-cli)

## Usage
### Cloud Component Types
Cloud components are bundles of cloud resources that work together. Cloud component types can be used to define the format different types of custom cloud components.
To define a new cloud component type:
  1. Create a file in your Monode project, and name it `<TypeName>.cloudtype.ts`. By convention these files reside under `<project-root>/src/cloud-types`.
  2. At the top of the file add `import { CloudType, buildResourceName } from 'monode-serverless';`
  3. Export your cloud component type. `export const <TypeName> = CloudType.defineNew({});`
  4. Define the tag that will be used to identify instances of this cloud component type. `cloudTypeName: '<typename>',`
  5. Create the function that will be used to define instances of this cloud component type. It should have a look something like this.
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
Here, the functions entries will be translated to serverless function enteries, and the resources entries will be translated to serverless resoruce entries. Feel free to explore the example cloud component types.

### Cloud Component Instances
Cloud component instances are instances of cloud component types. For example, if S3 was a cloud component type, then and instance of the S3 type would model a single bucket.
To define a new cloud component instance:
  1. Create a file in your Monode project and name it `<InstanceName>.<TypeName>.ts`.
  2. At the top of the file add `import { <TypeName> } from '<path/to/cloudtype/file/<TypeName>.cloudtype>';`
  3. Define and export your cloud component instance. `export default <TypeName>.defineNew({...});`

### Compiling
When you run `$ mnd compile` or `$ monode compile` in your Monode project, Monode will analyze the cloud componet types and instances, and export their config and code to the sepcified `serverless.json` file.

## Dependencies
  - This library should be installed and compiled using the [Monode CLI](https://www.npmjs.com/package/monode-cli).
  - This library should be used with the [serverless framework](https://www.serverless.com/).
