import { api } from './api';

const authenticationApi = api.injectEndpoints({
    endpoints: (build) => ({
        createGame: build.mutation<string, void>({
            query() {
                return {
                    url: 'api/authentication/creategame',
                    method: 'POST',
                    responseHandler: 'text',
                };
            },
        }),
    }),
});

export const { useCreateGameMutation } = authenticationApi;
