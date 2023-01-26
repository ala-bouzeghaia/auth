import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../styles/Login.module.scss";
import { useAuth } from "../context/AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  // const [isHidden, setIsHidden] = useState(true);
  const router = useRouter();
  const { setAuth } = useAuth();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const results = await axios.post(
        "/api/login",
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(results);
      const accessToken = results.data.token;

      setAuth({ accessToken });

      router.push("/dashboard");
    } catch (error: any) {
      console.log(error);
      if (error?.response.status === 500) {
        setMessage(`X ${error?.response.statusText}`);
      } else {
        setMessage(`X ${error?.response.data.message}`);
      }
    }
  };

  return (
    <div className={styles.main}>
      <img src='./login-img.svg' />
      <div className={styles["form-container"]}>
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
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
            <span className={styles["alert-message"]}>{message}</span> Login
          </button>
          <p>
            You don't have an account?{" "}
            <a href='/register'>
              <span>Register</span>
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
