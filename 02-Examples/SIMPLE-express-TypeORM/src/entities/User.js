const EntitySchema = require("typeorm").EntitySchema

module.exports  = new EntitySchema({
    name: "User", // Will use table name `category` as default behaviour.
    tableName: "Users", // Optional: Provide `tableName` property to override the default behaviour for table name.
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        fistName: {
            type: "nvarchar",
            
        },
        lastName: {
            type: "nvarchar",
        },
        numberPhone: {
            type: "varchar",
            length: 12
        },
        email: {
            type: "varchar",
        },
        address: {
            type: "nvarchar",
        },
        birthday: {
            type: "timestamp",
        },
        password: {
            type: "varchar",
        }
    }
})