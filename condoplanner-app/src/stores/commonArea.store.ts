import { useCallback, useEffect, useRef, useState } from 'react';
import type { CommonAreaDto, UpsertCommonAreaInput, UploadCommonAreaPhotoInput, CommonAreaPhotoDto } from '../apiClient';
import { listByCondominium, upsert, uploadPhoto, invalidateAreaPhotos } from '../features/instance/CommonAreas/commonAreasClient';

type StoreState = {
  areas: CommonAreaDto[];
  loadingAreas: boolean;
  loadingPhotos: Record<number, boolean>;
  photos: Record<number, CommonAreaPhotoDto[]>;
};

export function useCommonAreasStore(condominiumId?: number) {
  const [state, setState] = useState<StoreState>({ areas: [], loadingAreas: false, loadingPhotos: {}, photos: {} });
  const condoRef = useRef<number | undefined>(condominiumId);
  condoRef.current = condominiumId;

  const loadAreas = useCallback(async () => {
    if (!condoRef.current) {
      setState(s => ({ ...s, areas: [] }));
      return;
    }
    setState(s => ({ ...s, loadingAreas: true }));
    try {
      const list = await listByCondominium(condoRef.current);

      const photosMap: Record<number, CommonAreaPhotoDto[]> = {};
      for (const a of list) {
        if (a.id && a.photos && a.photos.length > 0) {
          photosMap[a.id] = a.photos;
        }
      }

      setState(s => ({ ...s, areas: list, photos: { ...s.photos, ...photosMap } }));
    } finally {
      setState(s => ({ ...s, loadingAreas: false }));
    }
  }, []);

  const saveArea = useCallback(async (input: UpsertCommonAreaInput) => {
    await upsert(input);
    await loadAreas();
  }, [loadAreas]);

  const sendPhoto = useCallback(async (input: UploadCommonAreaPhotoInput) => {
    await uploadPhoto(input);
    invalidateAreaPhotos(input.areaId as number);
    await loadAreas();
  }, [loadAreas]);

  useEffect(() => { loadAreas(); }, [loadAreas, condominiumId]);

  return {
    areas: state.areas,
    loadingAreas: state.loadingAreas,
    photos: state.photos,
    loadingPhotos: state.loadingPhotos,
    loadAreas,
    saveArea,
    sendPhoto,
  };
}
