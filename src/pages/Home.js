import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import Mainshoe from "../assets/images/imani-bahati-LxVxPA1LOVM-unsplash.png";
import Content from "../assets/images/big-shoe1.png";
import Content1 from "../assets/images/shoe4.svg";
import Content2 from "../assets/images/shoe8.svg";
import star from "../assets/images/5star-01.png";
import ProductCard from "../components/ProductCard";
import bigShoe3 from "../assets/images/big-shoe3.png";
import runningShoe from "../assets/images/pair-trainers.jpg";
import leatherBoot from "../assets/images/leather-boots.jpg";
import corporateShoes from "../assets/images/brown-shoes-isolated-white-background.jpg";

const products = [
  {
    id: 1,
    image: bigShoe3,
    title: 'Stylish Sneakers',
    price: 59.99,
  },
  {
    id: 2,
    image: runningShoe,
    title: 'Classic Running Shoes',
    price: 79.99,
  },
  {
    id: 3,
    image: leatherBoot,
    title: 'Leather Boots',
    price: 119.99,
  },
  {
    id: 4,
    image: corporateShoes,
    title: 'Corporatae Shoes',
    price: 99.99,
  }
];


const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
            Step Into  <span className="highlight">Style, Comfort, and Confidence.</span>
            </h1>
            <p>
              Where Every Pair Tells a Story. Designed for every occasion and crafted for the perfect
              fit.
            </p>
            <Link to="/products" className="shop-now-btn">
              Shop Now
            </Link>
          </div>
          
        </div>
      </header>

      <section className="bestselling">

        <p>POPULAR PRODUCTS</p>
        <h1>Trending Now</h1>

        <div className="products">
  
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
            // onClick={() => handleAddToCart(product.id)}
          />
        ))}
          
        </div>

      </section>

    <section className="bestselling">

      <p>SHOP</p>
      <h1>Best Selling</h1>

      <div className="products">
        
            {products.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                title={product.title}
                price={product.price}
                // onClick={() => handleAddToCart(product.id)}
              />
            ))}
            
      </div>

    </section>

<section className="Comments">
<h1>What Our Customers Are Saying</h1>

<div className="testimonials">

<div className="testimonial1">
  <img src={star}></img>
  <p>"Absolutely love my new sneakers! They are not only stylish but also perfect for long walks. I am beyond impressed with the attention to detail and comfort they provide."</p>
  <h2>Daniel</h2>
  <hr style={{ marginTop: "10px", marginBottom: "10px", borderColor: "gray", width: "15%" }} />
</div>

<div className="testimonial2">
  
  <img src={star}></img>
  <p>"Stylish, durable, and affordable—what more could I ask for? These shoes are a game-changer. I have already recommended ShoeStore to all my friends."</p>
  <h2>Faith</h2>
  <hr style={{ marginTop: "10px", marginBottom: "10px", borderColor: "gray", width: "15%" }} />
</div>

<div className="testimonial3">
<img src={star}></img>
  <p>"The most comfortable shoes I've ever worn! The quality is exceptional, and I love the sleek design. I wear them everywhere, and they still look brand new!"</p>
  <h2>Light</h2>
  <hr style={{ marginTop: "10px", marginBottom: "10px", borderColor: "gray", width: "15%" }} />
</div>

<div className="testimonial4">
<img src={star}></img>
  <p> "I have always struggled to find the perfect fit, but ShoeStore nailed it. Amazing customer service, quick delivery, and shoes that feel like they are made just for me."</p>
  <h2>Akin</h2>
  <hr style={{ marginTop: "10px", marginBottom: "10px", borderColor: "gray", width: "15%" }} />
</div>


</div>

</section>


<section className="collections">

<div className="collectionsbox">
<p>New Collection</p>
<h2>Female Shoes <br /> that give an <br /> extra sense of <br /> elegance.</h2>
<h3>Find your unique style.</h3>
<button> Shop Now </button>
</div>

<div className="collectionsbox1">
<p>New Collection</p>
<h2>Back to <br /> School <br /> Shoes for <br /> your kids.</h2>
<h3>Find your unique style.</h3>
<button> Shop Now </button>
</div>

</section>

      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-item">
            <img src={Content} alt="Comfort" />
            <h3>Comfort</h3>
            <p>Designed for all-day wear with unmatched comfort.</p>
          </div>
          <div className="feature-item">
            <img src={Content1} alt="Durability" />
            <h3>Durability</h3>
            <p>Built to last with high-quality materials.</p>
          </div>
          <div className="feature-item">
            <img src={Content2} alt="Style" />
            <h3>Style</h3>
            <p>Fashion-forward designs to suit every occasion.</p>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default Home;
