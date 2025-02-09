"use client";
import { signup } from "@/axios";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const router = useRouter();
  const handleNavigate = () => {
    router.push("/login");
  };

  const handleSignup = async () => {
    const firstName = (document.getElementById("firstName") as HTMLInputElement)
      ?.value;
    const lastName = (document.getElementById("lastName") as HTMLInputElement)
      ?.value;
    const username = (document.getElementById("username") as HTMLInputElement)
      ?.value;
    const phoneNumber = (
      document.getElementById("phoneNumber") as HTMLInputElement
    )?.value;
    const email = (document.getElementById("email") as HTMLInputElement)?.value;
    const password = (document.getElementById("password") as HTMLInputElement)
      ?.value;
    const reconfirmPassword = (
      document.getElementById("reconfirmPassword") as HTMLInputElement
    )?.value;

    if (password !== reconfirmPassword) {
      throw new Error("Reconfirm wrong password!");
    }

    const signUpData = {
      firstName,
      lastName,
      username,
      phoneNumber,
      email,
      password,
    };

    console.log(signUpData);

    await signup(signUpData);

    handleNavigate();
  };

  return (
    <>
      <div className="mt-28 w-1/3  bg-white border rounded-2xl flex flex-col p-5 gap-5 pb-8">
        <div className="flex justify-center items-center w-full text-beamin font-semibold text-[26px]">
          Đăng Kí
        </div>
        <div className="flex flex-row w-full gap-2">
          <Input id="firstName" placeholder="Họ " className="h-[40px]" />
          <Input id="lastName" placeholder="Tên" className="h-[40px]" />
        </div>
        <div className="flex flex-col w-full gap-3">
          <Input
            id="username"
            placeholder="Tên đăng nhập"
            className="h-[40px]"
          />
        </div>
        <div className="flex flex-col w-full gap-3">
          <Input
            id="phoneNumber"
            placeholder="Số điện thoại"
            className="h-[40px]"
          />
        </div>
        <div className="flex flex-col w-full gap-3">
          <Input id="email" placeholder="Email" className="h-[40px]" />
        </div>
        <div className="flex flex-col w-full ">
          <Input.Password
            id="password"
            placeholder="Mật khẩu"
            className="h-[40px]"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </div>
        <div className="flex flex-col w-full ">
          <Input.Password
            id="reconfirmPassword"
            placeholder="Nhập lại mật khẩu"
            className="h-[40px]"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </div>
        <div className="flex flex-col w-full">
          <button
            onClick={handleSignup}
            className="w-full h-[40px] uppercase text-white bg-beamin rounded-lg"
          >
            Đăng kí
          </button>
        </div>
        <div className="flex items-center justify-center gap-1">
          <span className="text-gray-600">Bạn đã có tài khoản?</span>
          <Link className="text-beamin cursor-pointer" href={"/login"}>
            {" "}
            Đăng kí
          </Link>
        </div>
      </div>
    </>
  );
};
export default Page;
