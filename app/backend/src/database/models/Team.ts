import { DataTypes, Model } from 'sequelize';
import db from '.';

class Team extends Model {
  // public <campo>!: <tipo>;
}

Team.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    timestamps: false,
  },
);

export default Team;
