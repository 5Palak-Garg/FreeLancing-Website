import axios from 'axios';
import { useEffect, useState } from 'react';


export default function Dashboard() {
const [projects, setProjects] = useState([]);


useEffect(() => {
axios.get('http://localhost:5000/projects').then(res => {
setProjects(res.data);
});
}, []);


return (
<ul>
{projects.map(p => <li key={p._id}>{p.title}</li>)}
</ul>
);
}