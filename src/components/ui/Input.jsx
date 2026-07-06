import "./Input.css";

export default function Input({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  hint,
  required,
  autoComplete,
  icon,
  className = "",
  ...rest
}) {
  return (
    <div className={`input-field ${error ? "input-field--error" : ""} ${className}`}>
      {label && (
        <label htmlFor={id} className="input-field__label">
          {label}
          {required && <span className="input-field__required">*</span>}
        </label>
      )}
      <div className="input-field__wrap">
        {icon && <span className="input-field__icon">{icon}</span>}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          className={`input-field__input ${icon ? "input-field__input--icon" : ""}`}
          {...rest}
        />
      </div>
      {error && <p className="input-field__error">{error}</p>}
      {!error && hint && <p className="input-field__hint">{hint}</p>}
    </div>
  );
}
