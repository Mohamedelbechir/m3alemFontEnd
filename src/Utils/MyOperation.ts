export interface MyOperation {
    cin: string;
    type: TypeOperation;
}
export enum TypeOperation { blockDriver, activateDriver }