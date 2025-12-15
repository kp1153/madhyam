"use client";

import React, { useCallback } from "react";
import { Stack, Text, TextInput, Button, Card } from "@sanity/ui";
import { set, unset } from "sanity";

export default function CloudinaryImageInput(props) {
  const { value, onChange } = props;

  const handleUpload = useCallback(() => {
    // Cloudinary widget configuration
    if (typeof window !== "undefined" && window.cloudinary) {
      window.cloudinary
        .createUploadWidget(
          {
            cloudName:
              process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
              "your-cloud-name",
            uploadPreset:
              process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "your-preset",
            sources: ["local", "url", "camera"],
            multiple: false,
            folder: "madhyam",
          },
          (error, result) => {
            if (!error && result && result.event === "success") {
              onChange(set(result.info.secure_url));
            }
          }
        )
        .open();
    } else {
      alert("Cloudinary widget not loaded. Please check your configuration.");
    }
  }, [onChange]);

  const handleChange = useCallback(
    (event) => {
      const inputValue = event.currentTarget.value;
      onChange(inputValue ? set(inputValue) : unset());
    },
    [onChange]
  );

  const handleClear = useCallback(() => {
    onChange(unset());
  }, [onChange]);

  return (
    <Stack space={3}>
      <TextInput
        value={value || ""}
        onChange={handleChange}
        placeholder="Cloudinary URL paste करें या Upload button दबाएं"
      />

      <Stack space={2} direction="row">
        <Button text="Upload Image" tone="primary" onClick={handleUpload} />
        {value && <Button text="Clear" tone="critical" onClick={handleClear} />}
      </Stack>

      {value && (
        <Card padding={3} radius={2} shadow={1}>
          <img
            src={value}
            alt="Preview"
            style={{
              width: "100%",
              maxWidth: "400px",
              height: "auto",
              borderRadius: "4px",
            }}
          />
        </Card>
      )}

      <Text size={1} muted>
        Cloudinary से image upload करें या direct URL paste करें
      </Text>
    </Stack>
  );
}
