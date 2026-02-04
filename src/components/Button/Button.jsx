import './Button.css'

export default function Button({ children, type = "button", ...props }) {
  return (
    <button type={type} {...props} className="btn">
      {children}
    </button>
  );
}