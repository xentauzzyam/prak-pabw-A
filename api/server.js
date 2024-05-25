const express = require("express");
const cors = require("cors");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require("./config/database");
const app = express();
const port = 3000;

dotenv.config();

// export const Login = async(req, res) => {
//   try {
//       const user = await Users.findAll({
//           where: {
//               email: req.body.email
//           }
//       });
//       const match = await bcrypt.compare(req.body.password, user[0].password);
//       if(!match) return res.status(400).json({msg: "Password salah!"});
//       const userId = user[0].id;
//       const name = user[0].name;
//       const email = user[0].email;

//       const accessToken = jwt.sign({userId, name, email}, process.env.JWT_SECRET_KEY,{
//           expiresIn: '60s'
//       });
//       const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET,{
//           expiresIn: '1d'
//       });
//       await Users.update({refresh_token: refreshToken},{
//           where: {
//               id: userId
//           }
//       });
//       res.cookie('refreshToken', refreshToken,{
//           httpOnly: true,
//           maxAge: 24 * 60 * 60 * 1000
//       });
//       res.json({ accessToken });
//   } catch (error) {
//       res.status(404).json({msg: "Email tidak ditemukan"})
//   }
// }

// function getJwtSecretKey() {
//   const secretKey = process.env.JWT_SECRET_KEY;

//   if (!secretKey) {
//     throw new Error('JWT secret key not found in environment variables');
//   }

//   return secretKey;
// }

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Preserve the original filename
  },
});
const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.get("/test", (req, res) => {
  res.send("Hello World!");
});

app.get("/nama/:nama", (req, res) => {
  const { nama } = req.params;
  const { umur } = req.query;

  if (umur) {
    res.send(`Nama saya ${nama} dan umur saya ${umur}`);
  } else {
    res.send(`Nama saya ${nama}`);
  }
});

app.get("/users", async (req, res) => {
  try {
    const DataUser = await db.query("SELECT * FROM user");
    return res.status(200).json({
      msg: "Data user berhasil di GET",
      data: DataUser,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Data user gagal di GET",
      err: error,
    });
  }
});

app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const DataUser = await db.query(`SELECT * FROM user WHERE id = ${id}`);
    return res.status(200).json({
      msg: "Data user berhasil di GET",
      data: DataUser[0],
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Data user gagal di GET",
      err: error,
    });
  }
});

app.post("/daftar", async (req, res) => {
  const { fullname, email, password, umur, role } = req.body;
  try {
    const post_data =
      await db.query(`INSERT INTO user(fullname, email, password, umur, role) 
                                    VALUES ("${fullname}", "${email}", "${password}", "${umur}", "${role}")`);

    if (post_data) {
      const logInsert = await db.query(
        `INSERT INTO logs(pesan, waktu) VALUES ("User baru terdaftar dengan ID ${
          post_data.insertId
        }", "${new Date().toISOString().slice(0, 19).replace("T", " ")}")`,
      );
    }

    res.status(200).json({
      msg: "Berhasil membuat user",
      user: post_data,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Gagal membuat user",
      err: error,
    });
  }
});

app.post("/upload/:id_user", upload.single("avatar"), async (req, res) => {
  const { id_user } = req.params;
  try {
    const UploadFoto = db.query(
      `UPDATE user SET profile_picture = "${`./uploads/${req.file.filename}`}" WHERE id = ${id_user}`,
    );
    return res.status(200).json({
      msg: "Berhasil upload gambar",
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Gagal upload",
      err: error,
    });
  }
});

function getJwtSecretKey(user) {
  return jwt.sign({ 
    id: user.id, 
    email: user.email,
    role: user.role 
  }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }); 
}

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.query(
      `SELECT id, fullname, umur, role FROM user WHERE email = '${email}' AND password = '${password}' `,
    );

    if (user.length > 0) {
      const token = getJwtSecretKey(user[0]);

      const logInsert = await db.query(
        `INSERT INTO logs(pesan, waktu) VALUES ("User dengan email ${email} Berhasil login!", "${new Date()
          .toISOString()
          .slice(0, 19)
          .replace("T", " ")}")`,
      );

      return res.status(200).json({
        msg: "Login berhasil",
        user: user[0],
        token: token 
      });
    } else {
      res.status(401).json({
        msg: "Login gagal, email atau password salah",
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: "Gagal melakukan login",
      err: error,
    });
  }
});

app.post("/verifytoken", (req, res) => {
  const { token } = req.body;

  if (token) {
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);

    return res.json({
      data: data,
    });
  }

  return res.json({
    msg: "Token invalid",
  });
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleteUser = await db.query(
      `DELETE FROM user WHERE id = ?`,
      [id] 
    );

    if (deleteUser.affectedRows === 1) {
      res.status(200).json({ msg: "Akun berhasil dihapus!" });
    } else {

      res.status(404).json({ msg: "Akun tidak ditemukan" });
    }
  } catch (error) {
    console.error(error); // Log the error for troubleshooting
    res.status(500).json({ msg: "Error menghapus akun!" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
