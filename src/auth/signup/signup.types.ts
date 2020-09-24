export interface SignupRequest {
    email: string;
    password: string;
    confirmedPassword: string;
}

export interface SignupResponse {
    message: string;
}
