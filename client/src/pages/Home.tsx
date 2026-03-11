import { useNavigate } from "react-router";

function Home() {
  const navigate: any = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div>
      <nav>
        {user.name && <div>{user.name}</div>}
        {user.name ? <button onClick={() => {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          navigate("/");
        }}>Logout</button> :<button onClick={() => navigate("/login")}>Login</button>}
        <button onClick={() => navigate("/login")}>Reports</button>
        {localStorage.getItem('token') && <button onClick={() => navigate("/reports")}>Reports</button>}

      </nav>
    </div>
  )
}
export default Home;