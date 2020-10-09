export interface CustomError {
    statusCode: number;
    message: string;
    fields?: Array<string>
}
