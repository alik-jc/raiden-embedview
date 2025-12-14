require('dotenv').config();

export const apps = [{
    name: 'Embed-View-Serv',
    script: './dist/embed-serv.js',
    interpreter: 'bun',
    env_production: {
        NODE_ENV: 'production',
        SRV_URI: process.env.SRV_URI || 3000,
        HASH: process.env.HASH
    },
    env_development: {
        NODE_ENV: 'development',
        SRV_URI: process.env.SRV_URI || 3000,
        HASH: process.env.HASH
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '512M',
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
}];
