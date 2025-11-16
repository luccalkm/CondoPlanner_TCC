import React, { useCallback, useRef, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Typography,
    Stack,
    Box,
    Button,
    useTheme,
    CircularProgress,
    alpha
} from '@mui/material';
import { Close, ContentCopy, Share, PictureAsPdf } from '@mui/icons-material';
import QRCode from 'react-qr-code';
import jsPDF from 'jspdf';
import { useAlertStore } from '../../../../stores/alert.store';
import { ETipoUsuario } from '../../../../apiClient';

export interface InviteData {
    roleType: ETipoUsuario;
    roleLabel: string;
    url: string;
    expires?: Date | null;
}

interface Props {
    open: boolean;
    onClose: () => void;
    invite: InviteData | null;
    condominiumName?: string | null;
}

async function svgToPngDataUrl(svgEl: SVGSVGElement, outputSize: number): Promise<string> {
    const xml = new XMLSerializer().serializeToString(svgEl);
    const blob = new Blob([xml], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    try {
        const img = await new Promise<HTMLImageElement>((resolve, reject) => {
            const i = new Image();
            i.onload = () => resolve(i);
            i.onerror = reject;
            i.src = url;
        });

        const canvas = document.createElement('canvas');
        canvas.width = outputSize;
        canvas.height = outputSize;
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, outputSize, outputSize);
        ctx.drawImage(img, 0, 0, outputSize, outputSize);
        return canvas.toDataURL('image/png');
    } finally {
        URL.revokeObjectURL(url);
    }
}

const InviteDialog: React.FC<Props> = ({ open, onClose, invite, condominiumName }) => {
    const theme = useTheme();
    const showAlert = useAlertStore(s => s.showAlert);
    const [downloadingPdf, setDownloadingPdf] = useState(false);

    const qrContainerRef = useRef<HTMLDivElement | null>(null);

    const copyToClipboard = useCallback(async () => {
        if (!invite) return;
        try {
            await navigator.clipboard.writeText(invite.url);
            showAlert('Link copiado.', 'success');
        } catch {
            showAlert('Falha ao copiar.', 'error');
        }
    }, [invite, showAlert]);

    const shareLink = useCallback(async () => {
        if (!invite) return;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Convite Condomínio',
                    text: `Use este link para ingressar (${invite.roleLabel}).`,
                    url: invite.url
                });
                showAlert('Convite compartilhado.', 'success');
            } catch {
                showAlert('Compartilhamento cancelado ou não suportado.', 'info');
            }
        } else {
            copyToClipboard();
        }
    }, [invite, copyToClipboard, showAlert]);

    const downloadPdf = useCallback(async () => {
        if (!invite) return;
        setDownloadingPdf(true);
        try {
            const doc = new jsPDF('portrait', 'pt', 'a4');
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 48;
            const primary = theme.palette.primary.main;

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(22);
            doc.setTextColor(primary);
            const title = (condominiumName || 'Condomínio').toUpperCase();
            doc.text(title, pageWidth / 2, 70, { align: 'center' });

            doc.setFontSize(14);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(60);
            const call = `INSCREVA-SE como ${invite.roleLabel.toUpperCase()}`;
            doc.text(call, pageWidth / 2, 100, { align: 'center' });

            const qrBoxY = 130;
            const qrSize = 220;

            const svgEl = qrContainerRef.current?.querySelector('svg');
            if (!svgEl) throw new Error('QR Code não encontrado.');
            const qrDataUrl = await svgToPngDataUrl(svgEl, qrSize);

            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(primary);
            doc.text('ESCANEIE O QR CODE', pageWidth / 2, qrBoxY - 2, { align: 'center' });

            doc.addImage(qrDataUrl, 'PNG',
                (pageWidth - qrSize) / 2,
                qrBoxY + 10,
                qrSize,
                qrSize
            );

            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(20);
            const linkY = qrBoxY + qrSize + 40;
            const linkLines = doc.splitTextToSize(invite.url, pageWidth - margin * 2);
            doc.text('Link direto:', margin, linkY);
            doc.setTextColor(primary);
            doc.text(linkLines, margin, linkY + 16);

            doc.setTextColor(60);
            let yCursor = linkY + 16 + linkLines.length * 14 + 20;
            if (invite.expires) {
                doc.setFontSize(10);
                doc.text(
                    `Convite válido até: ${invite.expires.toLocaleString()}`,
                    margin,
                    yCursor
                );
                yCursor += 18;
            }

            doc.setFontSize(11);
            doc.setTextColor(50);
            const steps = [
                '1. Aponte a câmera do celular para o QR Code (ou use o link).',
                '2. Faça login ou registre-se se ainda não possui conta.',
                '3. A associação ao condomínio será aplicada automaticamente.',
                '4. Em caso de dúvida, contate a administração.'
            ];
            steps.forEach((s, idx) => {
                doc.text(s, margin, yCursor + idx * 16);
            });

            doc.setFontSize(9);
            doc.setTextColor(120);
            doc.text(
                `Gerado em ${new Date().toLocaleString()} - CondoPlanner`,
                pageWidth / 2,
                pageHeight - 40,
                { align: 'center' }
            );

            doc.save(`Convite_${invite.roleLabel}_${title}.pdf`);
            showAlert('PDF gerado.', 'success');
        } catch (e) {
            console.error(e);
            showAlert('Falha ao gerar PDF.', 'error');
        } finally {
            setDownloadingPdf(false);
        }
    }, [invite, showAlert, theme.palette.primary.main, condominiumName]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    pr: 2
                }}
            >
                <Typography variant="h6" fontWeight={700}>
                    Convite de Ingresso
                </Typography>
                <IconButton onClick={onClose}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
                {!invite ? (
                    <Typography variant="body2" color="text.secondary">
                        Nenhum convite selecionado.
                    </Typography>
                ) : (
                    <Stack spacing={3} display={'flex'}>
                        <Box textAlign="center">
                            <Typography variant="subtitle1" fontWeight={600}>
                                QRCode para {invite.roleLabel}
                            </Typography>
                            <Box
                                ref={qrContainerRef}
                                mt={1}
                                p={2}
                                bgcolor="#fff"
                                borderRadius={2}
                                border="1px solid"
                                borderColor="divider"
                                display="inline-block"
                            >
                                <QRCode value={invite.url} size={180} />
                            </Box>
                            {invite.expires && (
                                <Typography variant="caption" mt={1} color="text.secondary" display="block">
                                    Expira em: {invite.expires.toLocaleString()}
                                </Typography>
                            )}
                        </Box>

                        <Box>
                            <Typography variant="subtitle2" mb={1}>Link direto</Typography>
                            <Box
                                p={1.5}
                                bgcolor="background.paper"
                                border="1px solid"
                                borderColor="divider"
                                borderRadius={1}
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                gap={1}
                            >
                                <Typography variant="body2" sx={{ wordBreak: 'break-all', flex: 1 }}>
                                    {invite.url}
                                </Typography>
                                <Stack direction="row" spacing={1}>
                                    <IconButton size="small" onClick={copyToClipboard}>
                                        <ContentCopy fontSize="small" />
                                    </IconButton>
                                    <IconButton size="small" onClick={shareLink}>
                                        <Share fontSize="small" />
                                    </IconButton>
                                </Stack>
                            </Box>
                            <Typography variant="caption" color="text.secondary" mt={1} display="block">
                                Usuário não autenticado fará login/registro e será associado automaticamente.
                            </Typography>
                        </Box>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <Button
                                variant="contained"
                                startIcon={<PictureAsPdf />}
                                onClick={downloadPdf}
                                disabled={downloadingPdf}
                            >
                                {downloadingPdf ? <CircularProgress size={18} /> : 'Baixar PDF'}
                            </Button>
                            <Button 
                            variant="outlined" 
                            color='error' 
                            sx={{ fontWeight: 'bold', border: 1, bgcolor: alpha(theme.palette.error.main, 0.1) }} 
                            onClick={onClose}
                            >
                                Fechar
                            </Button>
                        </Stack>
                    </Stack>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default InviteDialog;