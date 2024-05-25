import { useState } from "react";

export default function RegisterPage() {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [umur, setUmur] = useState(0);
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation with regular expression (can be customized)
    const emailRegex = /^[^\s@]+@[gmail\.com]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address ending with @gmail.com");
      return; // Prevent form submission if email is invalid
    }

    // Check for empty fields and display appropriate error message(s)
    if (!fullname || !email || !password || umur === 0 || !role) {
      let errorMessage = "Please fill in all required fields:\n";
      if (!fullname) errorMessage += "- Nama\n";
      if (!email) errorMessage += "- Email\n";
      if (!password) errorMessage += "- Password\n";
      if (umur === 0) errorMessage += "- Umur\n";
      if (!role) errorMessage += "Role\n";
      setErrorMessage(errorMessage);
      return;
    }

    const data = {
      fullname: fullname,
      email: email,
      password: password,
      umur: umur,
      role: role
    };

    try {
      const response = await fetch("http://localhost:3000/daftar", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Harap cek email untuk link verifikasi"); // Success message
      } else if (response.status === 409) {
        setErrorMessage(
          "Email ini sudah terdaftar. Silahkan gunakan email yang lain."
        ); 
      } else {
        console.error(
          `Registration failed with status: ${response.status}`
        );
        setErrorMessage("Email sudah terdaftar. Silahkan gunakan email yang lain.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage("Kesalahan sistem. Hubungi administrator."); // User-friendly error message
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center w-screen h-screen gap-4 ">
        <h1 className="text-xl font-bold">Register</h1>
        <form
          className="flex flex-col items-center p-5 border rounded-md shadow w-max"
          onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label>Nama</label>
            <input
              className="border"
              type="fullname"
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
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
          <div className="flex flex-col gap-2">
            <label>Umur</label>
            <input
              className="border"
              type="number"
              onChange={(e) => setUmur(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Role</label>
            <select
              className="border px-3 py-2 rounded focus:outline-none focus:ring-blue-500 focus:ring-1"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">-- Pilih Role --</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <input
            type="submit"
            value="Verifikasi Email"
            className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          />
          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
          <p className="text-center mt-4">
          Sudah punya akun? <a href="/login" style={{ color: "blue" }}>Login</a>
        </p>
        </form>
      </div>
    </div>
  );
}
// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import for navigation

// export default function RegisterPage() {
//   const [fullname, setFullName] = useState(""); // Use empty string for initial value
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [umur, setUmur] = useState(0); // Use 0 for initial value

//   const navigate = useNavigate(); // Utilize useNavigate hook

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = {
//       fullname,
//       email,
//       password,
//       umur,
//     };

//     try {
//       const response = await fetch("http://localhost:3000/daftar", {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         method: "POST",
//         body: JSON.stringify(data),
//       });

//       if (response.ok) { // Check for successful response (status code 200-299)
//         alert("Akun berhasil dibuat!");
//         navigate("/login"); // Navigate to login page on success
//       } else {
//         console.error(
//           `Registration failed with status: ${response.status}`
//         );
//         alert("Pendaftaran gagal. Silahkan coba lagi."); // Informative error message
//       }
//     } catch (error) {
//       console.error("Error during registration:", error);
//       alert("Kesalahan sistem. Hubungi administrator."); // User-friendly error message
//     }
//   };

//   return (
//     <div>
//       <div className="flex flex-col items-center justify-center w-screen h-screen gap-4 ">
//         <h1 className="text-xl font-bold">Register</h1>
//         <form
//           className="flex flex-col items-center p-5 border rounded-md shadow w-max"
//           onSubmit={handleSubmit}
//         >
//           <div className="flex flex-col gap-2">
//             <label>Nama</label>
//             <input
//               className="border"
//               type="text"
//               value={fullname} // Use controlled component pattern
//               onChange={(e) => setFullName(e.target.value)}
//             />
//           </div>
//           <div className="flex flex-col gap-2">
//             <label>Email</label>
//             <input
//               className="border"
//               type="email"
//               value={email} // Use controlled component pattern
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="flex flex-col gap-2">
//             <label>Password</label>
//             <input
//               className="border"
//               type="password"
//               value={password} // Use controlled component pattern
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <div className="flex flex-col gap-2">
//             <label>Umur</label>
//             <input
//               className="border"
//               type="number"
//               value={umur} // Use controlled component pattern
//               onChange={(e) => setUmur(Number(e.target.value))} // Ensure type conversion
//             />
//           </div>
//           <input
//             type="submit"
//             value="Submit"
//             className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
//           />
//         </form>
//       </div>
//     </div>
//   );
// }
