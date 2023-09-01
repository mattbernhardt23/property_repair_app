const SIZE = {
  sm: "p-1 text-xs font-bold xs:px-4",
  md: "p-2 text-base font-bold xs:px-8",
  lg: "p-3 text-lg font-bold xs:px-8",
};

export default function Button({
  children,
  className,
  size = "md",
  hoverable = true,
  variant = "white",
  ...rest
}) {
  const sizeClass = SIZE[size];
  const variants = {
    white: `rounded-full text-black bg-white border-2 border-black hover:scale-110`,
    red: `rounded-full text-white bg-red-600 ${
      hoverable && "hover:bg-red-700"
    }`,
    gray: `rounded-full text-white bg-gray-600 ${
      hoverable && "hover:bg-red-700"
    }`,
    lightGray: `rounded-full text-red-700 bg-gray-100 border-gray-600 border-2 ${
      hoverable && "hover:bg-gray-600"
    }`,
    searchLightGray: `rounded-r-md text-red-700 bg-gray-100 border-gray-600 border-2 hadow-inner shadow-gray-600 ${
      hoverable && "hover:bg-gray-600"
    }`,
    delete: `rounded-xl text-red-700 bg-white border-red-700 border-2 ${
      hoverable && "hover:bg-red-700 hover:text-white"
    }`,
  };

  return (
    <button
      {...rest}
      className={`${sizeClass} disabled:opacity-50 disabled:cursor-not-allowed borderfont-medium ${className} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}
