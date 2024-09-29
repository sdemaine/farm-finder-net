import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";
import { HexColorPicker } from "react-colorful";
import getCroppedImg from "@/utils/cropImage"; // Helper function to crop the image

export function FarmGalleryUpload() {
  const [_, setFiles] = useState<File[]>([]);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [color, setColor] = useState("#ffffff"); // Default color correction to white
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
    };
    reader.readAsDataURL(file);
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'] },
    onDrop,
  });

  const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      // Perform color correction and other tweaks if needed
      console.log("Cropped Image:", croppedImage);

      // Redirect to gallery or save logic here
      navigate("/farm-admin/gallery");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Upload and Edit Farm Photos</h1>

      {/* Dropzone for Image Upload */}
      <div
        {...getRootProps({ className: "dropzone border-dashed border-2 p-6 mb-4" })}
        className="w-full flex flex-col items-center justify-center border rounded-md text-center"
      >
        <input {...getInputProps()} />
        <p>Drag & drop some files here, or click to select files</p>
        <em>(Only images will be accepted)</em>
      </div>

      {/* Image Cropper */}
      {imageSrc && (
        <div className="relative h-96 mb-4">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3} // Aspect ratio for farm images
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            cropShape="rect"
          />
          <div className="flex justify-between mt-2">
            <label>
              Zoom: 
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={(e) => setZoom(Number(e.target.value))}
              />
            </label>
          </div>
        </div>
      )}

      {/* Color Picker for Color Correction */}
      {imageSrc && (
        <div className="mb-4">
          <h2 className="font-semibold text-lg">Adjust Image Color</h2>
          <HexColorPicker color={color} onChange={setColor} />
          <p>Current Color: {color}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button variant="secondary" onClick={() => setImageSrc(null)}>
          Cancel
        </Button>
        <Button variant="default" onClick={handleSave}>
          Save Image
        </Button>
      </div>
    </div>
  );
}

export default FarmGalleryUpload;
