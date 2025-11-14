import { useState } from 'react';
import { Button, IconButton, Tooltip } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { CommonAreaApi, type UploadCommonAreaPhotoInput } from '../../../../apiClient';
import { ApiConfiguration } from '../../../../apiClient/apiConfig';
import { useAlertStore } from '../../../../stores/alert.store';

const api = new CommonAreaApi(ApiConfiguration);

type Props = {
    areaId: number;
    onUploaded: () => Promise<void> | void;
    size?: 'small' | 'medium' | 'large';
    icon?: React.ReactNode;
    variant?: 'text' | 'outlined' | 'contained';
};

export function UploadPhotoButton({
    areaId,
    onUploaded,
    size = 'small',
    icon,
    variant = 'outlined'
}: Props) {
    const [loading, setLoading] = useState(false);
    const showAlert = useAlertStore((state) => state.showAlert);

    async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        setLoading(true);
        try {
            const buffer = await file.arrayBuffer();
            const bytes = new Uint8Array(buffer);
            let binary = '';
            bytes.forEach(b => (binary += String.fromCharCode(b)));
            const base64 = btoa(binary);

            const input: UploadCommonAreaPhotoInput = {
                areaId,
                contentType: file.type,
                fileName: file.name,
                base64Original: base64
            };

            await api.apiCommonAreaPhotosUploadPost({ uploadCommonAreaPhotoInput: input });
            await onUploaded();
        } catch (error: unknown) {
            showAlert('Erro ao enviar foto ' + (error instanceof Error ? error.message : String(error)), 'error');
        } finally {
            setLoading(false);
            e.target.value = '';
        }
    }

    const content = (
        <>
            <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleChange}
                disabled={loading}
            />
            {icon || <CloudUploadIcon fontSize={size === 'small' ? 'small' : 'medium'} />}
            {!icon && (loading ? ' Enviando...' : ' Foto')}
        </>
    );

    if (icon) {
        return (
            <Tooltip title={loading ? 'Enviando...' : 'Enviar foto'}>
                <IconButton component="label" size={size} disabled={loading}>
                    {content}
                </IconButton>
            </Tooltip>
        );
    }

    return (
        <Button
            component="label"
            size={size}
            variant={variant}
            disabled={loading}
            startIcon={!icon && <CloudUploadIcon fontSize="small" />}
        >
            {loading ? 'Enviando...' : 'Enviar Foto'}
            <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleChange}
                disabled={loading}
            />
        </Button>
    );
}