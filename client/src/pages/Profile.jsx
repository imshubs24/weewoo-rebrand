import React from 'react'

const Profile = () => {
    const userInfo = {
        name: 'Shubham Lokhande', email: 'slokhande310@gmail.com', contact: '9876543210', password: '**********', address: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos aperiam iure consequatur ducimus molestiae ea quisquam repudiandae nisi fugit quasi?'
    }

    return (
        <>
            <div className='w-full bg-red-500 flex flex-col items-center p-10'>
                <div className='w-1/2 text-white text-4xl py-2'>My Profile</div>
                <div className='w-1/2 min-h-[30rem] h-auto flex flex-col justify-center items-center bg-white text-lg'>
                    <div className='flex flex-col gap-y-12 py-4'>
                        <div className='flex justify-center items-center'>
                            <label className='w-40 font-medium'>Name</label>
                            <p className='w-72 text-slate-700 text-sm'>{userInfo.name}</p>
                        </div>
                        <div className='flex justify-center items-center'>
                            <label className='w-40 font-medium'>Email</label>
                            <p className='w-72 text-slate-700 text-sm'>{userInfo.email}</p>
                        </div>
                        <div className='flex justify-center items-center'>
                            <label className='w-40 font-medium'>Contact</label>
                            <p className='w-72 text-slate-700 text-sm'>{userInfo.contact}</p>
                        </div>
                        <div className='flex justify-center items-center relative'>
                            <label className='w-40 font-medium'>Password</label>
                            <p className='w-72 text-slate-700 text-sm'>{userInfo.password}</p>
                            {/* <p className='absolute top-1 left-80 text-xs hover:text-red-500 cursor-pointer'>Change password</p> */}
                        </div>
                        <div className='flex'>
                            <label className='w-40 font-medium'>Address</label>
                            <p className='w-72 text-slate-700 text-sm'>{userInfo.address}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
