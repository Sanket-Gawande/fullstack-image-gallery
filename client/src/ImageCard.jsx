import React from 'react'

const ImageCard = ({ image, selectedImages, setSelected }) => {
  const { name, ext, path, id } = image || {}
  const handleChange = e => {
    selectedImages.includes(id) ? setSelected(selectedImages.filter(item => item !== id)) : setSelected([...selectedImages, id])
  }
  return (
    <div key={id} className='shadow-md rounded-md m-2 w-[310px] border overflow-hidden relative'>
      <input type="checkbox" checked={selectedImages.includes(id)} onChange={handleChange} className='absolute left-3 top-3 accent-primary h-5 w-5' />
      <img src={ `${import.meta.env.VITE_STORAGE_URL}/${path}`} alt="no image" className='w-full h-[180px] object-cover' />
      <div className='flex justify-between items-center py-2 px-4 font-medium'>
        <h4 className='text-slate-900 text-xs'>{name}</h4>
        <p className='text-xs bg-[#EAFFD9] rounded-sm px-2 py-1'>{ext}</p>
      </div>
    </div>
  )
}

export default ImageCard