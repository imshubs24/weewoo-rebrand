const ProfileField = ({
    name,
    label,
    value,
    editValue,
    isEditing,
    onChange,
}) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <label
                htmlFor={name}
                className="text-sm font-medium text-slate-700"
            >
                {label}
            </label>

            {isEditing ? (
                <input
                    id={name}
                    name={name}
                    value={editValue ?? ""}
                    onChange={onChange}
                    type={name === "pincode" ? "text" : "text"}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-800 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
            ) : (
                <div className="w-full min-h-[42px] flex items-center px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-100 text-sm text-slate-700">
                    {value || "Not provided"}
                </div>
            )}
        </div>
    );
};

export default ProfileField;