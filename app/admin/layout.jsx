import SideBar from "@/components/AdminComponents/SideBar";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ children }) {
  return (
    <>
      <div className="flex">
        <ToastContainer theme="dark"/>
        <SideBar />
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-black">
            <h3 className="font-medium ">Admin Panel</h3>
            <Image src={assets.profile_icon} width={40} alt="pfp_icon" />
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
