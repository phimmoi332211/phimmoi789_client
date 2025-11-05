import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError, AxiosPromise, AxiosResponse } from 'axios';
import {
  BareFetcher,
  PublicConfiguration,
  SWRConfiguration,
} from 'swr/_internal';

import { Define } from '@/types/define';

export namespace ApiFetch {
  export type DefaultFetch<T = any> = AxiosPromise<T>;

  export interface QuerySuccessProps<TSuccess = any, TVariables = any> {
    data: TSuccess;
    variables?: TVariables;
    key: string;
    config: Readonly<
      PublicConfiguration<
        AxiosResponse<TSuccess>,
        AxiosError<Define.ErrorResponseData>,
        BareFetcher<AxiosResponse<TSuccess>>
      >
    >;
  }

  export interface QueryCommonProps<
    TSuccess = any,
    TVariables = any,
    TError = Define.ErrorResponseData,
  > {
    key?: string[];
    config?: SWRConfiguration<
      AxiosResponse<TSuccess>,
      AxiosError<Define.ErrorResponseData>
    >;
    isEnabled?: boolean;

    payload: {
      queryKey: string;
      queryData?: TVariables;
    };

    onBeforeSuccess?: (
      val: ApiFetch.QuerySuccessProps<TSuccess, TVariables>,
    ) => Promise<void>;
    onBeforeError?: (error: Define.ErrorResponseData) => Promise<void>;

    onSuccess?: (val: QuerySuccessProps<TSuccess, TVariables>) => void;
    onError?: (val: TError) => void;
    isNotifySuccess?: boolean;
    isNotifyError?: boolean;
    // isShowMessageError?: boolean;
  }

  export interface MutationSuccessProps<TSuccess = any, TVariables = any> {
    data: TSuccess;
    variables: TVariables | null;
    // headers?: AxiosResponseHeaders;
    key: string[];
    // config: Readonly<
    //   SWRMutationConfiguration<AxiosResponse<TSuccess>, any, Key, TVariables>
    // >;
  }

  export interface MutationCommonProps<
    TSuccess = any,
    TVariables = any,
    TError = Define.ErrorResponseData,
  > {
    key?: string[];
    options?: UseMutationOptions<
      AxiosResponse<TSuccess>,
      AxiosError<TError>,
      TVariables
    >;

    onBeforeSuccess?: (
      val: ApiFetch.MutationSuccessProps<TSuccess, TVariables>,
    ) => Promise<void>;
    onBeforeError?: (
      error: Define.ErrorResponseData,
      variables: TVariables,
    ) => Promise<void>;

    onSuccess?: (val: MutationSuccessProps<TSuccess, TVariables>) => void;
    onError?: (val: TError, variables: TVariables) => void;
    isNotifySuccess?: boolean;
    isNotifyError?: boolean;
    // isShowMessageError?: boolean;
  }
}
