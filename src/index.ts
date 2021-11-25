export interface ICloudFormationExports {
  functions?: { [key: string]: { [key: string]: any } },
  resources?: { [key: string]: any },
}

export interface ICloudComponent {
  isMonodeCloudComponent: true,
  cloudFormationExports: ICloudFormationExports,
  [key: string | symbol | number]: any,
}

export const CloudComponent = {
  defineNew(args: { cloudFormationExports: ICloudFormationExports, [key: string | symbol | number]: any }): ICloudComponent {
    (args as any).isMonodeCloudComponent = true;
    return (args as any) as ICloudComponent;
  }
}

export const CloudComponentType = {
  defineNew<
    SpecificCloudComponentType extends { defineNew: (args: any) => ICloudComponent }
  >(args: SpecificCloudComponentType): SpecificCloudComponentType {
    return args;
  }
}

export const buildResourceName = function(partialName: string) {
  return `${process.env.service?.toLowerCase()}-${process.env.stage?.toLowerCase()}-${partialName.toLowerCase()}`;
}