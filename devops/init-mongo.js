db.createUser(
    {
        user : "root",
        pwd  : "root",
        roles : [
            {
                role : "readWrite",
                db   : "count_of_money"
            }
        ]
    }
)