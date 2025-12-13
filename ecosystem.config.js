require('dotenv').config();

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
            NODE_ENV: 'development',
            // Carga todas las variables del .env para desarrollo
            ...process.env
        },
        env_production: {
            NODE_ENV: 'production',
            // Carga todas las variables del .env para producción
            ...process.env
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
