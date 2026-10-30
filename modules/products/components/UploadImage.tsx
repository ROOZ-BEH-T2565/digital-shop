"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductImage } from "@/types/productsType";
import { X, Upload } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────

type UploadImageProps = {
  productId: number;
  initialImages?: ProductImage[];
};

// ─────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────
function UploadImage({ productId, initialImages = [] }: UploadImageProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [images, setImages] = useState<ProductImage[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialImages.length > 0) return;

    let cancelled = false;

    fetch(`/api/image?productId=${productId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && Array.isArray(data.images)) {
          setImages(data.images);
        }
      })
      .catch((err) => {
        if (!cancelled) console.error("Failed to load images:", err);
      });

    return () => {
      cancelled = true;
    };
  }, [productId, initialImages.length]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // ───────────────────────────────────────────────────
  // File selection + preview
  // ───────────────────────────────────────────────────
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setError(null);

    // Clean up previous preview
    if (preview) URL.revokeObjectURL(preview);

    if (!selected) {
      setFile(null);
      setPreview(null);
      return;
    }

    // Client-side validation
    if (!selected.type.startsWith("image/")) {
      setError("Only image files are allowed");
      setFile(null);
      setPreview(null);
      return;
    }

    if (selected.size > 5 * 1024 * 1024) {
      setError("File size must not exceed 5MB");
      setFile(null);
      setPreview(null);
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  // ───────────────────────────────────────────────────
  // Upload
  // ───────────────────────────────────────────────────
  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("productId", String(productId));

    try {
      const res = await fetch("/api/image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Upload failed");
      }

      // Add new image to the list
      setImages((prev) => [
        ...prev,
        { id: data.imageId, image: data.url, productId },
      ]);

      // Clean up
      setFile(null);
      if (preview) URL.revokeObjectURL(preview);
      setPreview(null);
      if (inputRef.current) inputRef.current.value = "";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setUploading(false);
    }
  };

  // ───────────────────────────────────────────────────
  // Delete
  // ───────────────────────────────────────────────────
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this image?")) return;

    setDeletingId(id);
    setError(null);

    try {
      const res = await fetch(`/api/image/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Delete failed");
      }

      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setDeletingId(null);
    }
  };

  // ───────────────────────────────────────────────────
  // Render
  // ───────────────────────────────────────────────────
  return (
    <div className="w-full space-y-4">
      {/* Title */}
      <Label htmlFor="picture">Product Images</Label>

      {/* File selection + button */}
      <div className="flex gap-2 w-full items-center">
        <Input
          ref={inputRef}
          type="file"
          id="picture"
          accept="image/*"
          onChange={handleChangeFile}
          disabled={uploading}
          className="cursor-pointer"
        />
        <Button
          type="button"
          onClick={handleUpload}
          disabled={!file || uploading}
          className="shrink-0"
        >
          {uploading ? (
            <>Uploading...</>
          ) : (
            <>
              <Upload className="w-4 h-4 ml-1" />
              Upload
            </>
          )}
        </Button>
      </div>

      {/* Selected file preview */}
      {preview && (
        <div className="flex items-center gap-3 p-3 border rounded-md bg-gray-50">
          <Image
            src={preview}
            alt="preview"
            width={64}
            height={64}
            className="rounded-md object-cover"
            unoptimized
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{file?.name}</p>
            <p className="text-xs text-gray-500">
              {file ? `${(file.size / 1024).toFixed(1)} KB` : ""}
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => {
              setFile(null);
              if (preview) URL.revokeObjectURL(preview);
              setPreview(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-md p-2">
          {error}
        </p>
      )}

      {/* Saved images gallery */}
      {images.length > 0 && (
        <div className="flex gap-3 flex-wrap">
          {images.map((item) => (
            <div
              key={item.id}
              className="relative group rounded-md overflow-hidden border"
            >
              <Image
                src={item.image}
                alt="product image"
                width={120}
                height={120}
                className="object-cover w-[120px] h-[120px]"
              />

              {/* Delete button */}
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                disabled={deletingId === item.id}
                className="absolute top-1 right-1 bg-white rounded-full p-1 shadow opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                aria-label="Delete image"
              >
                <X
                  className={`w-4 h-4 text-red-500 ${
                    deletingId === item.id ? "animate-spin" : ""
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {images.length === 0 && !file && (
        <p className="text-sm text-gray-500 text-center py-4">
          No images added yet
        </p>
      )}
    </div>
  );
}

export default UploadImage;
