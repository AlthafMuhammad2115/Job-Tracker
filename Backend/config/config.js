const Sentry = require('@sentry/node');

InitSentry=async()=>{
    Sentry.init({ dsn: 'https://36c44ea94a3678671f88e6c817d89b5a@o4508403948453888.ingest.de.sentry.io/4508403950813264' });
    
}

module.exports={InitSentry}