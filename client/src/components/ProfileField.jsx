import React from 'react'

const ProfileField = ({ name, label, value, editValue, isEditing, onChange }) => {
    return (
        <div className='flex justify-center items-center'>
            <label className='w-40 font-medium'>{label}</label>
            {isEditing ? (
                <input
                    className='w-72 text-slate-700 text-sm border border-black p-1 outline-none'
                    name={name}
                    value={editValue}
                    onChange={onChange}
                    type={`${name === 'contact' ? 'number' : 'text'}`}
                />
            ) : (
                <p className='w-72 text-slate-700 text-sm'>{value}</p>
            )}
        </div>
    );
};

export default ProfileField