import React from "react";
import { Paper, Typography, Divider, Box, Grid, TextField, CircularProgress } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

type ApartmentForm = { id?: number; number: string; floorNumber: number };
type BlockForm = {
    id?: number;
    name: string;
    startFloorNumber: number;
    residentialFloors: number;
    apartmentsPerFloor: number;
    apartments: ApartmentForm[];
};

type Props = {
    blocks: BlockForm[];
    setBlocks: React.Dispatch<React.SetStateAction<BlockForm[]>>;
    canEditBlocks: boolean;
    blockLoadingStatus: { [key: number]: "idle" | "loading" | "success" };
};

export const StepFloorsApartments: React.FC<Props> = ({
    blocks,
    setBlocks,
    canEditBlocks,
    blockLoadingStatus,
}) => {
    return (
        <Paper sx={{ p: 2, borderRadius: 3, maxHeight: "100%", overflow: "auto" }}>
            <Typography variant="h6" gutterBottom>
                Andares e Apartamentos
            </Typography>
            <Divider sx={{ my: 2 }} />

            {blocks.map((block, idx) => (
                <Paper
                    key={idx}
                    variant="outlined"
                    sx={{
                        p: 2,
                        borderRadius: 2,
                        mb: 2,
                        backgroundColor: "#f9f9f9",
                        position: "relative",
                    }}
                >
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography variant="subtitle1" gutterBottom>
                            {block.name}
                        </Typography>
                        {blockLoadingStatus[idx] === "loading" && <CircularProgress size={20} />}
                        {blockLoadingStatus[idx] === "success" && (
                            <CheckCircle color="success" fontSize="small" />
                        )}
                    </Box>
                    <Grid container spacing={2} alignItems="center">
                        <Grid size={12}>
                            <TextField
                                label="Andar inicial"
                                type="number"
                                value={block.startFloorNumber}
                                onChange={(e) =>
                                    setBlocks((prev) =>
                                        prev.map((b, i) =>
                                            i === idx
                                                ? { ...b, startFloorNumber: Number(e.target.value) }
                                                : b
                                        )
                                    )
                                }
                                fullWidth
                                helperText="Ex.: 6 para iniciar no 6º andar (601...)"
                                disabled={!canEditBlocks || blockLoadingStatus[idx] === "loading"}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                label="Qtde andares residenciais"
                                type="number"
                                value={block.residentialFloors}
                                onChange={(e) =>
                                    setBlocks((prev) =>
                                        prev.map((b, i) =>
                                            i === idx
                                                ? { ...b, residentialFloors: Number(e.target.value) }
                                                : b
                                        )
                                    )
                                }
                                fullWidth
                                disabled={!canEditBlocks || blockLoadingStatus[idx] === "loading"}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                label="Aptos por andar"
                                type="number"
                                value={block.apartmentsPerFloor}
                                onChange={(e) =>
                                    setBlocks((prev) =>
                                        prev.map((b, i) =>
                                            i === idx
                                                ? { ...b, apartmentsPerFloor: Number(e.target.value) }
                                                : b
                                        )
                                    )
                                }
                                fullWidth
                                disabled={!canEditBlocks || blockLoadingStatus[idx] === "loading"}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            ))}
        </Paper>
    );
};