import React, { useEffect, useState } from 'react';
import ProfileField from '../components/ProfileField';
import ChangePasswordModal from '../components/ChangePasswordModal';
import { useUser } from '../hooks/UserContext';
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({});
    const [editInfo, setEditInfo] = useState({ ...userInfo });
    const [isEditing, setIsEditing] = useState(false);
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
    const { isLoggedIn, getAuthtoken, getUserEmail, getUserName } = useUser();

    const handleEditClick = () => {
        setEditInfo({ ...userInfo });
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditInfo({ ...editInfo, [name]: value });
    };

    const handleSaveClick = async () => {
        const result = await updateUserDetails(editInfo)
        if (result.success) {
            setUserInfo(editInfo);
            setIsEditing(false);
        } else {
            console.error('Updating user details failed: ', result.error);
        }
    };

    const handleCancelClick = () => {
        setEditInfo(userInfo);
        setIsEditing(false);
    };

    const openChangePasswordModal = () => {
        setIsChangePasswordModalOpen(true);
    };

    const closeChangePasswordModal = () => {
        setIsChangePasswordModalOpen(false);
    };

    const handleChangePasswordClick = () => {
        console.log('Change password clicked');
        openChangePasswordModal();
    };

    // function to update user details - name, contact and address
    const updateUserDetails = async (updatedInfo) => {
        const token = getAuthtoken();

        // Filter out only the fields that need updating
        const allowedUpdates = ['name', 'contact', 'address'];
        const updates = {};
        allowedUpdates.forEach((key) => {
            if (updatedInfo[key] !== undefined) {
                updates[key] = updatedInfo[key];
            }
        });

        try {
            const response = await fetch('http://127.0.0.1:4000/api/users/updateUserDetails', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ email: userInfo.email, updates })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Updating user details failed: ', errorData.error);
                return;
            };

            const data = await response.json();
            console.log(data);
            return { success: true, user: data.user };

        } catch (error) {
            console.error('Error while updating user details: ', error);
            return { success: false, error: 'Internal Server Error' };
        }
    }

    useEffect(() => {
        const userEmail = getUserEmail();
        const name = getUserName();

        if (!userEmail) {
            navigate('/'); // Redirect to '/' if userEmail is not found
        } else {
            setUserInfo((prevUserInfo) => ({ ...prevUserInfo, email: userEmail, name }));
        }
    }, [isLoggedIn]);


    return (
        <>
            <div className='w-full bg-red-500 flex flex-col items-center p-10 max-sm:p-3'>
                <div className='w-1/2 max-xl:w-2/3 max-md:w-full text-white text-4xl py-2 max-xl:text-center'>My Profile</div>
                <div className='w-1/2 max-xl:w-2/3 max-md:w-full min-h-[36rem] h-auto max-sm:min-h-[32rem] flex flex-col justify-center items-center bg-white text-lg'>
                    <div className='flex flex-col gap-y-16 py-4 max-sm:items-start max-sm:ml-5 max-sm:gap-y-8'>
                        <ProfileField
                            label='Name'
                            name='name'
                            value={userInfo.name || ''}
                            editValue={editInfo.name}
                            isEditing={isEditing}
                            onChange={handleChange}
                        />
                        <ProfileField
                            label='Email'
                            name='email'
                            value={userInfo.email || ''}
                            isEditing={false}
                        />
                        <ProfileField
                            label='Contact'
                            name='contact'
                            value={!userInfo.contact ? 'No contact details' : userInfo.contact}
                            editValue={editInfo.contact}
                            isEditing={isEditing}
                            onChange={handleChange}
                        />
                        <div className='flex justify-center items-center relative max-sm:flex-col max-sm:items-start'>
                            <label className='w-40 font-medium'>Password</label>
                            <p className='w-72 text-slate-700 text-sm'>********</p>
                            <p
                                className='absolute top-1 left-80 text-xs hover:text-red-500 cursor-pointer max-sm:static'
                                onClick={handleChangePasswordClick}
                            >
                                Change password
                            </p>
                        </div>
                        <ProfileField
                            label='Address'
                            name='address'
                            value={!userInfo.address ? 'No address found' : userInfo.address}
                            editValue={editInfo.address}
                            isEditing={isEditing}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex gap-4'>
                        {isEditing ? (
                            <>
                                <button
                                    className='border border-red-500 px-3 py-1 hover:bg-red-500 hover:text-white duration-150'
                                    onClick={handleSaveClick}
                                >
                                    Save
                                </button>
                                <button
                                    className='border border-gray-500 px-3 py-1 hover:bg-gray-500 hover:text-white duration-150'
                                    onClick={handleCancelClick}
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                className='border border-red-500 px-3 py-1 hover:bg-red-500 hover:text-white duration-150'
                                onClick={handleEditClick}
                            >
                                Edit
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Change Password Modal */}
            {isChangePasswordModalOpen && (
                <ChangePasswordModal handleChangePasswordClick={handleChangePasswordClick} closeChangePasswordModal={closeChangePasswordModal} />
            )}
        </>
    );
};



export default Profile;
