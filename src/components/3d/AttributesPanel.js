import React from 'react';
import { Box, Typography, IconButton, Stack, Divider, Zoom } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { glassStyle } from '../../theme';

export default function AttributesPanel({ selectedObject, onClose }) {
  if (!selectedObject) return null;

  const { name, position, extras, materialInfo } = selectedObject;

  return (
    <Zoom in timeout={400}>
      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 200, // Position left of the controls panel
          zIndex: 1000,
          ...glassStyle,
          borderRadius: 3,
          p: 2,
          minWidth: 280,
          maxWidth: 320,
          maxHeight: '60vh',
          overflowY: 'auto',
          transition: 'all 0.3s ease'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <InfoOutlinedIcon fontSize="small" color="primary" />
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              Object Attributes
            </Typography>
          </Box>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Stack spacing={2}>
          {/* Object Name */}
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
              Name
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.5 }}>
              {name || 'Unnamed Object'}
            </Typography>
          </Box>

          {/* Position */}
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
              Position (x, y, z)
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.5, fontFamily: 'monospace' }}>
              {position.x.toFixed(2)}, {position.y.toFixed(2)}, {position.z.toFixed(2)}
            </Typography>
          </Box>

          {/* GLTF Extras */}
          {extras && Object.keys(extras).length > 0 && (
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                GLTF Properties
              </Typography>
              <Stack spacing={0.5} sx={{ mt: 0.5 }}>
                {Object.entries(extras).map(([key, value]) => (
                  <Box key={key} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">
                      {key}:
                    </Typography>
                    <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
                      {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          )}

          {/* Material Information */}
          {materialInfo && (
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                Material
              </Typography>
              <Stack spacing={0.5} sx={{ mt: 0.5 }}>
                {materialInfo.name && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">
                      Type:
                    </Typography>
                    <Typography variant="caption">
                      {materialInfo.name}
                    </Typography>
                  </Box>
                )}
                {materialInfo.color && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      Color:
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          borderRadius: '50%',
                          bgcolor: materialInfo.color,
                          border: '1px solid rgba(0,0,0,0.2)'
                        }}
                      />
                      <Typography variant="caption" sx={{ fontFamily: 'monospace', fontSize: '0.65rem' }}>
                        {materialInfo.color}
                      </Typography>
                    </Box>
                  </Box>
                )}
                {materialInfo.opacity !== undefined && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">
                      Opacity:
                    </Typography>
                    <Typography variant="caption">
                      {(materialInfo.opacity * 100).toFixed(0)}%
                    </Typography>
                  </Box>
                )}
              </Stack>
            </Box>
          )}
        </Stack>
      </Box>
    </Zoom>
  );
}
