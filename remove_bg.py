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
    if batch_mode:
        return output_target / f"{input_image.stem}_nobg.png"
    if output_target.is_dir():
        return output_target / f"{input_image.stem}_nobg.png"
    return output_target


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Remove image background using rembg.")
    parser.add_argument("--input", required=True, help="Input image path or input folder in --batch mode.")
    parser.add_argument("--output", required=True, help="Output image path or output folder in --batch mode.")
    parser.add_argument("--batch", action="store_true", help="Process all supported images from input folder.")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    input_path = Path(args.input)
    output_path = Path(args.output)

    if args.batch:
        if not input_path.is_dir():
            print(f"Error: input folder not found: {input_path}")
            return 1
        output_path.mkdir(parents=True, exist_ok=True)
        files = sorted([p for p in input_path.iterdir() if p.suffix.lower() in SUPPORTED_EXTENSIONS])
        if not files:
            print("No supported images found in input folder.")
            return 1
        for file_path in files:
            target_path = build_output_path(file_path, output_path, batch_mode=True)
            print(f"Processing: {file_path.name} -> {target_path.name}")
            remove_background(file_path, target_path)
        print(f"Done. Processed {len(files)} image(s).")
        return 0

    if not input_path.is_file():
        print(f"Error: input image not found: {input_path}")
        return 1

    target_path = build_output_path(input_path, output_path, batch_mode=False)
    print(f"Processing: {input_path.name} -> {target_path.name}")
    remove_background(input_path, target_path)
    print("Done.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
