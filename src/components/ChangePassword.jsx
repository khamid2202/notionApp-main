import axios from "axios";

const ChangePassword = async (password, token, navigate) => {
  try {
    const expire_at = JSON.parse(localStorage.getItem("expire_at"));
    if (expire_at < Date.now() / 1000) {
      navigate("/login");
    } else {
      const response = await axios.put(
        "https://aura-production-24d6.up.railway.app/teachers/update-password",
        { password: password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    }
  } catch (error) {
    console.log("Error updating password:", error);
    throw error;
  }
};

export default ChangePassword;
