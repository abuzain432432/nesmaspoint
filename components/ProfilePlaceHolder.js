function ProfilePlaceHolder({ button }) {
  return (
    <div
      className={`skeleton-profile skeleton-avatar ${
        button && "skeleton-button"
      }`}
    ></div>
  );
}

export default ProfilePlaceHolder;
