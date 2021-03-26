import React from 'react';
import Helmet from 'react-helmet';
import Header from '../../components/header/header.component';
import Navigation from '../../components/navigation/navigation.component';
import Container from '../../components/layout/container.component';
import './404.scss';

const NoPage = (props) => {
    return (
        <>
            <Helmet>
                <title>404 | AdventZagreb</title>
                <meta type="description" content="404 Page" />
                {/*OG META */}
                <meta property="og:title" content="404 Page" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://www.adventzagreb.hr`} />
                <meta property="og:image" content={`https://www.adventzagreb.hr/documents/advent-zagreb-default-og-image.jpg`} />
                <meta property="og:description" content="Missing page (404)" />
                <meta name="description" content="Missing page (404)" />
            </Helmet>

            <section className="no-page">
                <Container>
                    <div className="four-o-four">
                        <h2>
                            404 <span>Oooops, we broke something.</span>
                        </h2>
                        <p>The page you are looking for doesn't exist.</p>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default NoPage;
