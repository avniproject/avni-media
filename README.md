## Local Development
`avni-media` client and server do not support [username based authentication](https://avni.readme.io/docs/developer-environment-setup-ubuntu#conceptual-note) which is currently supported on `avni-server` for local development.
Connecting local avni-media to server/etl on another environment like staging leads to CORS errors.

Thus, for local development on avni-media, other avni components like `avni-server` and `avni-etl` need to be running locally with an IDP enabled i.e. Cognito or Keycloak.

### Other Avni Components

#### Environment Variables
I. Ensure that local `avni-server` and `avni-etl` have the following environment variables set
```
AVNI_IDP_TYPE
OPENCHS_CLIENT_ID
OPENCHS_IAM_USER_ACCESS_KEY
OPENCHS_IAM_USER_SECRET_ACCESS_KEY
OPENCHS_BUCKET_NAME
OPENCHS_USER_POOL
```
If using keycloak, also set the following on avni-server
```
OPENCHS_KEYCLOAK_SERVER
OPENCHS_KEYCLOAK_CLIENT_SECRET
OPENCHS_KEYCLOAK_ENABLED
```

II. Alternately, to work with Staging env IDP and Storage, you may use the following Make command in both avni-server and avni-etl. If required, override the DB and other details, Ex: OPENCHS_DATABASE_NAME=avni_org

```
## Init below fields in env variables
OPENCHS_STAGING_APP_CLIENT_ID
OPENCHS_STAGING_USER_POOL_ID
OPENCHS_STAGING_IAM_USER
OPENCHS_STAGING_IAM_USER_ACCESS_KEY
OPENCHS_STAGING_IAM_USER_SECRET_ACCESS_KEY

make start_server_staging OPENCHS_DATABASE_NAME=<your_db_name>
```

### Avni Media
There is a `local.staging` environment template configured for `client` and `server` that help with running `avni-media` locally.
Look at `client/middleware.js` which takes care of routing the request to local `avni-server` and `avni-etl` in this mode.
#### Server
```
cd server
nvm use
make deps
make start-local-staging
```
#### Client
```
cd client
nvm use
make deps
make start-local-staging
```
