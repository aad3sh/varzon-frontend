import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./multicarousel.css";
import { Link } from "react-router-dom";

const PreviousBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <i className="fa-solid fa-angle-left" style={{ color: "blue" }}></i>
    </div>
  );
};

const NextBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <i className="fa-regular fa-angle-right" style={{ color: "blue" }}></i>
    </div>
  );
};

const MultiItemCarousel = () => {
  const [product, setProduct] = useState([]);

  const SearchByTitle = () => {
    var colors = [
      "burger",
      "apple, flour",
      "flour",
      "eggs",
      "wheat",
      "cornflour",
    ];
    var randColor = colors[Math.floor(Math.random() * colors.length)];
    const options = {
      method: 'GET',
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
      params: {
        ingredients: randColor,
        number: '5',
        ignorePantry: 'true',
        ranking: '1'
      },
      headers: {
        'X-RapidAPI-Key': 'a198a79ae2msh34c31ec11e806e5p14816djsnc59ed2f61d6d',
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
      setProduct(response.data);
      console.log(product);
    }).catch(function (error) {
      console.error(error);
    });
  };

  useEffect(() => {
    SearchByTitle();
  }, []);

  const Card = ({p}) => {
    const price =  Math.floor(Math.random() * 50) + 15;
    return (
      <div style={{ textAlign: "center", margin: "20px" }}>
        <img
          className="multi-image"
          src={p['image']}
          style={{
            width: "100%",
            height: "210px",
            objectFit: "contain",
            marginBottom: "5px",
            marginTop: "5px",
          }}
          alt="Product Details"
        />
        <h5
          className="text link-light"
          style={{ fontSize: "15px", padding: "5px 0", textDecoration: "none" }}
        >
          {p['title']}
        </h5>
        <h5
          style={{ fontSize: "15px", padding: "5px 0", textDecoration: "none" }}
        >
          <span style={{ textDecoration: "line-through", color: "grey" }}>
            ${price+43}
          </span>
          <span style={{ color: "green", padding: "0px 2px" }}>
            ${price}
          </span>
        </h5>
      </div>
    );
  };

  const properties = {
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
    slidesToShow: 4,
    centerMode: true,
    centerPadding: "150px",
    responsive: [
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          centerMode: false,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...properties}>
        {product &&
          product.map((p) => {
            return (
              <Link
                to={`details/${p.id}`}
                style={{ textDecoration: "none", color: "black" }}
                key={"l" + p.id}
              >
                <Card p={p} key={p['id']} />
              </Link>
            );
          })}
      </Slider>
    </>
  );
};
export default MultiItemCarousel;
