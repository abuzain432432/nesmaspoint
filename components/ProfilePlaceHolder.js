function ProfilePlaceHolder({ button }) {
  return (
    <div
      className={`skeleton-profile skeleton-avatar  2xl:h-[40px]  h-[35px] ${
        button
          ? "skeleton-button  2xl:w-[80px] w-[60px]"
          : "2xl:w-[40px] w-[35px]"
      }`}
    ></div>
  );
}

export default ProfilePlaceHolder;
