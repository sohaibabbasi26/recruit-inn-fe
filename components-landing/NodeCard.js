import Image from "next/image";

const NodeCard = ({ name, title, avatar, className = "" }) => {
  return (
    <div
      className={`flex max-sm:flex-col gap-3 p-1 px-2 bg-white rounded-xl w-auto ${className}`}
    >
      <div className="max-sm:flex max-sm:justify-center">
        <Image src={avatar} alt={name} width={40} height={40} />
      </div>
      <div>
        <h4 className="max-sm:text-center text-sm font-semibold text-gray-800 dark:text-white">
          {name}
        </h4>
        <p className=" max-sm:text-center text-xs text-gray-500 dark:text-gray-400">
          {title}
        </p>
      </div>
    </div>
  );
};

export default NodeCard;
