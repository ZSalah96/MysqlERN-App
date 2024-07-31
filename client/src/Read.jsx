import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function Read() {
    const { id } = useParams();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8081/read/${id}`)
            .then(res => {
                console.log(res); // Verify the structure of res.data
                setStudent(res.data[0]); // Assuming res.data is the expected object
            })
            .catch(err => {
                console.error(err);
            });
    }, [id]);

    if (!student) {
        return <div>Loading...</div>; // or any other loading indicator
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <h2>Student Info</h2>
                <h2>ID: {student.id}</h2>
                <h2>Name: {student.Name}</h2>
                <h2>Email: {student.Email}</h2>
                <Link to="/" className="btn btn-primary">Back</Link>
                <Link to={`/edit/${student.id}`} className="btn btn-info">Edit</Link>
            </div>
        </div>
    );
}

export default Read;
