import { KeycloakService } from 'keycloak-angular';
import { environment } from './environments/environment';

export function initializer(keycloak: KeycloakService): () => Promise<any> {
    return (): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            const { keycloakConfig } = environment;
            try {
                await keycloak.init({
                    config: keycloakConfig,
                    initOptions: {
                        // onLoad: 'login-required',
                        checkLoginIframe: false
                    },
                    bearerExcludedUrls: ['dashboard']

                });
                resolve();
                console.log(keycloak);
                console.log(keycloak._instance);
                localStorage.setItem('ang-token', keycloak._instance.token);
                localStorage.setItem('ang-refresh-token', keycloak._instance.refreshToken);
                localStorage.setItem('user-information', JSON.stringify(keycloak._instance.tokenParsed));
            } catch (error) {
                reject(error);
            }
        });
    };
}