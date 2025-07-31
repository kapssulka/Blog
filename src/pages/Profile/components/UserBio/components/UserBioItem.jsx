export default function UserBioItem({ text = "", name = "" }) {
  if (name) return <div className="text-zinc-100">{text}</div>;
  else return <div className="text-zinc-400">{text}</div>;
}
