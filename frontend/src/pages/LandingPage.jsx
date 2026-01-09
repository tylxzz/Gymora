import { FiCalendar, FiUsers, FiBarChart2 } from "react-icons/fi";
import fitness from '../assets/fitness-equipment.png'
import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <div className="landing-page">
            <section className="hero">
                <div className="hero-inner">
                    <div className="hero-text">
                        <h1>Transform Your Fitness Journey</h1>
                        <p>
                            Comprehensive fitness center management with modern scheduling, membership tracking, and analytics
                        </p>
                        <div className="hero-actions">
                            <Link to="/register" className="btn btn-hero-primary">Get Started</Link>
                            <Link to="/our-story" className="btn btn-hero-ghost">Learn More</Link>
                        </div>
                    </div>

                    <div className="hero-image">
                        <div className="hero-image-inner">
                            <img src={fitness} alt="Gymora fitness preview" className="hero-img"/>
                        </div>
                    </div>
                </div>
            </section>

            <section id="features" className="features-section">
                <h2 className="section-title">Features</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <FiUsers size={32} />
                        </div>
                        <h3>Role-Based Dashboards</h3>
                        <p>
                            Customized interfaces for admins, trainers, and guests with appropriate access levels
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <FiCalendar size={32} />
                        </div>
                        <h3>Smart Scheduling</h3>
                        <p>
                            Integrated calendar system for booking trainers and managing gym sessions
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <FiBarChart2 size={32} />
                        </div>
                        <h3>Analytics & Insights</h3>
                        <p>
                            Comprehensive statistics and real-time occupancy tracking
                        </p>
                    </div>
                </div>
            </section>

            <section id="pricing" className="pricing-section">
                <h2 className="section-title">Pricing</h2>
                <div className="pricing-grid">
                    <div className="price-card">
                        <h3>Daily Pass</h3>
                        <div className="price-value">
                            $15
                        </div>
                        <ul>
                            <li>Full gym access</li>
                            <li>All equipment</li>
                            <li>Locker room</li>
                        </ul>
                        <button className="btn btn-outline-full">Buy Now</button>
                    </div>

                    <div className="price-card">
                        <h3>10 Sessions Pack</h3>
                        <div className="price-value">
                            $120
                        </div>
                        <ul>
                            <li>Full gym access</li>
                            <li>All equipment</li>
                            <li>Locker room</li>
                            <li>Valid for 90 days</li>
                        </ul>
                        <button className="btn btn-outline-full">Buy Now</button>
                    </div>

                    <div className="price-card price-card-featured">
                        <div className="badge">Popular</div>
                        <h3>Monthly Pass</h3>
                        <div className="price-value">
                            $49
                        </div>
                        <ul>
                            <li>Full gym access</li>
                            <li>All equipment</li>
                            <li>Locker room</li>
                            <li>Free Wi-Fi</li>
                        </ul>
                        <button className="btn btn-full-primary">Buy Now</button>
                    </div>

                    <div className="price-card">
                        <h3>Quarterly</h3>
                        <div className="price-value">
                            $129
                        </div>
                        <ul>
                            <li>Full gym access</li>
                            <li>All equipment</li>
                            <li>Locker room</li>
                            <li>Free Wi-Fi</li>
                            <li>1 PT session</li>
                        </ul>
                        <button className="btn btn-outline-full">Buy Now</button>
                    </div>

                    <div className="price-card">
                        <h3>Yearly</h3>
                        <div className="price-value">
                            $449
                        </div>
                        <ul>
                            <li>Full gym access</li>
                            <li>All equipment</li>
                            <li>Locker room</li>
                            <li>Free Wi-Fi</li>
                            <li>4 PT sessions</li>
                            <li>Nutrition guide</li>
                        </ul>
                        <button className="btn btn-outline-full">Buy Now</button>
                    </div>
                </div>
            </section>

            <section id="about" className="about-section">
                <h2 className="section-title">About Us</h2>
                <p className="about-text">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                </p>
                <p className="about-text">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                </p>
                <p className="about-text">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                </p>
                <p className="about-text">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                </p>
            </section>
        </div>
    )
}