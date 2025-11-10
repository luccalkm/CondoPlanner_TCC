import { CommonAreaApi, type CommonAreaDto, type UpsertCommonAreaInput, type UploadCommonAreaPhotoInput, type CommonAreaPhotoDto } from '../../../apiClient';
import { ApiConfiguration } from '../../../apiClient/apiConfig';

const api = new CommonAreaApi(ApiConfiguration);

const photosCache = new Map<number, CommonAreaPhotoDto[]>();

export async function listByCondominium(condominiumId: number): Promise<CommonAreaDto[]> {
  return api.apiCommonAreaCondominiumCondominiumIdGet({ condominiumId });
}

export async function upsert(input: UpsertCommonAreaInput): Promise<void> {
  await api.apiCommonAreaUpsertPost({ upsertCommonAreaInput: input });
}

export async function uploadPhoto(input: UploadCommonAreaPhotoInput): Promise<void> {
  await api.apiCommonAreaPhotosUploadPost({ uploadCommonAreaPhotoInput: input });
  if (typeof input.areaId === 'number') photosCache.delete(input.areaId);
}

export async function getAreaPhotos(areaId: number): Promise<CommonAreaPhotoDto[]> {
  if (photosCache.has(areaId)) return photosCache.get(areaId)!;
  const list = await api.apiCommonAreaAreasAreaIdPhotosGet({ areaId, includeData: true });
  photosCache.set(areaId, list);
  return list;
}

export function invalidateAreaPhotos(areaId: number) {
  photosCache.delete(areaId);
}
