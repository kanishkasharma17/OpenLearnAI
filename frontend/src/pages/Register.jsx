import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { registerUser } from "../api/auth";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "student"
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await registerUser(form);

            alert("Registration Successful");

            navigate("/");

        }

        catch (err) {
    const data = err.response?.data;

    const msg =
        data?.message ||
        data?.error ||
        data?.errors?.[0]?.msg ||
        "Registration Failed";

    alert(msg);
}

    };

    return (

        <div style={{ padding: 40 }}>

            <h1>Register</h1>

            <form onSubmit={handleSubmit}>

                <input
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                />

                <br /><br />

                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                >

                    <option value="student">Student</option>

                    <option value="teacher">Teacher</option>

                </select>

                <br /><br />

                <button type="submit">

                    Register

                </button>

            </form>

            <br />

            <Link to="/">

                Back to Login

            </Link>

        </div>

    );

}

export default Register;