import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Step,
    StepLabel,
    Stepper,
} from "@mui/material";
import { useDebounce } from "use-debounce";
import { useCondominiumStore } from "../../../stores/condominium.store";
import { useAuthStore } from "../../../stores/auth.store";
import { useAlertStore } from "../../../stores/alert.store";
import { AddressApi } from "../../../apiClient";
import { ApiConfiguration } from "../../../apiClient/apiConfig";
import { StepCondoAddress } from "./steps/StepCondoAddress";
import { StepBlocks } from "./steps/StepBlocks";
import { StepFloorsApartments } from "./steps/StepFloorsApartments";

type ApartmentForm = { id?: number; number: string; floorNumber: number; };
type BlockForm = {
    id?: number;
    name: string;
    startFloorNumber: number;
    residentialFloors: number;
    apartmentsPerFloor: number;
    apartments: ApartmentForm[];
};


interface CreateOrEditCondominiumProps {
    open: boolean;
    onClose: () => void;
    fullScreen?: boolean;
    condominiumId?: number | null;
}

export const CreateOrEditCondominium: React.FC<CreateOrEditCondominiumProps> = ({ open, onClose, fullScreen, condominiumId }) => {
    const { condominiums, createOrEditCondominium, fetchCondominiums } = useCondominiumStore();
    const { user } = useAuthStore();
    const showAlert = useAlertStore((s) => s.showAlert);
    const { isCondominiumAdmin } = useCondominiumStore();

    const addressApi = useMemo(() => new AddressApi(ApiConfiguration), []);

    const [saving, setSaving] = useState(false);
    const [loadingCep, setLoadingCep] = useState(false);
    const [cepValido, setCepValido] = useState(false);
    const [loadingData, setLoadingData] = useState(false);

    const [activeStep, setActiveStep] = useState(0);
    const steps = ["Condomínio e Endereço", "Blocos", "Andares e Apartamentos"];

    const [form, setForm] = useState({
        id: condominiumId || undefined,
        name: "",
        cnpj: "",
        email: "",
        address: {
            street: "",
            number: "",
            complement: "",
            district: "",
            city: "",
            state: "",
            zipCode: "",
            country: "Brasil",
        },
    });

    const [blocks, setBlocks] = useState<BlockForm[]>([]);
    const [debouncedCep] = useDebounce(form.address.zipCode, 800);
    const [blockLoadingStatus, setBlockLoadingStatus] = useState<{ [key: number]: "idle" | "loading" | "success"; }>({});

    const canEditBlocks = !condominiumId || isCondominiumAdmin(condominiumId, user?.id ?? 0);

    const fetchAddress = useCallback(async () => {
        const cep = debouncedCep?.replace(/\D/g, "");
        if (!cep || cep.length !== 8) return;
        setLoadingCep(true);
        try {
            const response = await addressApi.apiAddressCepGet({ cep });
            setForm((prev) => ({
                ...prev,
                address: {
                    ...prev.address,
                    street: response.street || "",
                    district: response.district || "",
                    city: response.city || "",
                    state: response.state || "",
                    country: response.country || "Brasil",
                },
            }));
            setCepValido(true);
        } catch {
            setCepValido(false);
            showAlert("CEP inválido.", "error");
        } finally {
            setLoadingCep(false);
        }
    }, [debouncedCep, addressApi, showAlert]);

    useEffect(() => {
        fetchAddress();
    }, [fetchAddress]);

    useEffect(() => {
        if (!condominiumId) return;
        setLoadingData(true);
        const cond = condominiums.find((c: any) => c.id === condominiumId);
        if (cond) {
            setForm({
                id: cond.id,
                name: cond.name || "",
                cnpj: cond.cnpj || "",
                email: cond.email || "",
                address: {
                    street: cond.address?.street || "",
                    number: cond.address?.number || "",
                    complement: cond.address?.complement || "",
                    district: cond.address?.district || "",
                    city: cond.address?.city || "",
                    state: cond.address?.state || "",
                    zipCode: cond.address?.zipCode || "",
                    country: cond.address?.country || "Brasil",
                },
            });
            const existingBlocks: BlockForm[] = (cond.blocks || []).map((b: any, idx: number) => {
                const apartments: ApartmentForm[] = (b.apartments || []).map((a: any) => ({
                    id: a.id,
                    number: String(a.number ?? a.name ?? ""),
                    floorNumber: Number(a.floorNumber ?? 0),
                }));
                const floors = Array.from(new Set(apartments.map((a) => a.floorNumber))).sort((a, b) => a - b);
                const startFloorNumber = floors.length ? floors[0] : 1;
                const residentialFloors = floors.length || 1;
                const apartmentsPerFloor = Math.max(
                    1,
                    ...floors.map((f) => apartments.filter((a) => a.floorNumber === f).length)
                );
                return {
                    id: b.id,
                    name: b.name || `Bloco ${idx + 1}`,
                    startFloorNumber,
                    residentialFloors,
                    apartmentsPerFloor,
                    apartments,
                };
            });
            setBlocks(existingBlocks);
            setCepValido(Boolean(cond.address?.zipCode));
        }
        setLoadingData(false);
    }, [condominiumId, condominiums]);

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };
    const handleAddressChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, address: { ...prev.address, [field]: value } }));
    };

    const canGoNext = () => {
        if (activeStep === 0) return Boolean(form.name && form.email);
        if (activeStep === 1) return blocks.length > 0 && blocks.every((b) => b.name.trim());
        if (activeStep === 2)
            return blocks.every(
                (b) => b.residentialFloors > 0 && b.apartmentsPerFloor > 0
            );
        return true;
    };

    const handleNext = () => {
        if (activeStep < steps.length - 1) setActiveStep((s) => s + 1);
    };
    const handleBack = () => {
        if (activeStep > 0) setActiveStep((s) => s - 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const blockLoadingStatus: { [key: number]: "idle" | "loading" | "success"; } = {};
        blocks.forEach((_, idx) => (blockLoadingStatus[idx] = "idle"));
        setBlockLoadingStatus(blockLoadingStatus);

        const updatedBlocks = await Promise.all(
            blocks.map(async (block, idx) => {
                setBlockLoadingStatus((prev) => ({ ...prev, [idx]: "loading" }));

                const { startFloorNumber, residentialFloors, apartmentsPerFloor } = block;
                const apartments: ApartmentForm[] = [];
                for (let floor = 0; floor < residentialFloors; floor++) {
                    const floorNumber = startFloorNumber + floor;
                    for (let apt = 1; apt <= apartmentsPerFloor; apt++) {
                        const apartmentNumber = `${floorNumber}${String(apt).padStart(2, "0")}`;
                        apartments.push({ number: apartmentNumber, floorNumber });
                    }
                }

                await new Promise((resolve) => setTimeout(resolve, 1000));

                setBlockLoadingStatus((prev) => ({ ...prev, [idx]: "success" }));
                return { ...block, apartments };
            })
        );

        const payload: any = {
            id: form.id,
            name: form.name,
            cnpj: form.cnpj,
            email: form.email,
            address: { ...form.address },
            blocks: updatedBlocks.map((block) => ({
                id: block.id,
                name: block.name,
                apartments: block.apartments.map((apartment) => ({
                    id: apartment.id,
                    number: apartment.number,
                    floorNumber: apartment.floorNumber,
                })),
            })),
        };

        setSaving(true);
        try {
            await createOrEditCondominium(payload);
            await fetchCondominiums(user?.id);
            showAlert("Condomínio salvo com sucesso.", "success");
            onClose();
        } catch (err: any) {
            showAlert(err?.message || "Erro ao salvar o condomínio.", "error");
        } finally {
            setSaving(false);
        }
    };

    if (loadingData) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" py={6}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullScreen={fullScreen}
            fullWidth
            maxWidth="sm"
            sx={{
                '& .MuiDialog-container': {
                    alignItems: 'center', // força centralização vertical mesmo com pouca altura
                },
                '& .MuiDialog-paper': {
                    borderRadius: 3,
                },
            }}
        >
            <DialogTitle>
                <Stepper activeStep={activeStep} sx={{ mb: 2 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </DialogTitle>
            <DialogContent>

                {activeStep === 0 && (
                    <StepCondoAddress
                        form={form}
                        onField={handleChange}
                        onAddress={handleAddressChange}
                        loadingCep={loadingCep}
                        cepValido={cepValido}
                    />
                )}

                {activeStep === 1 && (
                    <StepBlocks blocks={blocks} setBlocks={setBlocks} canEditBlocks={canEditBlocks} />
                )}

                {activeStep === 2 && (
                    <StepFloorsApartments
                        blocks={blocks}
                        setBlocks={setBlocks}
                        canEditBlocks={canEditBlocks}
                        blockLoadingStatus={blockLoadingStatus}
                    />
                )}
            </DialogContent>
            <DialogActions>

                <Box display="flex" gap={1} mt={2} justifyContent="flex-end">
                    <Button variant="outlined" onClick={handleBack} disabled={activeStep === 0}>
                        Voltar
                    </Button>
                    {activeStep < steps.length - 1 && (
                        <Button variant="contained" onClick={handleNext} disabled={!canGoNext()}>
                            Próximo
                        </Button>
                    )}
                    {activeStep === steps.length - 1 && (
                        <Button onClick={handleSubmit} type="submit" variant="contained" disabled={!canGoNext() || saving}>
                            {saving ? "Salvando..." : condominiumId ? "Salvar alterações" : "Salvar condomínio"}
                        </Button>
                    )}
                </Box>
            </DialogActions>

        </Dialog>
    );
};

