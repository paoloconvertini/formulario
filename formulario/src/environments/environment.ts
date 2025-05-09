// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseAuthUrl: 'http://localhost:8081/api/',
  baseUrl:'http://localhost:8080/api/',
  TOKEN_KEY: 'access_token',
  LOGIN: 'login',
  USERNAME: 'username',
  ADMIN: 'Admin',
  MATERIE_PRIME: 'materie-prime',
  MATERIE_PRIME_REGISTRO: 'materie-prime-registro',
  PRODOTTI:'prodotti',
  PRODOTTO_MATERIE_PRIME:'prodotto-materie-prime',
  LISTINI:'listini',
  TIPO_PRODOTTI:'tipo-prodotti',
  MATERIE_PRIME_WEBER: 'materie-prime-weber',
  MATERIE_PRIME_REGISTRO_WEBER: 'materie-prime-registro-weber',
  PRODOTTI_WEBER:'prodotti-weber',
  PRODOTTO_MATERIE_PRIME_WEBER:'prodotto-materie-prime-weber',
  TIPO_PRODOTTI_WEBER:'tipo-prodotti-weber'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
