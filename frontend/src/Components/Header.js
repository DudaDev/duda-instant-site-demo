import './Header.css';

function Header() {
  return (
    <>
        <div className='container'>
            <header>
                <img src='/duda.svg' alt='Duda Logo' />
                <h1>Duda Instant Sites Demo</h1>
                <nav>
                    <a href='#simpleSite'>Simple Site</a>
                    <a href='#manageSites'>Manage Sites</a>
                </nav>
            </header>
        </div>
        <div className='orangeline'></div>
    </>
  );
}

export default Header;