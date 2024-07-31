import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Create() {
    const [values, setValues] = useState({
        name: '',
        email:''
    })

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/student', values)
        .then(res => {
            console.log(res);
            navigate('/')
        })
        .catch(err => console.log(err))
    }
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
            <h2>Add Student</h2>
            <div className="mb-2">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Enter Name" className="form-control" value={values.name}
                onChange={e => setValues({...values, name: e.target.value})}/>
            </div>
            <div className="mb-2">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter Email" className="form-control" value={values.email} 
                onChange={e => setValues({...values, email: e.target.value})}/>
            </div>
            <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Create
