const headerStyle = {
    color: 'white',
    fontSize: '72px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
};

const Header = () => {
    return (
        <header className="header-container mb-5" style={{ position: 'relative' }}>
            <div className="row justify-content-center align-items-end" style={{ height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                <div className="col-12 text-center">
                    <h1 className='fw-bolder' style={headerStyle}>
                        THE FELLOWSHIP OF THE ERRANDS
                    </h1>
                </div>
            </div>
        </header>
    );
};

export default Header;