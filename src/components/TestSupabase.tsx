import React, { useState, ChangeEvent } from 'react';
import { uploadPhoto, listPhotos } from '../supabaseClient';

// Define a type for the file list items
interface Photo {
  name: string;
  id: string;
}

const TestSupabase: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Handle file selection
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  // Upload the selected file
  const uploadFile = async (): Promise<void> => {
    if (selectedFile) {
      await uploadPhoto(selectedFile);
      fetchPhotos(); // refresh photo list after upload
    }
  };

  // Fetch the list of photos
  const fetchPhotos = async (): Promise<void> => {
    const data = await listPhotos();
    if (data) {
      setPhotos(data.map((item: any) => ({ name: item.name, id: item.id })));
    }
  };

  return (
    <div>
      <h1>Supabase Storage Test</h1>

      <input type="file" onChange={handleFileUpload} />
      <button onClick={uploadFile} disabled={!selectedFile}>
        Upload Photo 77
      </button>

      <h2>Uploaded Photos:</h2>
      <ul>
        {photos.map((photo) => (
          <li key={photo.id}>{photo.name}</li>
        ))}
      </ul>

      <button onClick={fetchPhotos}>Fetch Photos</button>
    </div>
  );
};

export default TestSupabase;
