import { Table, Column, Model, DataType, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript';

@Table({
    tableName: 'budgets'
})

class Budget extends Model {
    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    declare name: string;

    @Column({
        type: DataType.DECIMAL,
        allowNull: false
    })
    declare amount: number;
}

export default Budget