# OBJ Demo Integration

- [x] Confirm source OBJ files and destination paths
  - Located both source models in `f:/react-3d-model-viewer` and existing viewer route in `app/(public)/obj-viewer/page.tsx`.
- [x] Copy requested OBJ files into public/models with stable web-safe names
  - Added `public/models/R2-base-drive-shooter.obj`.
  - Added `public/models/R2-2k24.obj`.
- [x] Update obj-viewer page to switch between both models
  - Added two-button model selector and dynamic `OBJViewer` source switching.
- [x] Verify with lint/build check
  - `npm run lint` timed out due to large generated chunks under `admin/.next`.
  - Targeted verification passed: `npx eslint app/(public)/obj-viewer/page.tsx`.
- [x] Record final review summary
  - Demo now supports toggling and viewing both requested OBJ models.
