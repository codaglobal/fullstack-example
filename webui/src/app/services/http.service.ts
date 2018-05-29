import { Injectable } from '@angular/core';
import {
  Http, ConnectionBackend, RequestOptions, Request, Response, RequestOptionsArgs, RequestMethod, ResponseOptions
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { _throw } from 'rxjs/observable/throw';
import { catchError } from 'rxjs/operators';
import { extend } from 'lodash';

import { AppConfig } from '../app.config';


/**
 * Provides a base framework for http service extension.
 * The default extension adds support for API prefixing, request caching and default error handler.
 */
@Injectable()
export class HttpService extends Http {
  config: any;
  constructor(backend: ConnectionBackend,
    private defaultOptions: RequestOptions,
    private _config: AppConfig) {
    // Customize default options here if needed
    super(backend, defaultOptions);

    this.config = _config.getConfig();
  }

  /**
   * Performs any type of http request.
   * You can customize this method with your own extended behavior.
   */
  request(request: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    const requestOptions = options || {};
    let url: string;

    if (typeof request === 'string') {
      url = request;
      request = this.config.serviceUrls.base + url;
    } else {
      url = request.url;
      request.url = this.config.serviceUrls.base + url;
    }
      // Do not use cache
      return this.httpRequest(request, requestOptions);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(url, extend({}, options, { method: RequestMethod.Get }));
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(url, extend({}, options, {
      body: body,
      method: RequestMethod.Post
    }));
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(url, extend({}, options, {
      body: body,
      method: RequestMethod.Put
    }));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(url, extend({}, options, { method: RequestMethod.Delete }));
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(url, extend({}, options, {
      body: body,
      method: RequestMethod.Patch
    }));
  }

  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(url, extend({}, options, { method: RequestMethod.Head }));
  }

  options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(url, extend({}, options, { method: RequestMethod.Options }));
  }

  // Customize the default behavior for all http requests here if needed
  private httpRequest(request: string | Request, options: RequestOptionsArgs): Observable<Response> {
    let req = super.request(request, options);
      req = req.pipe(catchError((error: any) => this.errorHandler(error)));
    return req;
  }

  // Customize the default error handler here if needed
  private errorHandler(response: Response): Observable<Response> {
      // Avoid unchaught exceptions on production
      return _throw(response);
  }

}
