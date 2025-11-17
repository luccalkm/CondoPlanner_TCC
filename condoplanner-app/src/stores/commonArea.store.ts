import { useCallback, useEffect, useRef, useState } from 'react';
import { type CommonAreaDto, type UpsertCommonAreaInput, type UploadCommonAreaPhotoInput, type CommonAreaPhotoDto, CommonAreaApi } from '../apiClient';
import { ApiConfiguration } from '../apiClient/apiConfig';

type StoreState = {
	areas: CommonAreaDto[];
	loadingAreas: boolean;
	loadingPhotos: Record<number, boolean>;
	photos: Record<number, CommonAreaPhotoDto[]>;
};

const api = new CommonAreaApi(ApiConfiguration);

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
			const list = await api.apiCommonAreaCondominiumCondominiumIdGet({ condominiumId: condoRef.current });

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
		if (!input.id || input.id === 0) {
			const createBody = {
				condominiumId: input.condominiumId!,
				name: input.name ?? '',
				description: input.description ?? '',
				type: input.type ?? '',
				capacity: input.capacity ?? 0,
				openingTime: input.openingTime ?? '00:00:00',
				closingTime: input.closingTime ?? '00:00:00',
				maxDuration: input.maxDuration ?? 0,
				available: input.available ?? false,
				requiresApproval: input.requiresApproval ?? false,
				availableDays: input.availableDays ?? 0,
				notes: input.notes ?? ''
			};
			await api.apiCommonAreaPost({ upsertCommonAreaInput: createBody });
		} else {
			const updateBody = {
				id: input.id!,
				name: input.name ?? '',
				description: input.description ?? '',
				type: input.type ?? '',
				capacity: input.capacity ?? 0,
				openingTime: input.openingTime ?? '00:00:00',
				closingTime: input.closingTime ?? '00:00:00',
				maxDuration: input.maxDuration ?? 0,
				available: input.available ?? false,
				requiresApproval: input.requiresApproval ?? false,
				availableDays: input.availableDays ?? 0,
				notes: input.notes ?? ''
			};
			await api.apiCommonAreaIdPut({ id: input.id!, upsertCommonAreaInput: updateBody });
		}

		await loadAreas();
	}, [loadAreas]);

	const sendPhoto = useCallback(async (input: UploadCommonAreaPhotoInput) => {
		await api.apiCommonAreaPhotosUploadPost({ uploadCommonAreaPhotoInput: input });
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
