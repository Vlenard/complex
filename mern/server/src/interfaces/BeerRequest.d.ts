import type { AuthorizedRequest } from "./AuthorizedRequest.d.ts";

export interface BeerRequest extends AuthorizedRequest {
    params: {
        id: string
    }
}
