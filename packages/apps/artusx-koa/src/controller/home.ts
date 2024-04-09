import { ArtusXInjectEnum } from '@artusx/utils';
import {
  ArtusInjectEnum,
  ArtusXErrorEnum,
  ArtusApplication,
  Inject,
  Controller,
  GET,
  POST,
  MW,
  Headers,
  StatusCode,
} from '@artusx/core';

import type { ArtusXContext, Log4jsClient, NunjucksClient } from '@artusx/core';
import traceTime from '../middleware/traceTime';

@Controller()
export default class HomeController {
  @Inject(ArtusInjectEnum.Application)
  app: ArtusApplication;

  @Inject(ArtusXInjectEnum.Log4js)
  log4js: Log4jsClient;

  @Inject(ArtusXInjectEnum.Nunjucks)
  nunjucks: NunjucksClient;

  @MW([traceTime])
  @GET('/')
  async home(ctx: ArtusXContext) {
    const infoLogger = this.log4js.getLogger('default');
    infoLogger.info(`path: /, method: GET`);
    ctx.body = this.nunjucks.render('index.html', { title: 'ArtusX', message: 'Hello ArtusX!' });
  }

  @POST('/post')
  @StatusCode(200)
  async post(_ctx: ArtusXContext) {
    return this.nunjucks.render('index.html', { title: 'ArtusX', message: 'Post method' });
  }

  @GET('/html')
  @Headers({
    'x-handler': 'home-controller-html: html',
  })
  @StatusCode(200)
  async html(_ctx: ArtusXContext) {
    return this.nunjucks.render('index.html', { title: 'ArtusX', message: 'Render with nunjucks' });
  }

  @GET('/error')
  @StatusCode(403)
  async error(ctx: ArtusXContext) {
    const errorLogger = this.log4js.getLogger('error');
    const mockError = ctx.query.error;
    errorLogger.error('mockError', mockError);

    if (mockError) {
      this.app.throwException(ArtusXErrorEnum.ARTUSX_UNKNOWN_ERROR);
    }

    return 'mockError: error.';
  }
}
