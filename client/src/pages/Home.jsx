import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setMyImages } from '../../redux/user.slice';
import ImageCard from '../ImageCard';

const home = () => {
  const user = useSelector(state => state.user);
  const [selectedImages, setSelected] = useState([])
  const dispatch = useDispatch()
  const uploadButtonRef = useRef()
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
          files.push({ name: image.name, file: reader.result, size: image.size, bin: image })
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
  const handleImageUpload = async () => {
    uploadButtonRef.current.innerHTML = "Please wait..."
    uploadButtonRef.current.disabled = true
    const formdata = new FormData();
    for (let image of images) {
      formdata.append("images", image.bin)
    }
    // formdata.append("images", images[1].bin)
    const req = await fetch(`${import.meta.env.VITE_SERVER}/images/add`, {
      method: "post",
      body: formdata,
      headers: {
        'Accept': "*"
      }
    });
    const res = await req.json();
    // console.log([...res?.imagesData])
    dispatch(setMyImages(user?.files?.concat(res?.imagesData)));
    localStorage.setItem("user", JSON.stringify({ ...user, files: user?.files?.concat(res?.imagesData) }))
    uploadButtonRef.current.innerHTML = "Upload"
    uploadButtonRef.current.disabled = false
    setImages([])
    setUploadModal(false)
  }
  console.log(user);
  // handles delete iamges
  const handleDeleteImages = () => {
    dispatch(setMyImages(user?.files?.filter(obj => !selectedImages.includes(obj.id))))
    setSelected([])
    // console.log()

  }
  return (
    <section className='h-full bg-white w-full'>
      {
        uploadModal ?
          // upload images modal

          <section className='fixed z-40 inset-0 grid w-full bg-slate-900/50 place-content-center'>
            <div className=' md:w-[600px] w-[90%] min-w-[350px]  pt-4  rounded-md mx-auto bg-white'>
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
                    <div className='py-4 px-4 flex  flex-wrap h-[256px] justify-center md:justify-start overflow-auto bg-primary/10 rounded-sm'>
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
              {
                images?.length > 0 ?
                  <section className='border-t py-3 px-4 flex justify-end'>
                    <label htmlFor="files" className='text-primary border-current border py-1  px-4 rounded-md mx-2  '>Add more</label>
                    <button className='bg-primary text-white py-1  px-4 rounded-md' ref={uploadButtonRef} onClick={handleImageUpload}>Upload</button>
                  </section> : null
              }
            </div>
          </section>
          : null
      }
      <header className='w-[90%] mx-auto py-6 md:px-6 flex justify-between flex-wrap'>
        <div>
          <h2 className='font-bold text-2xl md:text-3xl'>Media library</h2>
          <p className='text-slate-500 font-medium'>{user?.files?.length || 0} images</p>

        </div>
        <div>
          <button onClick={() => setUploadModal(!uploadModal)} htmlFor='files' className='py-3 px-3 md:px-5 bg-primary cursor-pointer text-white font-semibold h-max  rounded-md'>
            <i className="fa-solid fa-circle-plus mr-2"></i>
            Upload images</button>
          {
            selectedImages.length > 0 &&
            <button onClick={handleDeleteImages} htmlFor='files' className='py-3 mx-2 px-3 md:px-5 text-primary cursor-pointer  font-semibold h-max  border border-current rounded-md'>
              <i className="fa-solid fa-trash mr-2"></i>
              Delete selected</button>
          }
        </div>

      </header>
      {/* gallery section */}
      <section className='w-full'>
        {
          user?.files?.length ?
            // gallery ui
            <section className='w-[90%] mx-auto py-6 mt-4 md:mt-8 md:px-6 flex flex-wrap md:justify-start justify-center '>
              {

                user?.files?.map(image =>
                  <ImageCard image={image} selectedImages={selectedImages
                  } setSelected={setSelected} />
                )
              }
            </section>
            :
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