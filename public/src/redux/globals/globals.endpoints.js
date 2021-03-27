const homeUrl = process.env.DEPLOY_ENV === 'development' ? process.env.DEVELOPMENT_HOME : process.env.PRODUCTION_HOME;

export {homeUrl};