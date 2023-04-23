import Head from "./head";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

const Layout = ({ children }) => {
    return (
        <>
            <Head />
            <div className="row g-0">
                <div className="col-lg-4 col-xl-3">
                    <Sidebar />
                </div>
                <div className="col-lg-8 col-xl-9">
                    <Navbar />

                    <main className="container-fluid main">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}

export default Layout