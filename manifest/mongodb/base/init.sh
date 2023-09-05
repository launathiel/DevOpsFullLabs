#!/bin/bash
mongo --quiet <<EOF
db.getSiblingDB("admin").createUser({
    user : "admin",
    pwd  : "rahasia",
    roles: [ { role: "root", db: "admin" } ]
});
EOF