// import assert from 'assert';
// import mock, { MockRequest, MockResponse } from 'node-mocks-http';
// import { Request, Response } from 'express';
// import translationController from '../controllers/translation.controller';
// import { Setup } from './setup';

// describe('Translation router test suite:', () => {
//   let setup: Setup;

//   beforeEach(() => {
//     setup = new Setup();
//     setup.initMockGoogleApi();
//   });

//   it('should return status 200 and translated data from method postTranslation() in controller', async () => {
//     try {
//       //given
//       const request: MockRequest<Request> = mock.createRequest({
//         body: setup.sampleRequest,
//       });
//       const response: MockResponse<Response> = mock.createResponse();

//       //when
//       await translationController.postTranslation(request, response, () => {});
//       const controllerResData = JSON.parse(response._getData());

//       //then
//       assert.equal(response.statusCode, 200);
//       assert.deepEqual(controllerResData, setup.sampleResponse);
//     } catch (err: any) {
//       throw err;
//     }
//   });
// });
