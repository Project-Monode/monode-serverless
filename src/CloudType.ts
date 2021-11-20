export interface ICloudFormationExports {
  functions?: { [key: string]: { [key: string]: any } },
  resources?: { [key: string]: any },
}

export interface ICloudType {
  cloudTypeName: string,
  defineNew: (args: any) => { cloudFormationExports: ICloudFormationExports }
}

export const CloudType = {
  defineNew<SpecificCloudType extends ICloudType>(args: SpecificCloudType): SpecificCloudType {
    return args;
  }
}

export const buildResourceName = function(partialName: string) {
  return `${process.env.service?.toLowerCase()}-${process.env.stage?.toLowerCase()}-${partialName.toLowerCase()}`;
}
