import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { toast } from "sonner"
import { Car } from "@prisma/client"

interface UseLovedCarsType {
    lovedItems: Car[],
    addLovedItem: (data: Car) => void,
    removeLovedItem: (id: string) => void,
}

export const useLovedCars = create(
    persist<UseLovedCarsType>(
        (set, get) => ({
            lovedItems: [],
            
            addLovedItem: (data: Car) => {
                const currentLovedItems = get().lovedItems;
                const existingItem = currentLovedItems.find((item) => item.id === data.id);
                
                if (existingItem) {
                    toast.error("El coche ya existe en la lista");
                    return;
                }
                
                set({
                    lovedItems: [...currentLovedItems, data]
                });
                
                toast.success("Coche añadido a la lista");
            },
            
            removeLovedItem: (id: string) => {
                const currentLovedItems = get().lovedItems;
                const updatedItems = currentLovedItems.filter((item) => item.id !== id);
                
                set({
                    lovedItems: updatedItems
                });
                
                toast.success("Coche eliminado de la lista");
            }
        }),
        {
            name: "loved-cars-storage",
            storage: createJSONStorage(() => localStorage)
        }
    )
)

