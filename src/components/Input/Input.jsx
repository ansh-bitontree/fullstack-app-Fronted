import './Input.css'

export default function Input({ label, error, ...props }) {
  return (
    <div className="input-group">
      {label && <label>{label}</label>}
      <input {...props} />
      {error && <p className="error">{error}</p>}
    </div>
  );
}
