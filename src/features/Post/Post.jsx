import ProfilePreview from "../../components/Avatar/ProfilePreview";
import ActivePanel from "./components/ActivePanel";
import Content from "./components/Content";

export default function Post({
  images = [],
  description,
  avtor,
  userUid,
  create_at,
}) {
  return (
    <div className="rounded-2xl p-5 bg-zinc-900 max-w-full">
      <ProfilePreview
        className="mb-5"
        avtor={avtor}
        linkTo={`/profile/${userUid}`}
        create_at={create_at}
      />

      <Content className="mb-5" images={images} description={description} />

      <ActivePanel />
    </div>
  );
}
