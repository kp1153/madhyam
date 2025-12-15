"use client";

import React, { useCallback } from "react";
import { Stack, Button, Card, Flex, Text, TextInput, Box } from "@sanity/ui";
import { set, unset, insert } from "sanity";
import { TrashIcon } from "@sanity/icons";

export default function MultiImageInput(props) {
  const { value = [], onChange } = props;

  const handleUpload = useCallback(() => {
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
            multiple: true,
            folder: "madhyam/gallery",
          },
          (error, result) => {
            if (!error && result && result.event === "success") {
              const newImage = {
                _key: `img-${Date.now()}-${Math.random()}`,
                url: result.info.secure_url,
                alt: "",
              };
              onChange(insert([newImage], "after", value.length - 1));
            }
          }
        )
        .open();
    } else {
      alert("Cloudinary widget not loaded. Please check your configuration.");
    }
  }, [onChange, value]);

  const handleRemove = useCallback(
    (index) => {
      const newValue = value.filter((_, i) => i !== index);
      onChange(newValue.length > 0 ? set(newValue) : unset());
    },
    [value, onChange]
  );

  const handleAltChange = useCallback(
    (index, altText) => {
      const newValue = [...value];
      newValue[index] = { ...newValue[index], alt: altText };
      onChange(set(newValue));
    },
    [value, onChange]
  );

  return (
    <Stack space={3}>
      <Button
        text="Upload Images (Multiple)"
        tone="primary"
        onClick={handleUpload}
      />

      {value && value.length > 0 && (
        <Stack space={3}>
          {value.map((image, index) => (
            <Card key={image._key || index} padding={3} radius={2} shadow={1}>
              <Stack space={3}>
                <img
                  src={image.url}
                  alt={image.alt || `Image ${index + 1}`}
                  style={{
                    width: "100%",
                    maxWidth: "300px",
                    height: "auto",
                    borderRadius: "4px",
                  }}
                />

                <TextInput
                  value={image.alt || ""}
                  onChange={(e) =>
                    handleAltChange(index, e.currentTarget.value)
                  }
                  placeholder="Alt text / विवरण"
                />

                <Flex justify="flex-end">
                  <Button
                    text="Remove"
                    tone="critical"
                    icon={TrashIcon}
                    onClick={() => handleRemove(index)}
                  />
                </Flex>
              </Stack>
            </Card>
          ))}
        </Stack>
      )}

      {(!value || value.length === 0) && (
        <Box padding={4}>
          <Text size={1} muted align="center">
            कोई तस्वीर नहीं है। Upload button दबाएं।
          </Text>
        </Box>
      )}
    </Stack>
  );
}
