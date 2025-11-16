import React from "react";
import { Paper, Typography, Divider, Box, Button, Chip, Grid, TextField, IconButton, Icon } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useCondominiumStore } from "../../../../stores/condominium.store";

type BlockForm = {
    id?: number;
    name: string;
    startFloorNumber: number;
    residentialFloors: number;
    apartmentsPerFloor: number;
    apartments: { id?: number; number: string; floorNumber: number }[];
};

type Props = {
    blocks: BlockForm[];
    setBlocks: React.Dispatch<React.SetStateAction<BlockForm[]>>;
    canEditBlocks: boolean;
};

export const StepBlocks: React.FC<Props> = ({ blocks, setBlocks, canEditBlocks }) => {
    
    const updateBlockCount = (count: number) => {
        if (count < 0) return;
        setBlocks((prev) => {
            const updatedBlocks = [...prev];
            if (count > updatedBlocks.length) {
                for (let i = updatedBlocks.length; i < count; i++) {
                    updatedBlocks.push({
                        name: `Bloco ${i + 1}`,
                        startFloorNumber: 1,
                        residentialFloors: 1,
                        apartmentsPerFloor: 1,
                        apartments: [],
                    });
                }
            } else if (count < updatedBlocks.length) {
                updatedBlocks.length = count;
            }
            return updatedBlocks;
        });
    };

    return (
        <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6">Blocos</Typography>
                <Box display="flex" gap={1}>
                    <IconButton
                        color="primary"
                        onClick={() => updateBlockCount(blocks.length + 1)}
                        disabled={!canEditBlocks}
                    >
                        <Add />
                    </IconButton>
                </Box>
            </Box>
            <Divider sx={{ my: 2 }} />

            {blocks.length === 0 && (
                <Chip label="Adicione pelo menos 1 bloco" color="warning" variant="outlined" />
            )}

            <Grid container spacing={2} sx={{ mt: 1 }}>
                {blocks.map((block, idx) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={idx}>
                        <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <TextField
                                    label="Nome do bloco"
                                    value={block.name}
                                    onChange={(e) =>
                                        setBlocks((prev) =>
                                            prev.map((b, i) =>
                                                i === idx ? { ...b, name: e.target.value } : b
                                            )
                                        )
                                    }
                                    fullWidth
                                    disabled={!canEditBlocks}
                                />
                                <IconButton
                                    color="error"
                                    onClick={() => updateBlockCount(blocks.length - 1)}
                                    disabled={!canEditBlocks}
                                >
                                    <Delete />
                                </IconButton>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};