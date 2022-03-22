import LoginStyles from "../styles/Login.module.css";
import Layout from "../components/Layout";

const Login = () => {
  return (
    <Layout>
      <div className={`${LoginStyles.loginContainer}`}>
        <form action="">
          <h2>
            <b>SOIOT SYSTEM</b>
          </h2>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
          />
          <div className={LoginStyles.btnContainer}>
            <button onClick="login()" type="submit">
              LOGIN
            </button>
            <a>or create new account</a>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
