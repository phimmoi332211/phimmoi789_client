/* eslint-disable no-console */
'use server';

import { AxiosError } from 'axios';
import { Define } from '@/types/define';


// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const parseRequestParams = async <TParams = any>(
  request: Request,
): Promise<{ url: string; params: TParams; pathname: string }> => {
  const url = new URL(request.url);
  let params;

  try {
    if (request.method === 'GET') {
      params = null;
    } else if (
      request.headers.get('Content-Type')?.includes('multipart/form-data')
    ) {
      params = await request.formData();
    } else {
      params = await request.json();
    }
  } catch (e: any) {
    params = {};
    console.error('Error transforming params:', e.message);
  }

  return {
    url: url.pathname.replace(/^\/api/, '') + url.search, // Remove '/api'
    params,
    pathname: url.pathname,
  };
};

export const handleErrorResponse = async (
  e: any,
  pathname: string,
  method: 'POST' | 'GET' | 'PUT',
) => {
  const error = e as AxiosError<any>;
  const { response, message, status } = error;

  console.error(`${method} ~ ${pathname} ~ error:`, response?.data ?? message);

  const errorStatus = response?.status ?? status ?? 500;

  const errorResponse: Define.ErrorResponseData = {
    data:
      response?.data && typeof response.data === 'object'
        ? response.data
        : null,
    error: response?.data?.message ?? message,
    message: 'Error',
    status: errorStatus,
  };

  return Response.json(errorResponse, { status: errorStatus });
};
