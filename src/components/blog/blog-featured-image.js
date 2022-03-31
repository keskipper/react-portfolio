import React from "react";
import Blog from "../pages/blog";

const BlogFeaturedImage = props => {
    if (!props.img) {
        return null;
    }

    return (
        <div className="featured-image-wrapper">
            <img src={props.img} />
        </div>
    )
}

export default BlogFeaturedImage;