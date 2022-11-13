import React from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import "./MainDash.css";
import {UilClipboardAlt, UilMoneyWithdrawal, UilUsdSquare} from "@iconscout/react-unicons";
import {FormControlLabel, FormGroup, Switch} from "@mui/material";

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
        xaxis: {
            type: "datetime",
            categories: [
                "2018-09-19",
                "2018-09-20",
                "2018-09-21",
                "2018-09-22",
                "2018-09-23",
                "2018-09-24",
                "2018-09-25",
            ],
        },
        series: [
            {
                name: "Value",
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
        xaxis: {
            type: "datetime",
            categories: [
                "2018-09-19",
                "2018-09-20",
                "2018-09-21",
                "2018-09-22",
                "2018-09-23",
                "2018-09-24",
                "2018-09-25",
            ],
        },
        series: [
            {
                name: "Value",
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
        xaxis: {
            type: "datetime",
            categories: [
                "2018-09-19",
                "2018-09-20",
                "2018-09-21",
                "2018-09-22",
                "2018-09-23",
                "2018-09-24",
                "2018-09-25",
            ],
        },
        series: [
            {
                name: "Value",
                data: [10, 25, 15, 30, 12, 15, 20],
            },
        ],
    }
];
const firstPortfolioData = {
        title: "Portfolio Value",
        color: {
            backGround:
                "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
            boxShadow: "0px 10px 20px 0px #F9D59B",
        },
        barValue: 0,
        value: "0",
        png: UilClipboardAlt,
        xaxis: {
            type: "datetime",
            categories: [
                "2018-09-19",
                "2018-09-20",
                "2018-09-21",
                "2018-09-22",
                "2018-09-23",
                "2018-09-24",
                "2018-09-25",
            ],
        },
        series: [
            {
                name: "Value",
                data: [10, 25, 15, 30, 12, 15, 20],
            },
        ],
};

export default function MainDash(props){

    let data = props.props;

    const [cardsData, setCardsData] = React.useState(firstCardsData);
    const [portfolioData, setPortfolioData] = React.useState(firstPortfolioData);
    const [future, setFuture] = React.useState(false);

    React.useEffect(() => {
        if (Object.keys(data).length === 0) {
            return;
        }
        let initial_cash = Math.round(props.props["cash_value"][0]);
        let initial_bonds = Math.round(props.props["tbills_value"][0]);
        let initial_stocks = Math.round(props.props["stocks_value"][0]);

        // Calculate the percentage of each asset allocation:

        let total = initial_cash + initial_bonds + initial_stocks;
        let initial_cash_percent = Math.round((initial_cash / total) * 100);
        let initial_bonds_percent = Math.round((initial_bonds / total) * 100);
        let initial_stocks_percent = Math.round((initial_stocks / total) * 100);


        // Convert integer initial_cash to string with commas:
        let initial_cash_string = initial_cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        let initial_bonds_string = initial_bonds.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        let initial_stocks_string = initial_stocks.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        // Modify cards data and set it:
        let newCardsData = cardsData;
        newCardsData[0].value = initial_cash_string;
        newCardsData[1].value = initial_bonds_string;
        newCardsData[2].value = initial_stocks_string;

        newCardsData[0].barValue = initial_cash_percent;
        newCardsData[1].barValue = initial_bonds_percent;
        newCardsData[2].barValue = initial_stocks_percent;

        newCardsData[0].xaxis.categories = data["dates"];
        newCardsData[1].xaxis.categories = data["dates"];
        newCardsData[2].xaxis.categories = data["dates"];

        newCardsData[0].series[0].data = props.props["cash_value"];
        newCardsData[1].series[0].data = props.props["tbills_value"];
        newCardsData[2].series[0].data = props.props["stocks_value"];


        setCardsData([...newCardsData]);

        let newPortfolioData = {...portfolioData};

        let future_dates = [...data["future_dates"]];
        let future_portfolio_value_bottom_68 = [...data["future_portfolio_value_bottom_68"]];
        let future_portfolio_value_top_68 = [...data["future_portfolio_value_top_68"]];
        future_dates.shift();
        future_portfolio_value_bottom_68.shift();
        future_portfolio_value_top_68.shift();
        let past_dates = [...data["dates"]];
        let complete_dates = [...past_dates, ...future_dates];
        let complete_portfolio_value_bottom_68 = [...data["portfolio_value"], ...future_portfolio_value_bottom_68];
        let complete_portfolio_value_top_68 = [...data["portfolio_value"], ...future_portfolio_value_top_68];
        newPortfolioData.xaxis.categories = complete_dates;
        newPortfolioData.series = []
        newPortfolioData.series.push({
            name: "Top 68%", data: complete_portfolio_value_top_68
        });
        newPortfolioData.series.push({
            name: "Bottom 68%", data: complete_portfolio_value_bottom_68
        });
        setPortfolioData({...newPortfolioData});


    }, [props.props, future]);

  return (
    <div className="MainDash">
      <h1>Dashboard</h1>
        <FormGroup>
            <FormControlLabel control={<Switch onChange={
                () => {
                    setFuture(!future);
                }
            }
                                               value={future}
            />} label="Future Returns" />
        </FormGroup>
      <Cards props={cardsData}/>
      <Table param={portfolioData}/>
    </div>
  );
};
