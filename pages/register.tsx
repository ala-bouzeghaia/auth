import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../styles/Register.module.scss";
import { useAuth } from "../context/AuthProvider";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const logout = async () => {
    const results = await axios.get("/api/logout");
    console.log(results.data);
  };

  const { auth } = useAuth();
  if (auth.accessToken) {
    // console.log({ auth });
    logout();
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();
      const results = await axios.post(
        "/api/register",
        JSON.stringify({ name, email, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // const results = await res.json();
      console.log(results);
      // results.message
      //   ? setMessage(`X ${results.message}`)
      //   : // setName("");
      //     // setEmail("");
      //     // setPassword("");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      setMessage(`X ${error?.response.data.message}`);
    }
  };

  return (
    <div className={styles.main}>
      <img src='./register-img.svg' />
      <div className={styles["form-container"]}>
        <h1>Register Page</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles["name-section"]}>
            <input
              type='text'
              name='name'
              autoComplete='off'
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <label htmlFor='name' className={styles["label-name"]}>
              <span className={styles["content-name"]}> Name</span>
            </label>
          </div>
          <div className={styles["email-section"]}>
            <input
              type='text'
              name='email'
              autoComplete='off'
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label htmlFor='email' className={styles["label-email"]}>
              <span className={styles["content-email"]}> Email</span>
            </label>
          </div>
          <div className={styles["password-section"]}>
            <input
              type='password'
              name='Password'
              autoComplete='off'
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label htmlFor='password' className={styles["label-password"]}>
              <span className={styles["content-password"]}>Password</span>
              {/* <div onClick={() => setIsHidden(!isHidden)}>
                <img src={isHidden ? "./hide.svg" : "./show.svg"} />
              </div> */}
            </label>
          </div>
          <button>
            <span className={styles["alert-message"]}>{message}</span> Register
          </button>

          <p>
            Already have an account?{" "}
            <a href='/login'>
              <span>Login</span>
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
