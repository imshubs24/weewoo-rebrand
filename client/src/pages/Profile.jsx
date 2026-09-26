import { useEffect, useState } from 'react';
import ProfileField from '../components/profile/ProfileField';
import ChangePasswordModal from '../components/profile/ChangePasswordModal';
import { useUser } from '../context/UserContext';
import { useNavigate } from "react-router-dom";
import { useToastify } from '../context/ToastifyContext';

import api from "../services/api";

const Profile = () => {
    const { user, isLoggedIn, loading } = useUser();

    const [userInfo, setUserInfo] = useState({});
    const [editInfo, setEditInfo] = useState({ ...userInfo });
    const [isEditing, setIsEditing] = useState(false);
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const navigate = useNavigate();
    const { notify } = useToastify();

    useEffect(() => {
        if (loading) return;

        if (!isLoggedIn || !user) {
            navigate('/');
            return;
        }
        setUserInfo(user);
        setEditInfo(user);
    }, [user, isLoggedIn, loading, navigate]);

    const handleEditClick = () => {
        setEditInfo({ ...userInfo });
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (['street', 'city', 'state', 'pincode'].includes(name)) {
            setEditInfo((prev) => ({
                ...prev,
                address: {
                    ...prev.address,
                    [name]: value,
                },
            }));

            return;
        }

        setEditInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCancelClick = () => {
        setEditInfo({ ...userInfo });
        setIsEditing(false);
    };

    const openChangePasswordModal = () => {
        setIsChangePasswordModalOpen(true);
    };

    const closeChangePasswordModal = () => {
        setIsChangePasswordModalOpen(false);
    };

    const handleChangePasswordClick = () => {
        openChangePasswordModal();
    };

    const handleSaveClick = async () => {
        if (editInfo.phone) {
            const phoneRegex = /^[6-9]\d{9}$/;

            if (!phoneRegex.test(editInfo.phone)) {
                notify("Please enter a valid 10-digit Indian phone number", "error");
                return;
            }
        }

        setIsSaving(true);

        const result = await updateUserDetails(editInfo);

        if (result.success) {
            setUserInfo(result.user);
            setEditInfo(result.user);
            setIsEditing(false);
            notify("Profile updated successfully", "success");
        } else {
            notify(result.error, "error");
            console.error('Updating user details failed:', result.error);
        }

        setIsSaving(false);
    };

    const updateUserDetails = async (updatedInfo) => {
        try {
            const response = await api.put(`/api/auth/`, {
                name: updatedInfo.name,
                phone: updatedInfo.phone,
                address: updatedInfo.address,
            });

            return {
                success: true,
                user: response.data.user,
            };

        } catch (error) {
            console.error("Updating user details failed:", error);

            return {
                success: false,
                error: error.response?.data?.message || "Failed to update profile",
            };
        }
    }

    return (
        <>
            <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto">

                    {/* Header */}
                    <div className="mb-8">
                        <p className="text-sm font-medium text-red-500 mb-1">
                            Account
                        </p>

                        <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900">
                            My Profile
                        </h1>

                        <p className="text-slate-500 mt-2">
                            Manage your personal information and account settings.
                        </p>
                    </div>

                    {/* Profile Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

                        {/* User Header */}
                        <div className="p-6 sm:p-8 flex items-center gap-5 border-b border-slate-100">
                            <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-white text-xl font-semibold">
                                {userInfo.name?.charAt(0).toUpperCase()}
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold text-slate-900">
                                    {userInfo.name}
                                </h2>

                                <p className="text-sm text-slate-500 mt-1">
                                    {userInfo.email}
                                </p>
                            </div>
                        </div>

                        {/* Personal Information */}
                        <div className="p-6 sm:p-8">

                            <div className="mb-6">
                                <h2 className="text-lg font-semibold text-slate-900">
                                    Personal Information
                                </h2>

                                <p className="text-sm text-slate-500 mt-1">
                                    Your basic account information.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <ProfileField
                                    label="Name"
                                    name="name"
                                    value={userInfo.name || ''}
                                    editValue={editInfo.name}
                                    isEditing={isEditing}
                                    onChange={handleChange}
                                />

                                <ProfileField
                                    label="Email"
                                    name="email"
                                    value={userInfo.email || ''}
                                    isEditing={false}
                                />

                                <ProfileField
                                    label="Phone"
                                    name="phone"
                                    value={userInfo.phone || 'No phone number'}
                                    editValue={editInfo.phone || ''}
                                    isEditing={isEditing}
                                    onChange={handleChange}
                                />

                            </div>
                        </div>

                        {/* Address */}
                        <div className="border-t border-slate-100 p-6 sm:p-8">

                            <div className="mb-6">
                                <h2 className="text-lg font-semibold text-slate-900">
                                    Delivery Address
                                </h2>

                                <p className="text-sm text-slate-500 mt-1">
                                    Where should we deliver your orders?
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <div className="md:col-span-2">
                                    <ProfileField
                                        label="Street"
                                        name="street"
                                        value={userInfo.address?.street || 'No street'}
                                        editValue={editInfo.address?.street || ''}
                                        isEditing={isEditing}
                                        onChange={handleChange}
                                    />
                                </div>

                                <ProfileField
                                    label="City"
                                    name="city"
                                    value={userInfo.address?.city || 'No city'}
                                    editValue={editInfo.address?.city || ''}
                                    isEditing={isEditing}
                                    onChange={handleChange}
                                />

                                <ProfileField
                                    label="State"
                                    name="state"
                                    value={userInfo.address?.state || 'No state'}
                                    editValue={editInfo.address?.state || ''}
                                    isEditing={isEditing}
                                    onChange={handleChange}
                                />

                                <ProfileField
                                    label="Pincode"
                                    name="pincode"
                                    value={userInfo.address?.pincode || 'No pincode'}
                                    editValue={editInfo.address?.pincode || ''}
                                    isEditing={isEditing}
                                    onChange={handleChange}
                                />

                            </div>
                        </div>

                        {/* Security */}
                        <div className="border-t border-slate-100 p-6 sm:p-8">

                            <div className="mb-6">
                                <h2 className="text-lg font-semibold text-slate-900">
                                    Security
                                </h2>

                                <p className="text-sm text-slate-500 mt-1">
                                    Manage your account password.
                                </p>
                            </div>

                            <div className="flex items-center justify-between rounded-xl bg-slate-50 border border-slate-100 p-4">

                                <div>
                                    <p className="font-medium text-slate-800">
                                        Password
                                    </p>

                                    <p className="text-sm text-slate-500 mt-1">
                                        ••••••••••••
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="text-sm font-medium text-red-500 hover:text-red-600 transition"
                                    onClick={handleChangePasswordClick}
                                >
                                    Change password
                                </button>

                            </div>
                        </div>

                        {/* Actions */}
                        <div className="border-t border-slate-100 p-6 sm:p-8 flex justify-end gap-3">

                            {isEditing ? (
                                <>
                                    <button
                                        type="button"
                                        disabled={isSaving}
                                        className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition disabled:opacity-60 disabled:cursor-not-allowed"
                                        onClick={handleCancelClick}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="button"
                                        disabled={isSaving}
                                        className="px-5 py-2.5 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                                        onClick={handleSaveClick}
                                    >
                                        {isSaving ? (
                                            <span className="flex items-center gap-2">
                                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                                Saving...
                                            </span>
                                        ) : (
                                            "Save Changes"
                                        )}
                                    </button>
                                </>
                            ) : (
                                <button
                                    type="button"
                                    className="px-5 py-2.5 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition shadow-sm"
                                    onClick={handleEditClick}
                                >
                                    Edit Profile
                                </button>
                            )}

                        </div>

                    </div>
                </div>
            </div>

            {/* Change Password Modal */}
            {isChangePasswordModalOpen && (
                <ChangePasswordModal
                    closeChangePasswordModal={closeChangePasswordModal}
                />
            )}
        </>
    );
};

export default Profile;
