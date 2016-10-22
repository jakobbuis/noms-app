import { AccessToken } from './oauth/access_token';

export interface User {
    id: string;
    oauth?: AccessToken;
}
