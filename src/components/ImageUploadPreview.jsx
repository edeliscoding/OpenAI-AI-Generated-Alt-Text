"use client";

import React, { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const ImageUploadPreview = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [altText, setAltText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [base64Image, setBase64Image] = useState(null);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setSelectedImage(URL.createObjectURL(file));
      convertToBase64(file);

      setAltText(""); // Reset alt text when a new image is uploaded
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
    <div className="max-w-md mx-auto mt-10">
      <div className="mb-4">
        <label
          htmlFor="image-upload"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Upload an image
        </label>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-10 h-10 mb-3 text-gray-400" />
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
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Image Preview</h2>
          <img
            src={selectedImage}
            alt="Preview"
            className="w-full h-auto object-contain rounded-lg shadow-md"
            style={{ maxHeight: "400px" }}
          />
          <Button
            onClick={generateAltText}
            disabled={isLoading}
            className="mt-4 w-full"
          >
            {isLoading ? "Generating..." : "Generate Alt Text"}
          </Button>
        </div>
      )}

      {altText && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">AI-Generated Alt Text</h2>
          <p className="text-gray-700">{altText}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploadPreview;
