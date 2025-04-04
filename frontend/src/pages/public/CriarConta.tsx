import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PiIdentificationCard } from "react-icons/pi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const schema = z.object({
  nomeUsuario: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  cpf: z
    .string()
    .min(11, "CPF deve ter 11 dígitos")
    .max(11, "CPF deve ter 11 dígitos")
    .regex(/^[0-9]+$/, "CPF deve conter apenas números"),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

function CriarConta() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = (data: FormData) => {
    console.log("Dados do formulário:", data);
  };

  return (
    <div className="center">
      <div className="wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Criar Conta</h1>

          <div className="input-box">
            <input type="text" placeholder="Nome de Usuário" {...register("nomeUsuario")} />
            <FaUser className="icon" />
            {errors.nomeUsuario && <p className="error">{errors.nomeUsuario.message}</p>}
          </div>

          <div className="input-box">
            <input type="text" placeholder="Email" {...register("email")} />
            <MdEmail className="icon" />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

          <div className="input-box">
            <input type="text" placeholder="CPF" {...register("cpf")} />
            <PiIdentificationCard className="icon" />
            {errors.cpf && <p className="error">{errors.cpf.message}</p>}
          </div>

          <div className="input-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              {...register("senha")}
            />
            <FaLock className="icon" />
            <span className="toggle-password" onClick={togglePasswordVisibility}>
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
            {errors.senha && <p className="error">{errors.senha.message}</p>}
          </div>

          <button type="submit">Criar Conta</button>

          <div className="register-link">
            <p>
              Você possui conta? <a href="Login">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CriarConta;
