export interface RegisterRequest {
    email: string;
}

export interface RegisterResponse {
    publicKeyCredentialsRequestOption: PublicKeyCredentialRequestOptions;
}
