import "./Badge.css";

export default function Badge({ children, variant = "blue", size = "md", dot = false }) {
  return (
    <span className={`badge badge--${variant} badge--${size}`}>
      {dot && <span className="badge__dot" />}
      {children}
    </span>
  );
}
