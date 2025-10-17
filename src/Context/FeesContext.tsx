import React, { createContext, useContext, useMemo } from "react";
import { getAllUsersContext } from "./GetAllUsersContext";
import { getAllCategoriesContext } from "./GetAllCategoriesContext";
import { getAllDisciplinesContext } from "./GetAllDisciplinesContext";

export const FeesContext = createContext(null);

const FeesProvider = ({ children }) => {

    const { loguedUserInformation } = useContext(getAllUsersContext);
    const { categories } = useContext(getAllCategoriesContext);
    const { disciplines } = useContext(getAllDisciplinesContext);

    console.log(loguedUserInformation)

    // 🧭 Helpers
    const getCategory = (id: string | number) => categories?.find((c: { id: string | number; }) => c.id === id);
    const pleno = categories?.find((c: { id: string; }) => c.id === "Pleno-Flag");

    // 💵 Función para calcular la cuota de un miembro (titular o familiar)
    const getMemberFee = (member: { category: string | number; disciplines: any[]; }) => {
        if (!member || !member.category) return 0;
        const category = getCategory(member.category);
        let total = category?.baseFee || 0;

        // Si la categoría no incluye todas las disciplinas
        if (!category?.includesAllDisciplines && Array.isArray(member.disciplines)) {
            member.disciplines.forEach((disc: any) => {
                // Si hay info de disciplina en el otro contexto
                const discInfo = disciplines?.find((d) => d.name === disc);
                const feeForDiscipline =
                    pleno?.[member.category] ??
                    discInfo?.extraFee?.[member.category] ??
                    0;
                total += feeForDiscipline;
            });
        }
        return total;
    };

    // 🧍‍♂️ Cálculo titular
    const mainUserFee = useMemo(() => getMemberFee(loguedUserInformation), [loguedUserInformation, categories, disciplines]);

    // 👨‍👩‍👧 Cálculo grupo familiar
    const familyFees = useMemo(() => {
        if (!loguedUserInformation?.familyGroup) return [];
        return loguedUserInformation.familyGroup.map((member: any) => ({
            member,
            fee: getMemberFee(member),
        }));
    }, [loguedUserInformation, categories, disciplines]);

    // 💰 Total general
    const total = useMemo(() => {
        const familyTotal = familyFees.reduce((acc: any, f: { fee: any; }) => acc + f.fee, 0);
        return mainUserFee + familyTotal;
    }, [mainUserFee, familyFees]);

    // 📊 Desglose completo (listo para UI)
    const breakdown = useMemo(() => ({
        titular: {
            name: `${loguedUserInformation?.name || ""} ${loguedUserInformation?.lastName || ""}`,
            category: loguedUserInformation?.category,
            disciplines: loguedUserInformation?.disciplines || [],
            fee: mainUserFee,
        },
        familiares: familyFees.map((f: { member: { name: any; lastName: any; category: any; disciplines: any; }; fee: any; }) => ({
            name: `${f.member.name} ${f.member.lastName}`,
            category: f.member.category,
            disciplines: f.member.disciplines,
            fee: f.fee,
        })),
        total,
    }), [loguedUserInformation, mainUserFee, familyFees, total]);


    console.log("TOTAL TITULAR", mainUserFee)
    console.log("TOTAL FAMILIA", familyFees)
    console.log("TOTAL ", total)
    console.log("BREAKDOWN ", breakdown)


    return (
        <FeesContext.Provider value={{ mainUserFee, familyFees, total, breakdown }}>
            {children}
        </FeesContext.Provider>
    );
};

export default FeesProvider 
