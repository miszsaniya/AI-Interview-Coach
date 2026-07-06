import "./Card.css";

export default function Card({ children, className = "", padding = "md", hoverable = false, ...rest }) {
  const cls = [
    "card",
    `card--pad-${padding}`,
    hoverable ? "card--hover" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={cls} {...rest}>{children}</div>;
}
