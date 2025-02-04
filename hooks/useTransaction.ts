import CategoryIcons from "@/constants/CategoryIcons"

type categoryType = keyof typeof CategoryIcons

type ItemType = {
    icon: categoryType,
    category: string,
    description: string,
    amount: number,
    income: boolean
}
export function useTransaction(data: Array<ItemType>) {
    const getTotal = () => {
        let total = 0;
        for(const item of data){
            total = item.income ? total + item.amount : total - item.amount;
        }
        return total;
    }
    const getIncomeExpense = () => {
        let income = 0;
        let expense = 0;
        for(const item of data){
            if(item.income)
                income = income + item.amount;
            else
                expense = expense + item.amount;
        }
        return [income, expense];
    }
    return { getTotal, getIncomeExpense }
}