import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    axiosWithAuth()
      .get("/api/colors")
      .then((res) => {
        // console.log('BubblePage -> res.data', res.data);
        setColorList(res.data);
      })
      .catch((err) => {
        console.log(
          "BubblePage -> err",
          err.response.status,
          err.response.statusText
        );
      });
  }, []);

  return (
    <div className='BubblePage container'>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </div>
  );
};

export default BubblePage;
