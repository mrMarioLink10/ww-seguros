import { KeycloakService } from 'keycloak-angular';
import { environment } from './environments/environment';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

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

                localStorage.setItem('ang-token', keycloak._instance.token);
                localStorage.setItem('ang-refresh-token', keycloak._instance.refreshToken);
                localStorage.setItem('user-information', JSON.stringify(keycloak._instance.tokenParsed));


                // tslint:disable: max-line-length
                setInterval(() => {
                    // console.log('No te mentire, se ve muy fresco el pana token, se vence en: ' + Math.round(keycloak._instance.tokenParsed.exp + keycloak._instance.timeSkew - new Date().getTime() / 1000) + ' segundos');
                    keycloak.updateToken(300).then((refreshed) => {
                        if (refreshed) {
                            console.log('No te mentire, se ve muy fresco el pana token, se vence en: '
                                + Math.round(keycloak._instance.tokenParsed.exp + keycloak._instance.timeSkew - new Date().getTime() / 1000) + ' segundos');
                            localStorage.setItem('ang-token', keycloak._instance.token);

                        } else {
                            console.warn('Token no refrescado, token no refrescado, donde estan sus padres? Se vence en: '
                                + Math.round(keycloak._instance.tokenParsed.exp + keycloak._instance.timeSkew - new Date().getTime() / 1000) + ' segundos');
                        }
                    }).catch((err) => {
                        console.log('err', err);
                        console.error('Failed to refresh token');
                    });

                }, 180000);

                resolve(true);
            } catch (error) {
                window.location.reload();
                reject(error);
            }
        });
    };
}
