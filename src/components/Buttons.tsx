import React from "react";

export const SmallButton = (props: any) => {
  return (
    <button
      className="
      py-1 
      px-2 
      text-xs 
      text-emerald-500 
      bg-transparent 
      border border-solid 
      border-emerald-500 
      hover:bg-black-500 hover:text-black 
      active:bg-emerald-600 
      font-bold 
      uppercase 
      rounded outline-none focus:outline-none 
      mr-1 mb-1 
      ease-linear transition-all duration-150"

      {...props}
    >
      {
        // @ts-ignore
        props.children
      }
    </button>
  );
};
