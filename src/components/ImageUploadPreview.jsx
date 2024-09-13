"use client";

import React, { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const ImageUploadPreview = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [altText, setAltText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setSelectedImage(URL.createObjectURL(file));
      convertToBase64(file);
      setAltText("");
    } else {
      setSelectedImage(null);
      setBase64Image(null);
    }
  };

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setBase64Image(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const generateAltText = async () => {
    if (!base64Image) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/generate-alt-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageBase64: base64Image }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate alt text");
      }

      const data = await response.json();
      setAltText(data.altText);
    } catch (error) {
      console.error("Error generating alt text:", error);
      setAltText("Failed to generate alt text. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-8">
      <div className="mb-6">
        <label
          htmlFor="image-upload"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Upload an image
        </label>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center w-full h-48 sm:h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
          >
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <Upload className="w-8 h-8 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="image-upload"
              type="file"
              className="hidden"
              onChange={handleImageUpload}
              accept="image/*"
            />
          </label>
        </div>
      </div>

      {selectedImage && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Image Preview</h2>
          <div className="relative w-full h-48 sm:h-64 rounded-lg overflow-hidden shadow-md">
            <img
              src={selectedImage}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <Button
            onClick={generateAltText}
            disabled={isLoading}
            className="mt-4 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-300"
          >
            {isLoading ? "Generating..." : "Generate Alt Text"}
          </Button>
        </div>
      )}

      {altText && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">AI-Generated Alt Text</h2>
          <p className="text-gray-700 bg-gray-100 p-3 rounded-lg">{altText}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploadPreview;
