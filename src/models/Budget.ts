import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript'
import Expense from './Expense'

@Table({
    tableName: 'budgets',
})
class Budget extends Model {
    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    declare name: string

    @Column({
        type: DataType.DECIMAL,
        allowNull: false,
    })
    declare amount: number

    @HasMany(() => Expense, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    declare expenses: Expense[]
}

export default Budget
