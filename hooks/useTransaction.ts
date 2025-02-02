import CategoryIcons from "@/constants/CategoryIcons"
import { TextInputComponent } from "react-native"

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
    return { getTotal }
}