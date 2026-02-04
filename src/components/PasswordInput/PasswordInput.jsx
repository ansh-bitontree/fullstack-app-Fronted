import "./PasswordInput.css";

export default function PasswordInput({
  label,
  name,
  value,
  onChange,
  error,
  show,
}) {
  return (
    <div className="password-group">
      <label>{label}</label>
      <input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <p className="error">{error}</p>}
    </div>
  );
}
