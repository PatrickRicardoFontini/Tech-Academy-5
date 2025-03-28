import "./Login.css"
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";


function Login() {
    return(
        <div className="center">
        <div className="wrapper">
            <form action="">
                <h1>Login</h1>
                <div className="input-box">
                    <input type="text" placeholder="Usuario" required />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Senha" required />
                    <FaLock className="icon"/>
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox" />Lembrar Senha</label>
                    <a href="#">Esqueceu a Senha</a>
                </div>
                <button type="submit">Login</button>
                <div className="register-link"></div>
                        <p>Voce possui conta? <a href="#">Criar Conta</a> </p>
            </form>
        </div>
        </div>
    )


}

export default Login