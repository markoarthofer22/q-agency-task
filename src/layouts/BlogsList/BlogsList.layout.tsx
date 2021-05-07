import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// components
import BlogCard from '../SingleBlogCard/blog-card.layout';
import Button from '../../components/buttons/button.component';
// styles
import './styles.scss';

// hoc
import clgComponentName from '../../components/hoc/consoleComponentName';
import { iPostType } from 'contextStore/globals/interface/globals.interface';

interface iBlogListProps {
    data: iPostType[];
    limit?: number;
    isVertical?: boolean;
    showMore?: boolean;
    holderClass?: string;
    postError?: string | null;
}

const BlogsList: React.FC<iBlogListProps> = (props) => {
    const { data, limit, showMore, holderClass, postError, isVertical } = props;
    const [limitedDataArray, setLimitedDataArray] = useState<iPostType[]>([]);

    useEffect(() => {
        if (limit && limit > 0) {
            setLimitedDataArray(data.slice(0, limit));
        } else {
            setLimitedDataArray(data);
        }
    }, [limit, data]);

    return (
        <div className={`latest-blogs--holder ${holderClass && holderClass}`}>
            <div className="container">
                {postError ? (
                    <h3 className="latest-blogs--error-text">
                        {postError ? postError : 'Error occured!'}
                    </h3>
                ) : (
                    <>
                        <div
                            className={`row grid-20 ${
                                isVertical ? 'flex-vertical' : ''
                            }`}
                        >
                            {limitedDataArray?.map(
                                (item: iPostType, index: number) => (
                                    <div
                                        key={index}
                                        className={`${
                                            isVertical
                                                ? 'col-12'
                                                : ' col-12 col-sm-6 col-md-4'
                                        }`}
                                    >
                                        <Link to={`/posts/${item.id}`}>
                                            <BlogCard
                                                content={item.content}
                                                title={item.title}
                                                user={item.author}
                                                date={item.date}
                                                background={item.img}
                                            />
                                        </Link>
                                    </div>
                                )
                            )}
                        </div>
                        {showMore && (
                            <div className="row">
                                <div className="col-12 text-center">
                                    <Link to="/posts">
                                        <Button
                                            customClass="latest-blogs--cta"
                                            title="See all Posts"
                                        />
                                    </Link>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

BlogsList.propTypes = {
    data: PropTypes.array.isRequired,
    limit: PropTypes.number,
    isVertical: PropTypes.bool,
    showMore: PropTypes.bool,
    holderClass: PropTypes.string,
    postError: PropTypes.string,
};

export default clgComponentName(BlogsList, 'BlogsList');
