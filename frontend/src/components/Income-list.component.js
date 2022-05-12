import React, { Component } from "react";
import IncomeDataService from "../services/pagination.service";
import Pagination from "@material-ui/lab/Pagination";

export default class IncomeList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveIncomes = this.retrieveIncomes.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveIncome = this.setActiveIncome.bind(this);
        this.removeAllIncomes = this.removeAllIncomes.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
        this.state = {
          incomes: [],
          currentIncome: null,
          currentIndex: -1,
          searchTitle: "",
          page: 1,
          count: 0,
          pageSize: 3,
        };
        this.pageSizes = [3, 6, 9];
      }
      componentDidMount() {
        this.retrieveIncomes();
      }
      onChangeSearchTitle(e) {
        const searchTitle = e.target.value;
        this.setState({
          searchTitle: searchTitle,
        });
      }
      getRequestParams(searchTitle, date, page, pageSize) {
        let params = {};
        // if (searchTitle) {
        //   params["title"] = searchTitle;
        // }
        if(date){
            params["date"] = "2022-04-01";
        }
        if (page) {
          params["offset"] = page - 1;
        }
        if (pageSize) {
          params["pageSize"] = pageSize;
        }
        return params;
      }
      retrieveIncomes() {
        const { searchTitle, page, pageSize } = this.state;
        const params = this.getRequestParams(searchTitle, page, pageSize);
        IncomeDataService.getAll(params)
          .then((response) => {
            const { incomes, totalPages } = response.data;
            this.setState({
              incomes: incomes,
              count: totalPages,
            });
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
      
      handlePageChange(event, value) {
        this.setState(
          {
            page: value,
          },
          () => {
            this.retrieveIncomes();
          }
        );
      }
      handlePageSizeChange(event) {
        this.setState(
          {
            pageSize: event.target.value,
            page: 1
          },
          () => {
            this.retrieveIncomes();
          }
        );
      }
      render() {
        const {
          searchTitle,
          incomes,
          currentIncome,
          currentIndex,
          page,
          count,
          pageSize,
        } = this.state;
        return (
          <div className="list row">
            <div className="col-md-8">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by title"
                  value={searchTitle}
                  onChange={this.onChangeSearchTitle}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={this.retrieveIncomes}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h4>Incomes List</h4>
              <div className="mt-3">
                {"Items per Page: "}
                <select onChange={this.handlePageSizeChange} value={pageSize}>
                  {this.pageSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <Pagination
                  className="my-3"
                  count={count}
                  page={page}
                  siblingCount={1}
                  boundaryCount={1}
                  variant="outlined"
                  shape="rounded"
                  onChange={this.handlePageChange}
                />
              </div>
              <ul className="list-group">
                {incomes &&
                  incomes.map((income, index) => (
                    <li
                      className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => this.setActiveIncome(income, index)}
                      key={index}
                    >
                      {income.title}
                    </li>
                  ))}
              </ul>
            </div>
            
            ...
          </div>
        );
      }
    }