export interface ICloudFormationExports {
  functions?: { [key: string]: { [key: string]: any } },
  resources?: { [key: string]: any },
}

/*export interface ICloudComponent {
  isMonodeCloudComponent: true,
  cloudFormationExports: ICloudFormationExports,
  [key: string | symbol | number]: any,
}*/

export interface ICloudComponentParams {
  cloudFormationExports: ICloudFormationExports,
}

type ISpecificCloudComponent<IParams extends ICloudComponentParams> = IParams & { isMonodeCloudComponent: true };

export const CloudComponent = {
  defineNew<IParams extends ICloudComponentParams>(args: IParams): ISpecificCloudComponent<IParams> {
    (args as any).isMonodeCloudComponent = true;
    return (args as any) as ISpecificCloudComponent<IParams>;
  }
}

export const CloudComponentType = {
  defineNew<
    //IParams,
    ISubParams extends ICloudComponentParams,
    SpecificCloudComponentType extends { defineNew: (args: any) => ISpecificCloudComponent<ISubParams> }
  >(args: SpecificCloudComponentType): SpecificCloudComponentType {
    return args;
  }
}

export const buildResourceName = function(partialName: string) {
  return `${process.env.service?.toLowerCase()}-${process.env.stage?.toLowerCase()}-${partialName.toLowerCase()}`;
}

export function defineResourceInteraction<ParamType, ReturnType>(args: {
  interaction: (args: ParamType) => ReturnType,
  iamPermissions: {
    Effect: any,
    Action: any,
    Resource: any,
    Principal?: any,
    Condition?: any,
    [key: symbol | string]: any,
  }[]
}) {
  return Object.assign(
    args.interaction,
    { iamPermissions: args.iamPermissions }
  ); 
}
