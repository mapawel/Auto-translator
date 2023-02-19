// import http from 'http';
// import express from 'express';
// import chai from 'chai';
// import assert from 'assert';
// import request, { Response } from 'supertest';
// import sinon from 'sinon';
// import { Setup } from './setup';
// import { TranslationRouter } from '../routes/Translation.router';
// import translationController from '../controllers/translation.controller';
// import cacheMiddleware from '../../middlewares/Cache.middleware';

// describe('Translation router test suite:', () => {
//   let setup: Setup;
//   let server: http.Server;
//   let test: any
//   beforeEach(() => {
//     setup = new Setup();
//     const router = express.Router();
//     new TranslationRouter(router).initTranslationRoutes();
//     server = setup.initServerWithRouter(
//       'http://localhost',
//       8000,
//       '/translation',
//       router
//     );

//     sinon.stub(cacheMiddleware, 'findInCache'); // ?????????????????
//   });

//   afterEach(() => {
//     server.close();
//     sinon.restore();
//   });

//   it('should return status 200 and translated data on POST, route /translation with correct body data', async () => {
//     try {
//       const response: Response = await request(server)
//         .post(setup.route as string)
//         .send(setup.sampleRequest)
//         .expect('Content-Type', /json/);

//       // then
//       console.log(' ----> ?????????????????????', response.body);
//       // assert.equal(response.statusCode, 200);
//       // assert.deepEqual(response.body, setup.sampleResponse);
//     } catch (err: any) {
//       throw err;
//     }
//   });
// });
