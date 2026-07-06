import "./Avatar.css";

export default function Avatar({ name = "?", size = "md", src, color = "blue" }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className={`avatar avatar--${size} avatar--${color}`}>
      {src ? <img src={src} alt={name} /> : initials}
    </div>
  );
}
