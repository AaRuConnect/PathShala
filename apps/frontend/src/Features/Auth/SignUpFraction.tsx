import { useRef } from "react";
import { MdOutlineLinkedCamera } from "react-icons/md";
import React from "react";

type SignUpFractionProps = {
  setImage: React.Dispatch<React.SetStateAction<undefined>>;
};
const SignUpFraction: React.FC<SignUpFractionProps> = ({ setImage }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file);
  };

  return (
    <div className="relative w-20 h-20 cursor-pointer" onClick={handleClick}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <img
        className="w-20 h-20 rounded-full bg-[#4893bb] hover:bg-[#33627b]"
        src="https://img.icons8.com/?size=96&id=DnvVED73VLBQ&format=png"
        alt="profile"
      />

      <p className="bg-[#114368] w-8 h-8 rounded-full flex items-center justify-center text-white absolute right-0 bottom-0">
        <MdOutlineLinkedCamera size={20} />
      </p>
    </div>
  );
};

export default SignUpFraction;
