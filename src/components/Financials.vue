<template>
  <div class="hello">
    <h1>Showing Income Statement {{ this.stock }}</h1>
    <form @submit.prevent="updateStock">
      <input type="submit" value="Submit" class="btn-primary m-2" />
      <input
        type="text"
        v-model="stock"
        name="stock"
        placeholder="Enter Ticker"
      />
    </form>
    <div class="container">
      {{ this.stock }}
      <div class="stock_name">{{ stockprice }}</div>
    </div>

    <div class="row" v-if="loaded">
      <div class="col-md-5 ml-5">
        <b-table sticky-header hover :items="items" :fields="fields"></b-table>
      </div>

      <div class="col-md-5">
        <chart :options="ChartOptionsBar"></chart>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "mainPage",
  props: {
    msg: String,
  },
  data() {
    return {
      url: "",
      allfinancials: [],
      loaded: "",
      financials: [],
      stock: "",
      ChartOptionsBar: {},
      stockprice: "",
    };
  },
  methods: {
    plotStock(allfinancials) {
        console.log(allfinancials);
      this.ChartOptionsBar = {
        xAxis: {
          data: [
            this.allfinancials[0].date,
            this.allfinancials[1].date,
            this.allfinancials[2].date,
            this.allfinancials[3].date,
          ],
        },
        yAxis: {
          type: "value",
        },
        series: {
          type: "bar",
          data: [
            this.allfinancials[0].Revenue / 1000000,
            this.allfinancials[1].Revenue / 1000000,
            this.allfinancials[2].Revenue / 1000000,
            this.allfinancials[3].Revenue / 1000000,
          ],
        },
        title: {
          text: "Yearly Revenues",
          x: "center",
          textStyle: {
            fontSize: 24,
          },
        },
      };
    },
    stockPrice() {
      this.url =
        "https://financialmodelingprep.com/api/v3/stock/real-time-price/" +
        this.stock +
        "?apikey=d8a1759a992a7461e2cefcb3b2fb5ee4";
      axios
        .get(this.url)
        .then((res) => {
          (this.stockprice = res.data.price), console.log(this.stockprice);
        })
        .catch((err) => console.log(err));
    },
    formatNumber(number) {
      number = (number / 1000000).toFixed(2).replace(".", ",");
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    updateStock() {
      this.url =
        "https://financialmodelingprep.com/api/v3/financials/income-statement/" +
        this.stock +
        "?apikey=d8a1759a992a7461e2cefcb3b2fb5ee4";
      console.log(this.url);
      axios
        .get(this.url)
        .then((res) => {
          (this.allfinancials = res.data.financials),
            (this.financials = res.data.financials[0]);
          (this.loaded = true),
            (this.fields = ["item", "in_Millions", "in_Millions1"]),
            (this.items = [
              {
                in_Millions: this.allfinancials[0].date,
                item: Object.keys(this.financials)[0],
                in_Millions1: this.allfinancials[1].date,
              },
              {
                in_Millions: this.formatNumber(this.allfinancials[0].Revenue),
                item: Object.keys(this.financials)[1],
                in_Millions1: this.formatNumber(this.allfinancials[1].Revenue),
              },
              {
                in_Millions: this.formatNumber(
                  this.allfinancials[0]["Cost of Revenue"]
                ),
                item: Object.keys(this.financials)[3],
                in_Millions1: this.formatNumber(
                  this.allfinancials[1]["Cost of Revenue"]
                ),
              },
              {
                in_Millions: this.formatNumber(
                  this.allfinancials[0]["Operating Expenses"]
                ),
                item: Object.keys(this.financials)[7],
                in_Millions1: this.formatNumber(
                  this.allfinancials[1]["Operating Expenses"]
                ),
              },
              {
                in_Millions: this.formatNumber(
                  this.allfinancials[0]["Operating Income"]
                ),
                item: Object.keys(this.financials)[8],
                in_Millions1: this.formatNumber(
                  this.allfinancials[1]["Operating Income"]
                ),
              },
              {
                in_Millions: this.formatNumber(
                  this.allfinancials[0]["Interest Expense"]
                ),
                item: Object.keys(this.financials)[9],
                in_Millions1: this.formatNumber(
                  this.allfinancials[1]["Interest Expense"]
                ),
              },
              {
                in_Millions: this.formatNumber(
                  this.allfinancials[0]["Earnings before Tax"]
                ),
                item: Object.keys(this.financials)[10],
                in_Millions1: this.formatNumber(
                  this.allfinancials[1]["Earnings before Tax"]
                ),
              },
              {
                in_Millions: this.formatNumber(
                  this.allfinancials[0]["Income Tax Expense"]
                ),
                item: Object.keys(this.financials)[11],
                in_Millions1: this.formatNumber(
                  this.allfinancials[1]["Income Tax Expense"]
                ),
              },
              {
                in_Millions: this.formatNumber(
                  this.allfinancials[0]["Net Income"]
                ),
                item: Object.keys(this.financials)[14],
                in_Millions1: this.formatNumber(
                  this.allfinancials[1]["Net Income"]
                ),
              },
            ]);
          this.plotStock(this.allfinancials);
          this.stockPrice();
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
stock_name {
  padding: 10px;
}
</style>
