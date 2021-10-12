# api-nodejs-sequalize-mysql-2021
### swagger
![resources/static/assets/uploads/swagger1.png](/resources/static/assets/uploads/swagger1.png)
![resources/static/assets/uploads/swagger2.png](/resources/static/assets/uploads/swagger2.png)


```
git clone https://github.com/yogithesymbian/api-nodejs-sequalize-mysql-2021.git
```
----
1. `cd api-nodejs-sequalize-mysql-2021`
2. `nsc-migrates`
3. `npm run dev`
-----

### database configuration
- `./app/config/config.json`

### port listening
`const PORT = process.env.PORT || 3001;`
### cors
`var corsOptions = {
  origin: "http://localhost:3001",
};`

## endpoint
`/api/auth/signup`

```
raw json
{
    "username": "yogiarifwidodo",
    "email": "yogiarifwidodo@yogi.com",
    "password": "yogi",
    "roles": [
        "moderator",
        "user"
    ]
}
```

`/api/auth/signin`

```
raw json
{
    "username": "yogiarifwidodo",
    "password": "yogi"
}
```

1. `/api/test/all` public access
2. `/api/test/user` user access
3. `/api/test/mod` moderator access
4. `/api/test/admin` admin access

----
`x-access-token :` `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjA2MDE1NjU5LCJleHAiOjE2MDYxMDIwNTl9.pUya-Wqm8sVmadkxfGvYL7N0Y3d-18dT3IaZtSLUMS4`

# SET UP SERVER
## Aliyun Linux Server | HTTPD/APACHE
```
#/etc/systemd/system/node-app-1.service

Description = node-app-1.service
After network.target = node-app-1.service

[Service]
ExecStart=/usr/local/bin/npm run dev /var/www/html/api/nodejs/api-doa-nodeJS-express-mysql/server.js
Restart=on-failure
StandardOutput=syslog
StandardError=syslog

SyslogIdentifier=node-app-1
User=nobody
Group=root

Environment=NODE_ENV=production PORT=3000
WorkingDirectory=/var/www/html/api/nodejs/api-doa-nodeJS-express-mysql

[Install]
WantedBy=multi-user.target
```

Then run the following to start both instances of our node application

`$ systemctl start node-app-1`
The first instance will be accepting requests at port 5000, where as the other one at port 5001. If any of them crashes it will automatically be restarted.

To make your node app instances run when the server starts do the following

`$ systemctl enable node-app-1`
In case there are problems with any of the following commands above you can use any of these two:

```
$ sudo systemctl status node-app-1
$ sudo journalctl -u node-app-1
```

The first line will show your app instance current status and whether it is running. The second command will show you all logging information including output on standard error and standard output streams from your instance.

Use the first command right now to see whether your app is running or whether there has been some problem starting it.

Re-deploying your app
With the current setup, if we have some new application code in our repository, all you have to do is the following

```
cd /opt/app
git pull
sudo systemctl restart node-app-1
```
## firewall
```
sudo ufw allow 3000 // execute to allow on port
sudo ufw status verbose // status
```

## HEROKU

Start your app locally using the heroku local command, which is installed as part of the Heroku CLI.
`heroku local web`

```
/node_modules
npm-debug.log
.DS_Store
/*.env
```

Deploy your application to Heroku
After you commit your changes to git, you can deploy your app to Heroku.

```
git add .
git commit -m "Added a Procfile."
heroku login
Enter your Heroku credentials.
...
heroku create
Creating arcane-lowlands-8408... done, stack is cedar
http://arcane-lowlands-8408.herokuapp.com/ | git@heroku.com:arcane-lowlands-8408.git
Git remote heroku added
git push heroku master
...
-----> Node.js app detected
...
-----> Launching... done
       http://arcane-lowlands-8408.herokuapp.com deployed to Heroku
```


---

## modification guide
1. make a model, and register the model into `/app/models/index.js`.
- `deprecated : use new modification guide to create a model `
2. create a controller (for consuming in routes on laters).
3. create routes in `/app/routes` and register the routes in `/server.js` .


## new modification guide note list short command
------
1. `npm install --save sequelize`
2. `npm install --save-dev sequelize-cli`
3. `npm sequelize-cli init`
4. `npm install mysql2`
-------
1. `npx sequelize-cli model:generate --name user --attributes first_name:string,last_name:string,email:string`
-------
1. `npx sequelize-cli db:migrate`
2. `npx sequelize-cli db:migrate:undo`
3. `npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js`
-------
1. `npx sequelize-cli seed:generate --name demo-user`
2. `npx sequelize-cli db:seed:all`
3. `npx sequelize-cli db:seed:undo`
4. `npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data`
5. `npx sequelize-cli db:seed:undo:all`
-------

### skeleton migration only
1. `npx sequelize-cli migration:generate --name migration-skeleton`

## using snippet
for snippet just type the folder name first to trigger what for todo for example if you are in `auth.controller` we already known the folder is `controllers` so just type `cont` will trigger what todo.


## aliases .zsrhc | .bshrc
```
alias nsc="npx sequelize-cli"
<!-- FOR MODEL -->
alias nsc-m-generate="npx sequelize-cli model:generate --name"
alias nsc-migrate="npx sequelize-cli db:migrate"
alias nsc-migrateu="npx sequelize-cli db:migrate:undo:all"

<!-- FOR SEEDER -->
alias nsc-s-generate="npx sequelize-cli seed:generate --name"
alias nsc-seeder="npx sequelize-cli db:seed:all"
alias nsc-seederu="npx sequelize-cli db:seed:undo:all"

<!-- FOR RE-MIGRATE WITH SEEDER GENERATE ALL -->
alias nsc-migrates="nsc-migrateu && nsc-migrate && nsc-seeder"
```