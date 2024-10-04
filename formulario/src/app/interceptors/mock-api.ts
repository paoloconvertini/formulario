import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

export const FAKE_JWT_TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJncC1hcGktc2VydmljZSIsImV4cCI6MTY3NDkxODQ2MzE2OSwiZ3JvdXBzIjpbIlVzZXIiLCJBZG1pbiJdLCJpYXQiOjE2NzQ5MTg0NTksImp0aSI6ImRhNWFlZWRjLTVmMTQtNDc4Yi05YmNmLWI0NDA1YzQzODQyNSIsImlzcyI6ImF1dGhlbnRpY2F0aW9uLXNlcnZpY2UifQ.GUttfV9z1VIPK8QoGHUJ6HR6hb4P2L4-BSFszoe7lByGmmNOwdv2elbQQWXn8SEkqE7OlXrxKTbj1avGpXBbbcOXtxgUJpTqSdHJ_q9ml9dx9BJvERTb7NP6kftKwqHRmDh1hMg35SFx7IO6OKJS2R5lm5hH5NEBskhSUXlRXCKR2RYpTJYVqiZZSSas8kKX4dC2COL-7i0uwdZJz_VLj-BdNnJZpDGnSQVqN3ZuL2HTr09t02LKhYedRdk_MZq9sf3TgeamZy8mDdwTzWKjzADO4C_iapvNkRumBn9kanDKZKlXH5qGuxbgIUiMMdYaVQb211ZmRz6RiLE2uQnLGQ'

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const { url, method, headers } = request;

    function handleGetStoricoPrezzi() {
      return of(
        new HttpResponse({
          status: 200,
          body:
            {
              'id': '1',
              'nome': 'Additivo 1',
              'prezzi': [
                {
                  prezzo: 25,
                  data:'03/09/2023 10:23',
                  utente: 'Mario Rossi'
                },
                {
                  prezzo: 12.50,
                  data:'03/09/2022 11:50',
                  utente: 'Giuseppe Bianchi'
                }
              ]
            },
        })
      );
    }

    function handleGetRicavi() {
      return of(
        new HttpResponse({
          status: 200,
          body: [
            {id:20,nome: 'Ricarico 20'}, {id:30,nome: 'Ricarico  30'}, {id:50, nome:'Ricarico  40'}, {id:50, nome:'Ricarico  50'}, {id:60,nome:'Ricarico  60'}
          ],
        })
      );
    }

    function handleGetDettaglioListino() {
      return of(
        new HttpResponse({
          status: 200,
          body:
            {
              id:20,
              nome: 'Ricarico 20',
              'articoli': [
                {
                  id: 1,
                  nome: 'Prodotto 1',
                  prezzo: 25
                },
                {
                  id: 2,
                  nome: 'Prodotto 2',
                  prezzo: 35
                },
                {
                  id: 3,
                  nome: 'Prodotto 3',
                  prezzo: 11
                },
                {
                  id: 4,
                  nome: 'Prodotto 4',
                  prezzo: 23
                }

              ]
            },
        })
      );
    }

    if (url.endsWith('login') && method === 'POST') {
      return handleLogin();
    } else if (url.endsWith('materie-prime') && method === 'GET') {
      return handleGetAllMateriePrime();
    } else if (url.endsWith('prodotti') && method === 'GET') {
      return handleGetAllRicette();
    } else if(url.includes('prodotti/dettaglio/') && method === 'GET') {
      return handleGetDettaglioRicetta();
    } else if(url.includes('listini/dettaglio/') && method === 'GET') {
        return handleGetDettaglioListino();
    } else if(url.includes('storico-prezzi') && method === 'GET') {
      return handleGetStoricoPrezzi();
    } else if(url.endsWith('ricavi') && method === 'GET') {
      return handleGetRicavi();
    }
    return next.handle(request);

    function isLoggedIn() {
      return headers.get('authorization') === FAKE_JWT_TOKEN;
    }

    function handleGetDettaglioRicetta() {
      return of(
        new HttpResponse({
          status: 200,
          body:
            {
              'id': '1',
              'nome': 'Prodotto 1',
              'lavoro': 1.2,
              'sacco': 1.5,
              'materiePrime': [
                {
                  id: 1,
                  nome: 'Additivo 1',
                  percentuale: 7.55,
                  prezzo: 25,
                  unitaMisura:'Kg'
                },
                {
                  'id': '3',
                  'nome': 'Additivo 3',
                  percentuale: 80.3,
                  prezzo: 4.5,
                  unitaMisura:'Kg'
                },
                {
                  id: 2,
                  nome: 'Additivo 2',
                  percentuale: 12,
                  prezzo: 18.5,
                  unitaMisura:'Kg'
                },
                {
                  id: 4,
                  nome: 'Additivo 4',
                  percentuale: 0.15,
                  prezzo: 383.25,
                  unitaMisura:'Kg'
                }
              ]
            },
        })
      );
    }


    function handleGetAllMateriePrime() {
      return of(
        new HttpResponse({
          status: 200,
          body: [
            {
              'id': '1',
              'nome': 'Additivo 1',
              'prezzo': '2.50',
              'unitaMisura': 'QL'
            },
            {
              'id': '2',
              'nome': 'Additivo 2',
              'prezzo': '2.70',
              'unitaMisura': 'QL'
            },
            {
              'id': '3',
              'nome': 'Additivo 3',
              'prezzo': '1.50',
              'unitaMisura': 'QL'
            },
            {
              'id': '4',
              'nome': 'Additivo 4',
              'prezzo': '4.50',
              'unitaMisura': 'QL'
            }
          ],
        })
      );
    }

    function handleGetAllRicette() {
      return of(
        new HttpResponse({
          status: 200,
          body: [
            {
              'id': '1',
              'nome': 'Prodotto 1',
              'categoria': 1
            },
            {
              'id': '2',
              'nome': 'Prodotto 2',
              'categoria': 1
            },
            {
              'id': '3',
              'nome': 'Prodotto 3',
              'categoria': 1
            },
            {
              'id': '4',
              'nome': 'Prodotto 4',
              'categoria': 2
            },
            {
              'id': '5',
              'nome': 'Prodotto 5',
              'categoria': 2
            },
            {
              'id': '6',
              'nome': 'Prodotto 6',
              'categoria': 2
            },
            {
              'id': '7',
              'nome': 'Prodotto 7',
              'categoria': 2
            },
            {
              'id': '8',
              'nome': 'Prodotto 8',
              'categoria': 2
            },
            {
              'id': '9',
              'nome': 'Prodotto 9',
              'categoria': 2
            },
            {
              'id': '10',
              'nome': 'Prodotto 10',
              'categoria': 2
            },
            {
              'id': '11',
              'nome': 'Prodotto 11',
              'categoria': 2
            },
            {
              'id': '12',
              'nome': 'Prodotto 12',
              'categoria': 2
            },
            {
              'id': '13',
              'nome': 'Prodotto 13',
              'categoria': 2
            },
          ],
        })
      );
    }

    function handleLogin(): Observable<HttpEvent<unknown>> {
      return of(
        new HttpResponse({
          status: 200,
          body: {
            id: '1',
            username: 'profanis',
            idToken: FAKE_JWT_TOKEN,
          },
        })
      );
    }

  }
}

export const FakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
