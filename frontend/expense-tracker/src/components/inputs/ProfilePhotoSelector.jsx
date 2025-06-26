import React, { useState, useRef } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);


    React.useEffect(() => {
        if (image) {
            const preview = URL.createObjectURL(image);
            setPreviewUrl(preview);

            return () => URL.revokeObjectURL(preview);
        } else {
            setPreviewUrl(null);
        }
    }, [image]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {

            setImage(file);

        }
    }

    const handleRemoveImage = () => {
        setImage(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }

    const chooseFile = () => {
        inputRef.current.click()
    }

    return (
        <div className='flex justify-center mb-6'>
            <input
                type="file"
                accept='image/*'
                ref={inputRef}
                className='hidden'
                onChange={handleImageChange}
            />
            {!image ? (
                <div className='w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative'>
                    <LuUser className='text-4xl text-purple-500' />
                    <button
                        type='button'
                        className='w-8 h-8 flex items-center justify-center bg-purple-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer'
                        onClick={chooseFile}
                    >
                        <LuUpload />
                    </button>
                </div>
            ) : (
                <div className='relative'>
                    <img
                        src={previewUrl}
                        alt="profile photo"
                        className='w-20 h-20 rounded-full object-cover'
                    />
                    <button
                        type='button'
                        className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer'
                        onClick={handleRemoveImage}
                    >
                        <LuTrash />
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProfilePhotoSelector;