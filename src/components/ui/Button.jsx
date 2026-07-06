import "./Button.css";

/**
 * variant: "primary" | "secondary" | "ghost" | "danger" | "outline"
 * size:    "sm" | "md" | "lg"
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  type = "button",
  onClick,
  className = "",
  ...rest
}) {
  const cls = [
    "btn",
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth ? "btn--full" : "",
    loading  ? "btn--loading" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={cls}
      disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >
      {loading && (
        <span className="btn__spinner" aria-hidden="true" />
      )}
      <span className={loading ? "btn__label--hidden" : ""}>{children}</span>
    </button>
  );
}
