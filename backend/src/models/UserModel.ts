import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import bcrypt from "bcrypt";
import BookModel from "./BookModel";

class UserModel extends Model {
  id: number | undefined;
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
  updatedBy: number | undefined;

  public async hashPassword() {
    this.password = await bcrypt.hash(this.password!, 10);
  }

  public async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password!);
  }
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "UserModel",
    tableName: "users",
  }
);

UserModel.beforeCreate(async (user: UserModel) => {
  await user.hashPassword();
});

UserModel.beforeUpdate(async (user: UserModel) => {
  if (user.changed("password")) {
    await user.hashPassword();
  }
});

UserModel.belongsTo(BookModel, {
  foreignKey: "userId", // definindo qual é a fk
  as: "user", // define o nome da relação na busca
});
// mapeamento bidirecional
BookModel.hasMany(UserModel, {
  foreignKey: "userId",
  as: "user",
});

export default UserModel;
