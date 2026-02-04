import { useEffect, useState } from "react";
import api from "../../services/api";
import "./UserMenu.css";
import UserResetPassword from "./UserResetPassword";
import {validateUpdatedProfile} from "../../features/auth/validators/user.validators"
import Input from "../../components/Input/Input";
import LogoutButton from "../../components/Button/LogoutButton";
import { toast } from "react-toastify";
import BackButton from "../../components/Button/BackButton";

export default function UserMenu() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [resetMode, setResetMode] = useState(false);
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({})

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    address: "",
    dob: "",
    gender: "",
  });


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/users/me");
        setUser(res.data);
        setFormData({
          username: res.data.username || "",
          email: res.data.email || "",
          address: res.data.address || "",
          dob: res.data.dob || "",
          gender: res.data.gender || "",
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    if (editMode) {
      setErrors(validateUpdatedProfile(newFormData));
    }
  };


  const handleUpdate = async (e) => {
    e.preventDefault();
    setServerError("");

    const validationErrors = validateUpdatedProfile(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      const res = await api.patch("/users/me", formData);
      setUser(res.data);
      setEditMode(false);
      setErrors({});
      toast.success("Profile updated!");
    } catch (err) {
      toast.error("Update failed");
      
    }
  };


  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>No user found</p>;

  return (
  <>
    <BackButton />
    <LogoutButton />
    <div className="userMenu">
      {!resetMode ? (
        <>
          <h2>My Profile</h2>

          <div className="profileField">
            <label>Username:</label>
            {editMode ? (
              <Input name="username" value={formData.username} onChange={handleChange}/>
            ) : (
              <span>{user.username}</span>
            )}
          </div>

          <div className="profileField">
            <label>Email:</label>
            {editMode ? (
              <Input name="email" value={formData.email} onChange={handleChange}  error={errors.email}/>
            ) : (
              <span>{user.email}</span>
            )}
          </div>

          <div className="profileField">
            <label>Address:</label>
            {editMode ? (
              <Input name="address" value={formData.address} onChange={handleChange} />
            ) : (
              <span>{user.address || "-"}</span>
            )}
          </div>

          <div className="profileField">
            <label>Date of Birth:</label>
            {editMode ? (
              <Input type="date" name="dob" value={formData.dob} onChange={handleChange} error={errors.dob} max={new Date().toISOString().split("T")[0]}/>
            ) : (
              <span>{user.dob || "-"}</span>
            )}
          </div>

          <div className="profileField">
            <label>Gender:</label>
            {editMode ? (
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            ) : (
              <span>{user.gender || "-"}</span>
            )}
          </div>

          <div className="profile-btn">
            {!editMode ? (
              <button onClick={() => {
                    setEditMode(true);
                    setErrors({});
                    setServerError("");
                    }}>
                  Update Profile
              </button>
            ) : (
              <>
                {serverError && <p className="form-error">{serverError}</p>}
                <div className="actions">
                  <button onClick={handleUpdate}>Save</button>
                  <button onClick={() => setEditMode(false)}>Cancel</button>
                </div>
              </>
            )}


            {!editMode && (
              <button onClick={() => setResetMode(true)}>Reset Password</button>
            )}
          </div>

        </>
      ) : (
        <UserResetPassword onBack={() => setResetMode(false)} />
      )}
    </div>

  </>
  );
}
