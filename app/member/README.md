## Member Service

### Node Version
`v19.7.0`

### NPM Version
`9.5.0`

## How To Run
### Environment Variables
```
# APP
PORT=

# MONGGODB 
MONGO_ROOT_USERNAME=
MONGO_ROOT_PASSWORD=
DB_HOST=
DB_NAME=
```
### Local
1. `vi .env.test`
2. Add the environment variables
3. `npm install`
4. `npm run test`

### Docker
1. `docker build -t member .`
2. `docker run -p $PORT:$PORT member -d`