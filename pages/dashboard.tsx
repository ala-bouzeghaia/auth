import { useEffect, useState } from "react";
import cookie from "cookie";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

interface User {
  name: string;
  email: string;
}

const Dashboard = () => {
  const [user, setUser] = useState({} as User);
  const router = useRouter();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  // console.log("dash token", auth);
  let isMounted = true;
  const controller = new AbortController();

  const getUser = async (token: string) => {
    try {
      const results = await axiosPrivate.get("/api/dashboard", {
        /*signal: controller.signal,
         headers: {
          Authorization: `Bearer ${token}`,
        }, */
      });
      console.log(results);
      setUser(results?.data.user);
      // return results;
    } catch (error) {
      console.log(error);
      // const results = await axios.get("/api/logout");
      // console.log(results);
      // router.push("/");
      // alert("Please Login first");
    }
  };

  const logout = async () => {
    const results = await axios.get("/api/logout");
    console.log(results);
    results.data.message && alert(results.data.message);
    router.push("/login");
  };

  useEffect(() => {
    getUser(auth.accessToken); /* .then((res) => {
      setUser(res?.data.user);
    }); */
    return () => {
      isMounted = false;
      // controller.abort();
    };
  }, []);

  return (
    <>
      {user && (
        <>
          <h2>Dashboard</h2>
          <p>Name: {user?.name}</p>
          <p>Email: {user?.email}</p>
          <button onClick={logout}>Logout</button>
          <Link href='/'>Home</Link>
        </>
      )}
    </>
  );
};

export default Dashboard;

// export async function getServerSideProps(context: {
//   req: { headers: { cookie: string } };
// }) {
//   const parsedCookies = cookie.parse(context.req.headers.cookie);
//   // console.log("context", context);
//   const deleteCookie = () => {
//     context.req.headers.cookie = "";
//   };
//   return { props: { parsedCookies, deleteCookie } };
// }
