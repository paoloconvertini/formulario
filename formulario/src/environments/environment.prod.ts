export const environment = {
  production: true,
  baseAuthUrl: (window as any)['env']['baseAuthUrl'] || 'http://10.0.0.7:8081/api/',
  baseUrl: (window as any)["env"]['baseUrl'] || 'http://10.0.0.17:8080/api/',
  TOKEN_KEY: 'access_token',
  LOGIN: 'login',
  USERNAME: 'username',
  ADMIN: 'Admin',
  MATERIE_PRIME: 'materie-prime',
  MATERIE_PRIME_REGISTRO: 'materie-prime-registro',
  PRODOTTI:'prodotti',
  PRODOTTO_MATERIE_PRIME:'prodotto-materie-prime',
  LISTINI:'listini',
  TIPO_PRODOTTI:'tipo-prodotti'
};
