module.exports = (sequelize, DataTypes ) => {
    const Shorts = sequelize.define("shorts",{
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        code: {
            type: DataTypes.STRING,
            unique: true,
            validate : {
                len : {
                    args: [9],
                    msg: "Custom code must be atleast 9 characters long!"
                }
            }
        },
        clicks : {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    })

    return Shorts;
}
