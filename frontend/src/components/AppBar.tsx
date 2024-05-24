import profile from "../assets/user.png";

export default function AppBar() {
  return (
    <div className="h-[64px] p-[1rem] w-full flex items-center justify-between">
      <div className="h-[2.5rem] w-[2.5rem]">
        <img
          src={profile}
          alt="profile"
          className="h-full w-full rounded-full border-[1px] border-[#000]"
        />
      </div>
      <div></div>
    </div>
  );
}
