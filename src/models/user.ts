import { OAuthToken } from './oauth_token';

export interface User {
    name: string;
    id: string;
    oauth?: OAuthToken;
}
