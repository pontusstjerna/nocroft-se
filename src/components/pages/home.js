import Hero from '../organisms/hero.js';

const Home = () => (
    <section id="section-home" className="home-container">
        <Hero imgs={['tree.jpg', 'sky.jpg', 'thunder.jpg', 'street.jpg']} />
    </section>
);

export default Home;
