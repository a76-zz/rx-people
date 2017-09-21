export enum Status {
    Loading,
    Ready,
    Error
}

export interface Processing<Result> {
    status: Status;
    value?: Result | any;
}
