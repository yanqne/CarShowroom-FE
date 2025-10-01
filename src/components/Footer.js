import '../assets/styles.css';

export default function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                    <div>&copy; 2025 AutoShowroom. All rights reserved.</div>
                    <div className="d-flex gap-3">
                        <a href="#"><i className="bi bi-facebook"></i></a>
                        <a href="#"><i className="bi bi-instagram"></i></a>
                        <a href="#"><i className="bi bi-youtube"></i></a>
                        <a href="#"><i className="bi bi-tiktok"></i></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}