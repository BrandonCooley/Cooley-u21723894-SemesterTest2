import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function AttributesPanel({ selectedObject, onClose }) {
  if (!selectedObject) return null;

  const { id, buildingName, buildingType, height } = selectedObject;

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 16,
        right: 200,
        zIndex: 1000,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: 2,
        p: 2,
        minWidth: 250,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Building Info</Typography>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Box>
          <Typography variant="caption" color="text.secondary">Name</Typography>
          <Typography variant="body2">{buildingName}</Typography>
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary">ID</Typography>
          <Typography variant="body2">{id}</Typography>
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary">Type</Typography>
          <Typography variant="body2">{buildingType}</Typography>
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary">Height</Typography>
          <Typography variant="body2">{height}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
