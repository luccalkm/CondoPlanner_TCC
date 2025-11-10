import { useCallback, useEffect, useRef, useState } from 'react';
import type { CommonAreaDto, UpsertCommonAreaInput, UploadCommonAreaPhotoInput, CommonAreaPhotoDto } from '../../../apiClient';
import { listByCondominium, upsert, uploadPhoto, getAreaPhotos, invalidateAreaPhotos } from './commonAreasClient';

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
      setState(s => ({ ...s, areas: list }));
    } finally {
      setState(s => ({ ...s, loadingAreas: false }));
    }
  }, []);

  const loadPhotosForArea = useCallback(async (areaId: number) => {
    setState(s => ({ ...s, loadingPhotos: { ...s.loadingPhotos, [areaId]: true } }));
    try {
      const list = await getAreaPhotos(areaId);
      setState(s => ({ ...s, photos: { ...s.photos, [areaId]: list } }));
    } finally {
      setState(s => ({ ...s, loadingPhotos: { ...s.loadingPhotos, [areaId]: false } }));
    }
  }, []);

  const saveArea = useCallback(async (input: UpsertCommonAreaInput) => {
    await upsert(input);
    await loadAreas();
  }, [loadAreas]);

  const sendPhoto = useCallback(async (input: UploadCommonAreaPhotoInput) => {
    await uploadPhoto(input);
    invalidateAreaPhotos(input.areaId as number);
    await loadPhotosForArea(input.areaId as number);
  }, [loadPhotosForArea]);

  useEffect(() => { loadAreas(); }, [loadAreas, condominiumId]);

  return {
    areas: state.areas,
    loadingAreas: state.loadingAreas,
    photos: state.photos,
    loadingPhotos: state.loadingPhotos,
    loadAreas,
    loadPhotosForArea,
    saveArea,
    sendPhoto,
  };
}
