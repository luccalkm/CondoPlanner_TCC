import { CommonAreaApi, type CommonAreaDto, type UpsertCommonAreaInput, type UploadCommonAreaPhotoInput, type CommonAreaPhotoDto } from '../../../apiClient';
import { ApiConfiguration } from '../../../apiClient/apiConfig';

const api = new CommonAreaApi(ApiConfiguration);

const photosCache = new Map<number, CommonAreaPhotoDto[]>();

export async function listByCondominium(condominiumId: number): Promise<CommonAreaDto[]> {
  const list = await api.apiCommonAreaCondominiumCondominiumIdGet({ condominiumId });

  for (const area of list) {
    if (area.id && area.photos && area.photos.length > 0) {
      photosCache.set(area.id, area.photos);
    }
  }

  return list;
}

export async function upsert(input: UpsertCommonAreaInput): Promise<void> {
  await api.apiCommonAreaUpsertPost({ upsertCommonAreaInput: input });
}

export async function uploadPhoto(input: UploadCommonAreaPhotoInput): Promise<void> {
  await api.apiCommonAreaPhotosUploadPost({ uploadCommonAreaPhotoInput: input });
  if (typeof input.areaId === 'number') photosCache.delete(input.areaId);
}

export function invalidateAreaPhotos(areaId: number) {
  photosCache.delete(areaId);
}
