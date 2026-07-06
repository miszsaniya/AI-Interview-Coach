import "./ProgressBar.css";

export default function ProgressBar({ value = 0, max = 100, color = "blue", label, showValue = false }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="progress">
      {(label || showValue) && (
        <div className="progress__meta">
          {label && <span className="progress__label">{label}</span>}
          {showValue && <span className="progress__value">{Math.round(pct)}%</span>}
        </div>
      )}
      <div className="progress__track">
        <div className={`progress__fill progress__fill--${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
