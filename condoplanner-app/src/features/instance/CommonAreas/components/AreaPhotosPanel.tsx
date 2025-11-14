import { Paper } from '@mui/material';
import { CommonAreaCarousel } from './CommonAreaCarousel';
import { placeholderImage } from '../utils';

import type { CommonAreaDto } from '../../../../apiClient';

interface AreaPhotosPanelProps {
  area: CommonAreaDto | null | undefined;
}

export function AreaPhotosPanel({ area }: AreaPhotosPanelProps) {
  return (
    <Paper variant="outlined" sx={{ p: 2, height: '15rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CommonAreaCarousel
        alt={area?.name ?? 'Área Comum'}
        fallbackUrl={placeholderImage(area?.id ?? Math.random() * 1000)}
        height={230}
        areaId={area?.id ?? 0}
        photos={Array.isArray(area?.photos) ? area.photos.map(p => ({ id: p.id, base64Data: p.base64Data, contentType: p.contentType })) : []}
      />
    </Paper>
  );
}

export default AreaPhotosPanel;
