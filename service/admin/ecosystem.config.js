module.exports = {
  apps: [
    {
      script: ".",
      name: "admin",
      output: "/var/www/picoll/log/pm2.out.log",
      error: "/var/www/picoll/log/pm2.error.log",
      log_date_format: "YYYY-MM-DD HH:mm",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
