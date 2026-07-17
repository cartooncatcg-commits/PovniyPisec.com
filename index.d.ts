import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { HealthStatus, Post, PostInput, PushSubscription, PushSubscriptionInput, UploadUrlRequest, UploadUrlResponse, VapidPublicKey } from './api.schemas';
import { customFetch } from '../custom-fetch';
import type { ErrorType, BodyType } from '../custom-fetch';
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
export declare const getListPostsUrl: () => string;
/**
 * @summary List all active (non-expired) posts
 */
export declare const listPosts: (options?: RequestInit) => Promise<Post[]>;
export declare const getListPostsQueryKey: () => readonly ["/api/posts"];
export declare const getListPostsQueryOptions: <TData = Awaited<ReturnType<typeof listPosts>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listPosts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listPosts>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListPostsQueryResult = NonNullable<Awaited<ReturnType<typeof listPosts>>>;
export type ListPostsQueryError = ErrorType<unknown>;
/**
 * @summary List all active (non-expired) posts
 */
export declare function useListPosts<TData = Awaited<ReturnType<typeof listPosts>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listPosts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreatePostUrl: () => string;
/**
 * @summary Create a new post (admin only)
 */
export declare const createPost: (postInput: PostInput, options?: RequestInit) => Promise<Post>;
export declare const getCreatePostMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createPost>>, TError, {
        data: BodyType<PostInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createPost>>, TError, {
    data: BodyType<PostInput>;
}, TContext>;
export type CreatePostMutationResult = NonNullable<Awaited<ReturnType<typeof createPost>>>;
export type CreatePostMutationBody = BodyType<PostInput>;
export type CreatePostMutationError = ErrorType<void>;
/**
* @summary Create a new post (admin only)
*/
export declare const useCreatePost: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createPost>>, TError, {
        data: BodyType<PostInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createPost>>, TError, {
    data: BodyType<PostInput>;
}, TContext>;
export declare const getDeletePostUrl: (id: number) => string;
/**
 * @summary Delete a post (admin only)
 */
export declare const deletePost: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeletePostMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deletePost>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deletePost>>, TError, {
    id: number;
}, TContext>;
export type DeletePostMutationResult = NonNullable<Awaited<ReturnType<typeof deletePost>>>;
export type DeletePostMutationError = ErrorType<void>;
/**
* @summary Delete a post (admin only)
*/
export declare const useDeletePost: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deletePost>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deletePost>>, TError, {
    id: number;
}, TContext>;
export declare const getRequestUploadUrlUrl: () => string;
/**
 * @summary Request a presigned upload URL (admin only)
 */
export declare const requestUploadUrl: (uploadUrlRequest: UploadUrlRequest, options?: RequestInit) => Promise<UploadUrlResponse>;
export declare const getRequestUploadUrlMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof requestUploadUrl>>, TError, {
        data: BodyType<UploadUrlRequest>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof requestUploadUrl>>, TError, {
    data: BodyType<UploadUrlRequest>;
}, TContext>;
export type RequestUploadUrlMutationResult = NonNullable<Awaited<ReturnType<typeof requestUploadUrl>>>;
export type RequestUploadUrlMutationBody = BodyType<UploadUrlRequest>;
export type RequestUploadUrlMutationError = ErrorType<unknown>;
/**
* @summary Request a presigned upload URL (admin only)
*/
export declare const useRequestUploadUrl: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof requestUploadUrl>>, TError, {
        data: BodyType<UploadUrlRequest>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof requestUploadUrl>>, TError, {
    data: BodyType<UploadUrlRequest>;
}, TContext>;
export declare const getGetVapidPublicKeyUrl: () => string;
/**
 * Returns the public key clients need to subscribe to push notifications
 * @summary Get the VAPID public key
 */
export declare const getVapidPublicKey: (options?: RequestInit) => Promise<VapidPublicKey>;
export declare const getGetVapidPublicKeyQueryKey: () => readonly ["/api/notifications/vapid-public-key"];
export declare const getGetVapidPublicKeyQueryOptions: <TData = Awaited<ReturnType<typeof getVapidPublicKey>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getVapidPublicKey>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getVapidPublicKey>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetVapidPublicKeyQueryResult = NonNullable<Awaited<ReturnType<typeof getVapidPublicKey>>>;
export type GetVapidPublicKeyQueryError = ErrorType<unknown>;
/**
 * @summary Get the VAPID public key
 */
export declare function useGetVapidPublicKey<TData = Awaited<ReturnType<typeof getVapidPublicKey>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getVapidPublicKey>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getSubscribeToNotificationsUrl: () => string;
/**
 * Registers a browser push subscription so the server can send it notifications
 * @summary Subscribe to push notifications
 */
export declare const subscribeToNotifications: (pushSubscriptionInput: PushSubscriptionInput, options?: RequestInit) => Promise<PushSubscription>;
export declare const getSubscribeToNotificationsMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof subscribeToNotifications>>, TError, {
        data: BodyType<PushSubscriptionInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof subscribeToNotifications>>, TError, {
    data: BodyType<PushSubscriptionInput>;
}, TContext>;
export type SubscribeToNotificationsMutationResult = NonNullable<Awaited<ReturnType<typeof subscribeToNotifications>>>;
export type SubscribeToNotificationsMutationBody = BodyType<PushSubscriptionInput>;
export type SubscribeToNotificationsMutationError = ErrorType<unknown>;
/**
* @summary Subscribe to push notifications
*/
export declare const useSubscribeToNotifications: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof subscribeToNotifications>>, TError, {
        data: BodyType<PushSubscriptionInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof subscribeToNotifications>>, TError, {
    data: BodyType<PushSubscriptionInput>;
}, TContext>;
export declare const getHealthCheckUrl: () => string;
/**
 * Returns server health status
 * @summary Health check
 */
export declare const healthCheck: (options?: RequestInit) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export {};
//# sourceMappingURL=api.d.ts.map