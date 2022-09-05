import React, { useState, useEffect, useContext } from "react";
import ImageGallery from "./ImageGallery/ImageGallery.jsx";
import ProductInfo from "./ProductInfo/ProductInfo.jsx";
import StyleSelector from "./StyleSelector/StyleSelector.jsx";
import AddToCart from "./AddToCart/AddToCart.jsx";
import { config } from "../../../../env/config.js";
import axios from "axios";
import styled from "styled-components";
import { ClickTracker, DarkMode } from "../App.jsx";

const ProductOverview = ({ id, product }) => {
  const [styles, setStyles] = useState([]);
  const [style, setStyle] = useState({});
  const [mainPic, setMainPic] = useState({});
  const [indexMainPic, setIndexMainPic] = useState(0);
  const [success, setSuccess] = useState(false);
  const [ratings, setRatings] = useState({});
  const [selected, setSelected] = useState(0);

  const clickTracker = useContext(ClickTracker);
  const darkMode = useContext(DarkMode);

  const choseStyle = (styleId) => {
    for (let i = 0; i < styles.length; i++) {
      if (styles[i].style_id === styleId) {
        setStyle(styles[i]);
        setMainPic(styles[i].photos[indexMainPic].url);
        setSuccess(false);
      }
    }
  };

  const NextArrow = () => {
    const nexPicUrl = style.photos[indexMainPic + 1].url;
    setSelected((current) => current + 1);
    setMainPic(nexPicUrl);
    setIndexMainPic((current) => current + 1);
  };

  const BackArrow = () => {
    const previousPicUrl = style.photos[indexMainPic - 1].url;
    setSelected((current) => current - 1);
    setMainPic(previousPicUrl);
    setIndexMainPic((current) => current - 1);
  };

  const ChooseMainPic = (url, index) => {
    if (url === null) {
      setMainPic(
        "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png"
      );
    }
    setMainPic(url);
    setIndexMainPic(index);
  };

  const getRatingsData = () => {
    axios
      .get(`/reviews/meta?product_id=${id}`, config)
      .then((response) => {
        setRatings(response.data.ratings);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`/products/${id}/styles`, config)
      .then((response) => {
        setStyles(response.data.results);
        setStyle(response.data.results[0]);
        setMainPic(response.data.results[0].photos[0].url);
      })
      .catch((err) => {
        console.log(err);
      });
    getRatingsData();
  }, [id]);

  if (styles.length > 0) {
    return (
      <div onClick={(e) => clickTracker(e, "Product Overview")}>
        <div className="product-overview">
          {darkMode === "Dark Mode" ? (
            <div className="background_dark"></div>
          ) : (
            <div className="background"></div>
          )}

          <ImageGallery
            style={style}
            mainPic={mainPic}
            click={ChooseMainPic}
            NextArrow={NextArrow}
            BackArrow={BackArrow}
            selected={selected}
            setSelected={setSelected}
          />
          <ProductInfo product={product} style={style} ratings={ratings} />
          <StyleSelector styles={styles} choseStyle={choseStyle} />
          <AddToCart style={style} setSuccess={setSuccess} success={success} />
          <Description>{product.description}</Description>
        </div>
      </div>
    );
  }
};

export default ProductOverview;

const Description = styled.p`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  grid-column-start: 1;
  margin: 5px 150px;
  font-size: large;
  box-sizing: content-box;
  padding: 8px;
  border: 3px solid grey;
  border-radius: 5px;
`;
