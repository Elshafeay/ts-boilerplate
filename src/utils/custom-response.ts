import { Response } from 'express';

class CustomResponse {

  // Note that data here is marked as `any`, because we can't predict it
  send(res:Response, data: any, message='done', status=200){
    const formattedResponse = { status, message, data };
    res.status(status).json(formattedResponse);
  }

  sendWithoutData(res:Response, message='done', status=200){
    const formattedResponse = { status, message };
    res.status(status).json(formattedResponse);
  }

  sendWithError(res:Response, message:string, status=400){
    const formattedResponse = { status, message };
    res.status(status).json(formattedResponse);
  }

}

export default new CustomResponse();