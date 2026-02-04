import './Button.css'

export default function LoadingButton({ loading, children, ...props }) {
  return (
    <button {...props} disabled={loading || props.disabled} className="btn" >
      {loading ? "Loading..." : children}
    </button>
  );
}
