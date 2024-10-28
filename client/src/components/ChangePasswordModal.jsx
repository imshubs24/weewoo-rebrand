
const ChangePasswordModal = ({handleChangePasswordClick, closeChangePasswordModal}) => {
    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='bg-white p-8 rounded-lg w-96 h-auto'>
                <h2 className='text-xl font-medium mb-4'>Change Password</h2>
                <div className='mb-4'>
                    <label htmlFor='currentPassword' className='block mb-2'>Current Password</label>
                    <input
                        type='password'
                        name='currentPassword'
                        className='border border-gray-300 p-2 w-full outline-none'
                    // Add onChange and value if you want to handle the input
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='newPassword' className='block mb-2'>New Password</label>
                    <input
                        type='password'
                        name='newPassword'
                        className='border border-gray-300 p-2 w-full outline-none'
                    // Add onChange and value if you want to handle the input
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='confirmPassword' className='block mb-2'>Confirm New Password</label>
                    <input
                        type='password'
                        name='confirmPassword'
                        className='border border-gray-300 p-2 w-full outline-none'
                    // Add onChange and value if you want to handle the input
                    />
                </div>
                <div className='flex justify-end'>
                    <button
                        className='border border-gray-300 px-4 py-2 bg-gray-100 hover:bg-gray-300 mr-2'
                        onClick={closeChangePasswordModal}
                    >
                        Cancel
                    </button>
                    <button
                        className='border border-red-500 px-4 py-2 bg-red-500 text-white hover:bg-red-600'
                        onClick={handleChangePasswordClick}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChangePasswordModal