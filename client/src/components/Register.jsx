import { useState } from 'react';
import { register } from './AuthService';
import { useHistory, Link } from 'react-router-dom'
import swal from 'sweetalert';
import style from './styles/Login.module.css';

const Register = () => {
	const [input, setInput] = useState({
		nombre: '',
		apellido: '',
		email: '',
		contraseña: '',
		celular: ''
	});
	const history = useHistory();
	const handleChange = (e) => {
		setInput({ ...input, [e.target.name]: e.target.value})
	}
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!(input.nombre && input.apellido && input.email && input.contraseña)) {
			return swal({
				title: "Error",
				text: "Debes llenar los campos requeridos para poder registrarte",
				icon: "error",
				button: "Ok",
			});
		}
		try {
			await register(input.nombre, input.apellido, input.email, input.contraseña, input.celular);
			swal({
				title: '¡Registro completado!',
				text: `Gracias por registrate ${input.nombre}, te enviaremos a la página para que inicies sesión`,
				icon: "success",
				button: "Ok",
			});
			history.push('/login');
			setInput({
			nombre: '',
			apellido: '',
			email: '',
			contraseña: '',
			celular: '' })
		} catch (error) {
			swal({
				title: "Error",
				text: "El correo que ingresó ya existe, intente nuevamente con otro",
				icon: "error",
				button: "Ok",
			});
		}
	};
	return (
		<div className={style.contenedor}>
			<Link className={style.linkUrl} to='/'>
      <p className={style.volver}>{'< Volver'}</p>
      </Link>
			<div className={style.cardRegister}>
				<div className={style.contenedorCardRegister}>
				<div className={style.campos}>
				<h4>Regístrate</h4>
				<form onSubmit={handleSubmit} autocomplete="off">
				<input type='text' name='nombre' value={input.nombre} placeholder='Ingrese su nombre' onChange={handleChange} />
				<input type='text' name='apellido' value={input.apellido} placeholder='Ingrese su apellido' onChange={handleChange} />
				<input type='email' name='email' value={input.email} placeholder='Ingrese su correo electrónico' onChange={handleChange} />
				<input type='password' name='contraseña' value={input.contraseña} placeholder='Ingrese su contraseña' onChange={handleChange} />
				<input type='tel' name='celular' value={input.celular} placeholder='Ingrese su celular' onChange={handleChange} />
				<button>Registrar</button>
				</form>
				</div>
				</div>
			</div>
		</div>
	)
}

export default Register;