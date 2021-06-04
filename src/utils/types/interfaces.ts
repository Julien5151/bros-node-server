export interface CustomError {
    statusCode: number;
    message: string;
    invalidFields?: Array<string>;
    missingFields?: Array<string>;
    forbiddenFields?: Array<string>;
}
