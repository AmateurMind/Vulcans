# Background Removal — Setup & Usage Guide

## Environment

| Key | Value |
|-----|-------|
| OS | Windows 11 |
| Working directory | `F:\Vulcans` |
| Python version | 3.11.0 |
| Virtual environment | `ai-doctor-2.0-voice-and-vision-main-JeuYEd3z` |
| Venv location | `C:\Users\suhai\.virtualenvs\ai-doctor-2.0-voice-and-vision-main-JeuYEd3z\` |

---

## Installation

Run this once using the venv's pip directly:

```powershell
& "$env:USERPROFILE\.virtualenvs\ai-doctor-2.0-voice-and-vision-main-JeuYEd3z\Scripts\pip.exe" install rembg pillow onnxruntime
```

### Packages installed

| Package | Version | Notes |
|---------|---------|-------|
| `rembg` | 2.0.72 | Core bg removal |
| `pillow` | 12.1.1 | Image I/O (already present) |
| `onnxruntime` | 1.24.2 | ML inference backend |
| `pymatting` | 1.1.15 | Alpha matting (auto-installed) |
| `scikit-image` | 0.26.0 | Image processing (auto-installed) |
| `numba` | 0.64.0 | JIT compiler for pymatting (auto-installed) |
| `pooch`, `jsonschema`, `imageio`, `lazy-loader`, `referencing` | — | Auto-installed deps |

---

## Known Issue & Fix

**Problem:** `rembg` → `pymatting` → `numba` JIT compilation crashes at import time:

```
numba.core.errors.TypingError in pymatting/alpha/estimate_alpha_sm.py
```

**Fix:** Disable Numba JIT before every run:

```powershell
$env:NUMBA_DISABLE_JIT=1
```

This makes `pymatting` fall back to pure Python — slightly slower but works correctly. **Always set this before running the script.**

---

## Script

File: `F:\Vulcans\remove_bg.py`

```python
import argparse
from pathlib import Path

from PIL import Image
from rembg import remove

SUPPORTED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}


def remove_background(input_path: Path, output_path: Path) -> None:
    input_image = Image.open(input_path)
    output_image = remove(input_image)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_image.save(output_path)


def build_output_path(input_image: Path, output_target: Path, batch_mode: bool) -> Path:
    if batch_mode or output_target.is_dir():
        return output_target / f"{input_image.stem}_nobg.png"
    return output_target


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Remove image background using rembg.")
    parser.add_argument("--input", required=True, help="Input image or folder (batch mode).")
    parser.add_argument("--output", required=True, help="Output image or folder (batch mode).")
    parser.add_argument("--batch", action="store_true", help="Process all images in input folder.")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    input_path = Path(args.input)
    output_path = Path(args.output)

    if args.batch:
        if not input_path.is_dir():
            print(f"Error: folder not found: {input_path}")
            return 1
        output_path.mkdir(parents=True, exist_ok=True)
        files = sorted([p for p in input_path.iterdir() if p.suffix.lower() in SUPPORTED_EXTENSIONS])
        if not files:
            print("No supported images found.")
            return 1
        for file_path in files:
            target = build_output_path(file_path, output_path, batch_mode=True)
            print(f"Processing: {file_path.name} -> {target.name}")
            remove_background(file_path, target)
        print(f"Done. Processed {len(files)} image(s).")
        return 0

    if not input_path.is_file():
        print(f"Error: file not found: {input_path}")
        return 1

    target = build_output_path(input_path, output_path, batch_mode=False)
    print(f"Processing: {input_path.name} -> {target.name}")
    remove_background(input_path, target)
    print("Done.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
```

---

## Usage (PowerShell)

### Single image

```powershell
$env:NUMBA_DISABLE_JIT=1
& "$env:USERPROFILE\.virtualenvs\ai-doctor-2.0-voice-and-vision-main-JeuYEd3z\Scripts\python.exe" remove_bg.py `
  --input "public\bg_remove\photo.jpg" `
  --output "public\bg_remove\photo_nobg.png"
```

### Batch (whole folder)

```powershell
$env:NUMBA_DISABLE_JIT=1
& "$env:USERPROFILE\.virtualenvs\ai-doctor-2.0-voice-and-vision-main-JeuYEd3z\Scripts\python.exe" remove_bg.py `
  --input "public\bg_remove" `
  --output "public\bg_remove\output" `
  --batch
```

---

## Output

- **Format:** PNG with transparency (alpha channel)
- **Naming:** `<original_name>_nobg.png`
- **Supported inputs:** `.jpg`, `.jpeg`, `.png`, `.webp`

### Tested

| Input | Output |
|-------|--------|
| `public/bg_remove/front-view-male-student-wearing-black-backpack-holding-copybooks-files-blue-wall.jpg` | `public/bg_remove/student_nobg.png` ✅ |
