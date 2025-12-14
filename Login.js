import axios from 'axios';


export default function Login() {
const login = async () => {
const res = await axios.post('http://localhost:5000/login', {
email: 'test@gmail.com',
password: '123456'
});
localStorage.setItem('token', res.data.token);
alert('Logged In');
};


return <button onClick={login}>Login</button>;
}