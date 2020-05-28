import React from 'react';

export function SubmitButton({ children, disabled }) {
  return (
    <span className="block w-full rounded-md shadow-sm">
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border rounded border-white bg-black text-white text-sm font-medium hover:shadow-md hover:border-transparent transition duration-150 ease-in-out"
        disabled={disabled}
      >
        {children}
      </button>
    </span>
  );
}

export function LabelAndInput({
  id,
  label,
  type,
  value,
  placeholder,
  onChangeHandler,
  isRequired,
  autofocus,
}) {
  return (
    <>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-5 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-1 rounded-md shadow-sm">
        <input
          id={id}
          type={type}
          required={isRequired}
          value={value}
          placeholder={placeholder}
          onChange={onChangeHandler}
          className="appearance-none block w-full px-3 py-2 border border-gray-300 shadow rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          autoFocus={autofocus}
        />
      </div>
    </>
  );
}
