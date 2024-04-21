import { IoWallet } from "react-icons/io5";

const Connect = () => {
  return (
    <div>
      <button className="w-[132px] h-[38px] bg-primary rounded-xl font-medium text-[14px] flex items-center justify-center gap-2">
        <IoWallet className="text-[16px]" />
        Connect
      </button>
    </div>
  );
};

export default Connect;
