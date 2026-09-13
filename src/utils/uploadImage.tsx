
export const uploadImage = async (imageFile: File): Promise<string> => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary configuration is missing");
  }

  const formData = new FormData();

  formData.append("file", imageFile);

  formData.append("upload_preset", uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  console.log("Cloudinary response:", data);

  if (!response.ok) {
    throw new Error(
      data?.error?.message || "Image upload failed"
    );
  }

  if (!data?.secure_url) {
    throw new Error("Image URL not found");
  }

  return data.secure_url;
};

