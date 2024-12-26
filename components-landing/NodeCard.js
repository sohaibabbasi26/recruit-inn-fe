import React from "react";
import Image from "next/image";

const NodeCard = ({ name, title, avatar , className = "" }) => {
  return (
    <div className={`flex gap-3 p-1 px-2 bg-white    rounded-xl w-auto ${className}`}>
      <div className="">
        <Image
          src={avatar}
          alt={name}
          width={40}
          height={40}
          
        />
      </div>
      <div>
      <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
        {name}
      </h4>
      <p className="text-xs text-gray-500 dark:text-gray-400">{title}</p>
      </div>
    </div>
  );
};

export default NodeCard;
 