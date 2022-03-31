import React, { Component } from 'react';
import axios from 'axios';

export default class PortfolioDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.slug,
            portfolioItem: {}
        }

        this.getPortfolioItem = this.getPortfolioItem.bind(this);
    }

    getPortfolioItem() {
        axios.get(`https://katherineskipper.devcamp.space/portfolio/portfolio_items/${this.state.id}`
        ).then(response => {
            //console.log("getPortfolioItem: ", response.data.portfolio_item)
            this.setState({
                portfolioItem: response.data.portfolio_item
            });
        }).catch(error => {
            console.log("getPortfolioItem error: ", error)
        });
    }

    componentWillMount() {
        this.getPortfolioItem();
    }

    render() {
        const {
            banner_image_url,
            category,
            description,
            logo_url,
            name,
            thumb_image_url,
            url
        } = this.state.portfolioItem;

        const bannerStyles = {
            backgroundImage: "url(" + banner_image_url + ")",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center"
          };
      
          const logoStyles = {
            width: "200px"
          };

        return (
            <div className="portfolio-detail-wrapper">
                <div className="banner" style={bannerStyles}>
                    <img src={logo_url} style={logoStyles} />
                </div>

                <div className="portfolio-detail-description-wrapper">
                    <div className="description">{description}</div>
                </div>

                <div className="bottom-content-wrapper">
                    <a href={url} className="site-link" target="_blank">
                    Visit {name}
                    </a>
                </div>
            </div>
        );
    }
}