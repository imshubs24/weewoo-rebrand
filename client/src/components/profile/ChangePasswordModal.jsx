import { useState } from 'react';
import api from '../../services/api';

const ChangePasswordModal = ({ closeChangePasswordModal }) => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {
            currentPassword,
            newPassword,
            confirmPassword,
        } = formData;

        if (!currentPassword || !newPassword || !confirmPassword) {
            setError('All fields are required');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match');
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if (!passwordRegex.test(newPassword)) {
            setError(
                'Password must be 6 characters or more and contain at least one uppercase and one lowercase character.'
            );
            return;
        }

        setLoading(true);

        try {
            const response = await api.put('/api/auth/change-password', {
                currentPassword,
                newPassword,
            });

            setSuccess(response.data.message);

            setFormData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });

            setTimeout(() => {
                closeChangePasswordModal();
            }, 1000);

        } catch (error) {
            console.error('Error while changing password:', error);

            setError(
                error.response?.data?.message ||
                'Failed to change password'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
            onClick={closeChangePasswordModal}
        >
            <div
                className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-slate-900">
                        Change Password
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                        Update your password to keep your account secure.
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-5 rounded-lg bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {/* Success */}
                {success && (
                    <div className="mb-5 rounded-lg bg-green-50 border border-green-100 px-4 py-3 text-sm text-green-600">
                        {success}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                >
                    {/* Current Password */}
                    <div>
                        <label
                            htmlFor="currentPassword"
                            className="block text-sm font-medium text-slate-700 mb-2"
                        >
                            Current Password
                        </label>

                        <input
                            id="currentPassword"
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-800 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        />
                    </div>

                    {/* New Password */}
                    <div>
                        <label
                            htmlFor="newPassword"
                            className="block text-sm font-medium text-slate-700 mb-2"
                        >
                            New Password
                        </label>

                        <input
                            id="newPassword"
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-800 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        />

                        <p className="text-xs text-slate-400 mt-2">
                            Minimum 6 characters, including uppercase and lowercase letters.
                        </p>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-slate-700 mb-2"
                        >
                            Confirm New Password
                        </label>

                        <input
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-800 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={closeChangePasswordModal}
                            disabled={loading}
                            className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 transition disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2.5 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition disabled:opacity-50"
                        >
                            {loading ? 'Updating...' : 'Update Password'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordModal;