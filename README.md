# TTP-FS-20180728


#NPM INSTALL

#DEPLOY LINK: https://tppse.herokuapp.com/

Need to add a `config.json`
  -> `{
        "SECRET": "verysecuresecret",
        "SYNC_AND_SEED": false,
        "DB_FORCE": false
      }`
Also need a PG database. It can either be put in the config file as `DB_URL` or in `/server/db/conn.js`

to run: `npm run start:dev`


