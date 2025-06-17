export default function Header() {
  return (
    <header>
      <nav className="navbar bg-black sticky-top" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand">BoolFlix</a>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">
              Cerca...
            </button>
          </form>
        </div>
      </nav>
    </header>
  );
}
