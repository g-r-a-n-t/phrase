import React, { useEffect, useState } from 'react'
import ImageUploader from 'react-images-upload'

export default function ImageSelect ({ onReady }) {
  const [image, setImage] = useState(null)

  useEffect(() => {
    onReady(image)
  }, [image])

  if (image == null) {
    return (
      <ImageUploader
        label="Select an image from your computer."
        withIcon={true}
        singleImage={true}
        onChange={ images => setImage(images[0]) }
        buttonText='Choose Image'
        imgExtension={['.jpg', '.jpeg']}
        maxFileSize={5242880}
      />
    )
  }

  return <p>loaded image</p>
}
