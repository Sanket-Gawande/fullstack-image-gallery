import React, { useEffect, useState } from 'react'

const home = () => {
  const [images, setImages] = useState([]);
  const [listOfImages, setListOfImages] = useState([]);
  const [uploadModal, setUploadModal] = useState(false)
  const formatSize = (size) => {
    return size > 10 ** 6 ? Math.round(size / (10000)) / 100 + "Mb" : Math.round(size / (100)) / 10 + "Kb"
  }

  const showSelectedImages = e => {
    const files = [...images]
    for (let image of e.target.files) {
      const ext = image.type.split("/")[1]
      if (["png", "jpg", "jpeg"].includes(ext)) {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => {
          files.push({ name: image.name, file: reader.result, size: image.size })
        }

      }
    }
    setImages(files)
    // setImages([...files])
  }
  setTimeout(() => {
    setListOfImages(images)
    console.log(images.length)
    console.log(images)
  }, 1);
  // useEffect(() => {
  //   console.log(images.length)
  //   console.log(images)
  // }, [images])
  return (
    <section className='h-full bg-white w-full'>
      {
        uploadModal ?
          // upload images modal

          <section className='fixed inset-0 grid w-full bg-slate-900/50 place-content-center'>
            <div className=' md:w-[600px] min-w-[350px]  pt-4  rounded-md mx-auto bg-white'>
              <div className='w-full flex items-center px-4 pb-3 justify-between border-b'>
                <h4>Upload images</h4>
                <i className="fa fa-times cursor-pointer" onClick={() => setUploadModal(false)}></i>
              </div>
              <input onChange={showSelectedImages} type="file" typeof='image' multiple id='files' className='hidden' />
              <div className='w-full text-sm text-center p-6'>
                {
                  listOfImages.length === 0 ?

                    <div className='flex items-center  justify-center flex-col h-[256px] border-2 border-dashed bg-gray-50 rounded-sm'>
                      <p>Drag files here</p>
                      <p className='my-2'>or</p>
                      <input onChange={showSelectedImages} type="file" typeof='image' multiple id='files' className='hidden' />
                      <label htmlFor="files" className='text-primary cursor-pointer border border-current px-4 py-1 rounded-md w-max block mx-auto'>Browse</label>
                    </div>
                    :
                    <div className='py-4 px-4 flex  flex-wrap h-[256px] justify-start overflow-auto bg-primary/10 rounded-sm'>
                      {
                        listOfImages.map(image =>
                          <div key={image.name} className="w-24 relative h-24 rounded-sm bg-white/50 m-1">
                            <button onClick={() => {
                              setImages(listOfImages.filter(img => img.name !== image.name))
                            }} className='absolute  top-1 right-1  h-4 w-4 shadow-xs grid place-items-center  bg-slate-30 text-slate-500 text-sm border-current rounded-full border'>

                              <i className="fa fa-times text-[10px] "></i>
                            </button>
                            <img src={image.file} className="w-full h-full object-contain" alt={image.name} />
                            <div className='flex justify-between items-center absolute bottom-0 w-full bg-slate-500/80 px-2  text-white text-[10px]'>
                              <p className=' '>{image.name?.substring(0, 5)}...</p>
                              <p>{formatSize(image.size)}</p>
                            </div>
                          </div>
                        )
                      }

                    </div>
                }
              </div>
              <section className='border-t py-3 px-4 flex justify-end'>
                <label htmlFor="files" className='text-primary border-current border text-white py-1  px-4 rounded-md mx-2  '>Add more</label>
                <button className='bg-primary text-white py-1  px-4 rounded-md '>Upload</button>
              </section>
            </div>
          </section>
          : null

      }
      <header className='w-[90%] mx-auto py-6 md:px-6 flex justify-between'>
        <div>
          <h2 className='font-bold text-2xl md:text-3xl'>Media library</h2>
          <p className='text-slate-500 font-medium'>0 images</p>
        </div>
        <button onClick={() => setUploadModal(!uploadModal)} htmlFor='files' className='py-3 px-3 md:px-5 bg-primary cursor-pointer text-white font-semibold h-max  rounded-md'>
          <i class="fa-solid fa-circle-plus mr-2"></i>
          Upload images</button>

      </header>
      {/* gallery section */}
      <section>
        {
          images?.length ?
            // gallery ui
            null :
            // fallback ui
            <section className='w-full max-w-[800px] mx-auto mt-4'>
              <img src="/no-images.jpeg" alt="no images" />
              <p className='text-center text-slate-600 font-medium py-4'>Click on 'upload' to start uploading images</p>
            </section>
        }
      </section>
    </section>
  )
}

export default home