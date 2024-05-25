import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [cookies, setCookie] = useCookies(["TOKEN"]);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { email, password };

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        // Jika login berhasil, simpan token ke cookie dan atur waktu kedaluwarsa menjadi 2 menit
        setCookie("TOKEN", result.token, { path: "/", expires: new Date(Date.now() + 120000) });
        navigate("/homepage");
      // const result = await response.json();
      // if (response.ok) {
      //   const decodedToken = jwtDecode(result.token);
      //   console.log(decodedToken);
      //   const expirationDate = new Date(decodedToken.exp * 1000);
      //   setCookie("TOKEN", result.token, { path: "/", expires: expirationDate });

      //   navigate("/homepage");
      } else {
        alert(result.msg || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Error");
    }
  };

return (
  <div>
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-4 ">
      <h1 className="text-xl font-bold">Login</h1>
      <form
        className="flex flex-col items-center p-5 border rounded-md shadow w-max"
        onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label>Email</label>
          <input
            className="border"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Password</label>
          <input
            className="border"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        />
        <p className="text-center mt-4">
          Belum punya akun? <a href="/register" style={{ color: "blue" }}>Buat Akun</a>
        </p>
      </form>
    </div>
  </div>
);
}
