// import { RequestHandler } from 'express';
// import fs from 'fs';

// import { Media, PropsType, collectionsCount } from '../index';

// type ResBody<T = undefined> = { error: boolean; message: string | string[]; data?: T };

// // router.post('/login', login);
// export type loginReq = RequestHandler<null, { accessToken: string }, { username: string }>;

// /* --------------------------------------- Media -------------------------------------- */
// // router.get('/:id', getMedia);
// // router.put('/:id', updateMedia);
// // router.delete('/:id', unsave);
// export type mediaReq = RequestHandler<{ id: string }, ResBody<Media>>;
// export type updateMediaReq = RequestHandler<{ id: string }, ResBody<Media>, { collectionId: string | string[]; note: string }>;
// export type unsaveMediaReq = RequestHandler<{ id: string }, ResBody>;

// /* ------------------------------------ Media List ------------------------------------ */
// // router.post('/list', getMediaList);
// // router.get('/list/fetch', fetchSaveMedia);
// // router.post('/list/collection', getCollection);
// export type mediaFetchReq = RequestHandler<null, ResBody, null>;
// export type mediaListReq = RequestHandler<
//   null,
//   ResBody<{ media: Media[]; hasMore: boolean }>,
//   {
//     page: number;
//     username: string;
//     mediaId: string;
//     collectionIds: string[];
//     mediaType: PropsType;
//   }
// >;
// export type collectionReq = RequestHandler<
//   null,
//   ResBody<collectionsCount>,
//   {
//     mediaType: PropsType;
//     collectionIds: string[];
//   }
// >;

// /* --------------------------------- Media Downloader --------------------------------- */
// // router.get('/download/video/:id', mediaDownloader);
// // router.get('/download/image/:id', mediaDownloader);
// // router.get('/download/user/:id', mediaDownloader);
// export type downloadReq = RequestHandler<{ id: string }, fs.ReadStream, null, { isActive: true }>;
