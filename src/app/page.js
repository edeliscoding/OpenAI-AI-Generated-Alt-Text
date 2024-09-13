import ImageUploadPreview from "@/components/ImageUploadPreview";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">
        Image Upload with AI-Generated Alt Text
      </h1>
      <ImageUploadPreview />
    </div>
  );
}
