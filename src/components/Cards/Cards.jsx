import React, {useEffect, useState} from "react";
import "./Cards.css";
import { cardsData } from "../../Data/Data";

import Card from "../Card/Card";

export default function Cards(props){


  return (
    <div className="Cards">
      {props.props.map((card, id) => {
        return (
          <div className="parentContainer" key={id}>
            <Card
              title={card.title}
              color={card.color}
              barValue={card.barValue}
              value={card.value}
              xaxis={card.xaxis}
              png={card.png}
              series={card.series}
            />
          </div>
        );
      })}
    </div>
  );
};

