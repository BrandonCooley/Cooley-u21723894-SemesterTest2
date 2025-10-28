import React, { Suspense, useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, PerspectiveCamera } from '@react-three/drei';
import {
  Box,
  CircularProgress,
  Typography,
  IconButton,
  Chip,
  Tooltip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  LinearProgress,
  Zoom
} from '@mui/material';
import * as THREE from 'three';
import { glassStyle, glassDarkStyle } from '../../theme';

import LayersIcon from '@mui/icons-material/Layers';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import TuneIcon from '@mui/icons-material/Tune';
import MapIcon from '@mui/icons-material/Map';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';

function SceneBackground({ isNight }) {
  const { scene } = useThree();

  useEffect(() => {
    const dayColor = new THREE.Color('#87CEEB');
    const nightColor = new THREE.Color('#0a1929');
    scene.background = isNight ? nightColor : dayColor;
  }, [scene, isNight]);

  return null;
}

function CampusModel({ modelPath }) {
  const gltf = useGLTF(modelPath);
  const { camera, controls } = useThree();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (gltf && gltf.scene && !initialized) {
      const scene = gltf.scene;

      const box = new THREE.Box3().setFromObject(scene);
      const min = box.min;

      const yOffset = -min.y;
      scene.position.y = yOffset;

      const newBox = new THREE.Box3().setFromObject(scene);
      const newCenter = newBox.getCenter(new THREE.Vector3());
      const newSize = newBox.getSize(new THREE.Vector3());

      // Auto-position camera to frame entire model
      const maxDim = Math.max(newSize.x, newSize.y, newSize.z);
      const fov = camera.fov * (Math.PI / 180);
      const distance = Math.abs(maxDim / Math.sin(fov / 2)) * 1.2;

      const newCameraPos = {
        x: newCenter.x + distance * 0.5,
        y: newCenter.y + distance * 0.8,
        z: newCenter.z + distance * 0.5
      };

      camera.position.set(newCameraPos.x, newCameraPos.y, newCameraPos.z);
      camera.lookAt(newCenter);
      camera.updateProjectionMatrix();

      if (controls) {
        controls.target.copy(newCenter);
        controls.update();
      }

      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;

          if (child.material) {
            child.material.needsUpdate = true;
            if (child.material.opacity !== undefined && child.material.opacity < 0.1) {
              child.material.opacity = 1.0;
            }
          }
        }
      });

      setInitialized(true);
    }
  }, [gltf, camera, controls, initialized]);

  if (!gltf || !gltf.scene) {
    return null;
  }

  return <primitive object={gltf.scene} />;
}


function Scene({ isNight }) {
  return (
    <>
      <SceneBackground isNight={isNight} />

      <PerspectiveCamera makeDefault position={[0, 100, 200]} fov={75} />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        dampingFactor={0.05}
        enableDamping={true}
        maxPolarAngle={Math.PI / 2}
        minDistance={50}
        maxDistance={800}
      />

      <ambientLight intensity={isNight ? 0.1 : 0.3} />

      <directionalLight
        position={isNight ? [-100, 80, -50] : [100, 150, 50]}
        intensity={isNight ? 0.3 : 1.5}
        color={isNight ? '#6495ED' : '#FFF5E1'}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={500}
        shadow-camera-left={-250}
        shadow-camera-right={250}
        shadow-camera-top={250}
        shadow-camera-bottom={-250}
        shadow-bias={-0.0001}
      />

      <directionalLight
        position={[-80, 100, -80]}
        intensity={isNight ? 0.1 : 0.4}
        color={isNight ? '#191970' : '#b3d4ff'}
      />

      <hemisphereLight
        skyColor={isNight ? '#0a1929' : '#87CEEB'}
        groundColor={isNight ? '#1a1a2e' : '#6b5d47'}
        intensity={isNight ? 0.2 : 0.5}
      />

      <Suspense fallback={
        <Html center>
          <Box sx={{ textAlign: 'center', color: 'white' }}>
            <CircularProgress />
            <Typography variant="body2" sx={{ mt: 2 }}>
              Loading 3D Campus Model...
            </Typography>
          </Box>
        </Html>
      }>
        <CampusModel modelPath="/3dmodel.gltf" />
      </Suspense>
    </>
  );
}

export default function CampusModelViewer({ binMetrics }) {
  const [isNight, setIsNight] = useState(false);
  const [showStats, setShowStats] = useState(true);
  const [showSettings, setShowSettings] = useState(false);


  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      <Zoom in timeout={500}>
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            zIndex: 1000,
            ...glassStyle,
            borderRadius: 3,
            p: 2,
            minWidth: 180,
            transition: 'all 0.3s ease'
          }}
        >
          <Stack spacing={1.5}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LayersIcon fontSize="small" />
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                Layers
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              Map layers controlled by QGIS export
            </Typography>
          </Stack>
        </Box>
      </Zoom>

      {showStats && binMetrics && (
        <Zoom in timeout={600}>
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 1000,
              ...glassStyle,
              borderRadius: 3,
              p: 2,
              minWidth: 220,
              transition: 'all 0.3s ease'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <InfoIcon fontSize="small" />
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  Statistics
                </Typography>
              </Box>
              <IconButton size="small" onClick={() => setShowStats(false)}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>

            <Stack spacing={1}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Total Bins
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {binMetrics.totalBins}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">
                  Average Fill Level
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={parseFloat(binMetrics.avgFillLevel)}
                    sx={{ flexGrow: 1, height: 8, borderRadius: 1 }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {binMetrics.avgFillLevel}%
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">
                  Bins by Type
                </Typography>
                <Stack direction="row" spacing={0.5} flexWrap="wrap" sx={{ mt: 0.5 }}>
                  {Object.entries(binMetrics.binsByType).map(([type, count]) => (
                    <Chip
                      key={type}
                      label={`${type}: ${count}`}
                      size="small"
                      sx={{
                        fontSize: '0.7rem',
                        height: 24,
                        bgcolor: type === 'recycling' ? '#2196f3' : type === 'compost' ? '#4caf50' : '#757575',
                        color: 'white'
                      }}
                    />
                  ))}
                </Stack>
              </Box>

              {binMetrics.needsAttention > 0 && (
                <Chip
                  label={`${binMetrics.needsAttention} bins need attention`}
                  color="warning"
                  size="small"
                  sx={{ mt: 1 }}
                />
              )}
            </Stack>
          </Box>
        </Zoom>
      )}

      <Zoom in timeout={700}>
        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            zIndex: 1000,
            display: 'flex',
            gap: 1
          }}
        >
          <Tooltip title={isNight ? 'Day Mode' : 'Night Mode'}>
            <IconButton
              onClick={() => setIsNight(!isNight)}
              sx={{
                ...glassDarkStyle,
                color: 'white',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
              }}
            >
              {isNight ? <WbSunnyIcon /> : <NightsStayIcon />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Settings">
            <IconButton
              onClick={() => setShowSettings(true)}
              sx={{
                ...glassDarkStyle,
                color: 'white',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
              }}
            >
              <TuneIcon />
            </IconButton>
          </Tooltip>

          {!showStats && (
            <Tooltip title="Show Stats">
              <IconButton
                onClick={() => setShowStats(true)}
                sx={{
                  ...glassDarkStyle,
                  color: 'white',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
                }}
              >
                <InfoIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Zoom>

      <Zoom in timeout={800}>
        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            zIndex: 1000,
            ...glassStyle,
            borderRadius: 3,
            p: 2,
            minWidth: 160
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <MapIcon fontSize="small" />
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              Controls
            </Typography>
          </Box>

          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontSize: '0.7rem' }}>
            🖱️ Drag to rotate<br/>
            🔍 Scroll to zoom<br/>
            ✋ Right-click to pan
          </Typography>
        </Box>
      </Zoom>


      <Dialog open={showSettings} onClose={() => setShowSettings(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Controls</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              🖱️ <strong>Rotate:</strong> Left-click and drag<br/>
              🔍 <strong>Zoom:</strong> Mouse wheel<br/>
              ✋ <strong>Pan:</strong> Right-click and drag
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSettings(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Canvas
        shadows
        style={{ width: '100%', height: '100%' }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
          powerPreference: 'high-performance',
          alpha: false
        }}
      >
        <Suspense fallback={
          <Html center>
            <CircularProgress />
          </Html>
        }>
          <Scene isNight={isNight} />
        </Suspense>
      </Canvas>
    </Box>
  );
}

try {
  useGLTF.preload('/3dmodel.gltf');
} catch (error) {
  console.warn('Could not preload GLTF model:', error);
}
