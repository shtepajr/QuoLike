export default function Profile() {
    return (
        <div className="profile container">
            <h1>Profile</h1>
            <p>This is your profile.</p>
            <div className="row d-flex flex-column justify-content-center g-3">
                <div className="col-12">
                    <input type="text" placeholder="Name" defaultValue="John Doe" readOnly />
                    <button>Change name</button>
                </div>
                <div className="col-12">
                    <input type="text" placeholder="Email" defaultValue="ZC9dJ@example.com" readOnly/>
                    <button>Change email</button>

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