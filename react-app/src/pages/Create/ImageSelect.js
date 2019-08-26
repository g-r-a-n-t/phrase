import React, { useState } from 'react'
import ImageUploader from 'react-images-upload'
import PropTypes from 'prop-types'

export default function ImageSelect ({ onReady }) {
  const [image, setImage] = useState(null)

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

  onReady(image)

  return null
}

ImageSelect.propTypes = {
  onReady: PropTypes.func.isRequired
}
