import React, { useState, useEffect } from 'react'
import ImageUploader from 'react-images-upload'
import PropTypes from 'prop-types'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { IoIosCrop } from 'react-icons/io'
import {
  Button
} from 'reactstrap'

// TODO: add dimensions parameter and resize to them after crop
// TODO: make sure it can take in other image formats and convert the tm jpg
// this is really messy, but it works
export default function ImageSelect ({ onReady }) {
  const [upload, setUpload] = useState(null)
  const [uploadUrl, setUploadUrl] = useState(null)
  const [imageRef, setImageRef] = useState(null) // reference to the dom image
  const [cropped, setCropped] = useState(null) // the cropped image blob
  const [crop, setCrop] = useState({unit: '%', width: 100, aspect: 1}) // current crop

  useEffect(() => {
    if (cropped != null) {
      const croppedFile = new File([cropped], 'image')
      onReady(croppedFile)
    }
  }, [cropped])

  if (upload == null) {
    return (
      <ImageUploader
        label="Select an image from your computer."
        withIcon={true}
        singleImage={true}
        onChange={ (images) => {
          setUpload(images[0])
          setUploadUrl(toUrl(images[0]))
        }}
        buttonText='Choose Image'
        imgExtension={['.jpg', '.jpeg']}
        maxFileSize={5242880}
      />
    )
  } else if (cropped == null) {
    return (
      <>
        <ReactCrop
          src={uploadUrl}
          crop={crop}
          onImageLoaded={_imageRef => setImageRef(_imageRef)}
          onComplete={() => {}}
          onChange={(newCrop) => { setCrop(newCrop) }}
        />
        <br/>
        <Button className="btn-sm" onClick={() => { getCroppedImage(imageRef, crop, setCropped) }}><IoIosCrop size={22}/></Button>
      </>
    )
  }

  return <img src={ toUrl(cropped) }/>
}

ImageSelect.propTypes = {
  onReady: PropTypes.func.isRequired
}

function toUrl (file) {
  const urlCreator = window.URL || window.webkitURL
  return urlCreator.createObjectURL(file)
}

function getCroppedImage(image, crop, setCropped) {
  const canvas = document.createElement('canvas')
  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  canvas.width = crop.width
  canvas.height = crop.height
  const ctx = canvas.getContext('2d')

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  )

  canvas.toBlob(blob => { setCropped(blob) }, 'image/jpeg')
}
