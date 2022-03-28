import { HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http';
import axios from 'axios';

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post (params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    const response = await axios.post(params.url, params.body);
    return {
      statusCode: response.status,
      body: response.data
    };
  }
}
