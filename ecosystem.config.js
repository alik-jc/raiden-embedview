
/**
 * PM2 Ecosystem Configuration
 * 
 * IMPORTANTE: Este archivo solo define NODE_ENV para PM2.
 * La aplicación (embed-serv.ts) carga el archivo .env automáticamente
 * con dotenv.config() cuando se ejecuta.
 * 
 * NO agregues variables del .env aquí, PM2 pasará NODE_ENV y la app
 * cargará el resto desde .env cuando inicie.
 */
module.exports = {
    apps: [{
        name: 'Embed-View-Serv',
        script: 'dist/embed-serv.js',
        interpreter: 'bun',
        instances: 1,
        exec_mode: 'fork',
        watch: false,
        max_memory_restart: '500M',
        env: {
            NODE_ENV: 'development'
        },
        env_production: {
            NODE_ENV: 'production'
        },
        error_file: './logs/pm2-error.log',
        out_file: './logs/pm2-out.log',
        log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
        merge_logs: true,
        autorestart: true,
        max_restarts: 10,
        min_uptime: '10s',
        restart_delay: 4000
    }]
};
