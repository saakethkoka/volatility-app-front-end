import React from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import "./MainDash.css";
import {UilClipboardAlt, UilMoneyWithdrawal, UilUsdSquare} from "@iconscout/react-unicons";

const firstCardsData = [
    {
        title: "Cash",
        color: {
            backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
            boxShadow: "0px 10px 20px 0px #e0c6f5",
        },
        barValue: 0,
        value: "0",
        png: UilUsdSquare,
        series: [
            {
                name: "Sales",
                data: [31, 40, 28, 51, 42, 109, 100],
            },
        ],
    },
    {
        title: "Bonds",
        color: {
            backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
            boxShadow: "0px 10px 20px 0px #FDC0C7",
        },
        barValue: 0,
        value: "0",
        png: UilMoneyWithdrawal,
        series: [
            {
                name: "Revenue",
                data: [10, 100, 50, 70, 80, 30, 40],
            },
        ],
    },
    {
        title: "Stocks",
        color: {
            backGround:
                "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
            boxShadow: "0px 10px 20px 0px #F9D59B",
        },
        barValue: 0,
        value: "0",
        png: UilClipboardAlt,
        series: [
            {
                name: "Expenses",
                data: [10, 25, 15, 30, 12, 15, 20],
            },
        ],
    },
];

export default function MainDash(props){

    let data = props.props;

    const [cardsData, setCardsData] = React.useState(firstCardsData);

    React.useEffect(() => {
        if (Object.keys(data).length === 0) {
            return;
        }
        let initial_cash = Math.round(data["cash_value"][0]);
        let initial_bonds = Math.round(data["tbills_value"][0]);
        let initial_stocks = Math.round(data["stocks_value"][0]);

        // Convert integer initial_cash to string with commas:
        let initial_cash_string = initial_cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        let initial_bonds_string = initial_bonds.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        let initial_stocks_string = initial_stocks.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        // Modify cards data and set it:
        let newCardsData = cardsData;
        newCardsData[0].value = initial_cash_string;
        newCardsData[1].value = initial_bonds_string;
        newCardsData[2].value = initial_stocks_string;

        setCardsData(newCardsData);

    });

  return (
    <div className="MainDash">
      <h1>Dashboard</h1>
      <Cards props={cardsData}/>
      <Table />
    </div>
  );
};
