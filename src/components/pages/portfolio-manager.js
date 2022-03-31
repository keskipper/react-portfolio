import React, { Component } from 'react';
import axios from 'axios';

import PortfolioForm from '../portfolio/portfolio-form';
import PortfolioSidebarList from '../portfolio/portfolio-sidebar-list';

export default class PortfolioManager extends Component {
    constructor() {
        super();

        this.state = {
            pageTitle: "Portfolio Manager",
            //isLoading: false,
            data: [],
            portfolioToEdit: {}
        };
        // bind statements
        this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
        this.handleEditFormSubmission = this.handleEditFormSubmission.bind(this);
        this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.clearPortfolioToEdit = this.clearPortfolioToEdit.bind(this);
    }

    // handlers
    clearPortfolioToEdit(){
        this.setState({
            portfolioToEdit: {}
        });
    }

    handleEditClick(portfolioItem) {
        this.setState({
            portfolioToEdit: portfolioItem
        });
    }

    handleDeleteClick(portfolioItem) {
        axios.delete(`https://api.devcamp.space/portfolio/portfolio_items/${portfolioItem.id}`, { 
            withCredentials: true })
            .then(response => {
                this.setState({
                    data: this.state.data.filter(item => {
                        return item.id !== portfolioItem.id;
                    })
                });

                return response.data;
            }).catch(error => {
                console.log("error in handleDeleteClick: ", error)
            });
    }

    handleEditFormSubmission() {
        this.getPortfolioItems();
    }

    handleNewFormSubmission(portfolioItem) {
        this.setState({
          data: [portfolioItem].concat(this.state.data)
        });
      }

    handleFormSubmissionError (error) {
        console.log("Form submission error: ", error);
    }

    getPortfolioItems() {
        axios
          .get("https://katherineskipper.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc", {withCredentials: true})
          .then(response => {
            //console.log("response: ", response);
            this.setState({
                data: [...response.data.portfolio_items]
            });
          })
          .catch(error => {
            console.log("Error in getPortfolioItems: ", error);
          });
      }

    componentDidMount() {
        this.getPortfolioItems();
    }

    render() {
        return (
            <div className="portfolio-manager-wrapper">
                <div className="left-column">
                    <PortfolioForm
                        handleNewFormSubmission={this.handleNewFormSubmission}
                        handleEditFormSubmission={this.handleEditFormSubmission}
                        handleFormSubmissionError={this.handleFormSubmissionError}
                        clearPortfolioToEdit={this.clearPortfolioToEdit}
                        portfolioToEdit={this.state.portfolioToEdit}
                    />
                </div>
                <div className="right-column">
                    <PortfolioSidebarList 
                        handleDeleteClick={this.handleDeleteClick}
                        data={this.state.data}
                        handleEditClick={this.handleEditClick}
                    />

                </div>
            </div>
        );
    }
}