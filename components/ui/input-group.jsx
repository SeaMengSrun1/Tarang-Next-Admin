"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";

function InputGroup({
  title,
  type,
  placeholder,
  id,
  name,
  onChange,
  value,
  disable,
}) {
  const isPasswordInput = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor={id} className="text-sm">
        {title}
      </label>
      <div className="relative flex">
        <input
          type={isPasswordInput && showPassword ? "text" : type}
          placeholder={isPasswordInput && showPassword ? type : placeholder}
          id={id}
          onChange={onChange}
          value={value}
          // required={isPasswordInput}
          name={name}
          required
          disabled={disable}
          className="rounded-md w-full px-4 py-2 border focus:outline-none focus:border-[#2AD5A5]"
        />
        {isPasswordInput && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute top-[10px] right-3"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        )}
      </div>
    </div>
  );
}

export default InputGroup;
