import { useNavigate } from "react-router";

function Home() {
  const navigate: any = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  return (
    <div>
      <nav>
        {user.name && <div>{user.name}</div>}
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/login")}>Reports</button>
        {localStorage.getItem('token') && <button onClick={() => navigate("/login")}>Admin</button>}
      </nav>
    </div>
  )
}
export default Home;