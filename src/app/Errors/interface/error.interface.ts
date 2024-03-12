export type TErrorResources = {
  path: number | string;
  message: string;
}[];

export type TgenericErrorResponse = {
  statusCode: number;
  message: string;
  errorResources: TErrorResources;
};
