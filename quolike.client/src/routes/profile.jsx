import { useState } from 'react';
export default function Profile(user) {
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        // TODO: Handle form submission

        setIsEditingName(false);
        setIsEditingEmail(false);
    };

    return (
        <div className="profile container">
            <h1>Profile</h1>
            <p>This is your profile.</p>
            <div className="row d-flex flex-column justify-content-center g-3">
                <div className="col-12">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Name"
                            defaultValue="John Doe"
                            readOnly={!isEditingName}
                            onChange={handleChange}
                        />
                        {isEditingName ? (
                            <>
                                <input type="submit" value="Save" />
                                <input type="button" value="Cancel" onClick={() => setIsEditingName(false)} />
                            </>
                        ) : (
                            <input type="button" value="Edit" onClick={(e) => {
                                e.preventDefault();
                                setIsEditingName(true);
                            }} />
                        )}
                    </form>
                </div>
                <div className="col-12">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="youremail@gmail.com"
                            defaultValue="useremail@gmail.com"
                            readOnly={!isEditingEmail}
                            onChange={handleChange}
                        />
                        {isEditingEmail ? (
                            <>
                                <input type="submit" value="Save" />
                                <input type="button" value="Cancel" onClick={() => setIsEditingEmail(false)} />
                            </>
                        ) : (
                            <input type="button" value="Edit" onClick={(e) => {
                                e.preventDefault();
                                setIsEditingEmail(true);
                            }} />
                        )}
                    </form>
                </div>
                <div className="col-12">
                    <button>Change password</button>
                </div>
                <div className="col-12">
                    <button>Delete account</button>
                </div>
            </div>
        </div>
    );
}