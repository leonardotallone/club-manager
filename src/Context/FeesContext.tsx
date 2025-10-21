import React, { createContext, useContext, useMemo } from "react";
import { getAllUsersContext } from "./GetAllUsersContext";
import { getAllCategoriesContext } from "./GetAllCategoriesContext";
import { getAllDisciplinesContext } from "./GetAllDisciplinesContext";

export const FeesContext = createContext(null);

const FeesProvider = ({ children }) => {
  const { loguedUserInformation } = useContext(getAllUsersContext);
  const { categories } = useContext(getAllCategoriesContext);
  const { disciplines } = useContext(getAllDisciplinesContext);

  // 🧭 Helpers
  const getCategory = (id) => categories?.find((c) => c.id === id);
  const pleno = categories?.find((c) => c.id === "Pleno-Flag");

  // Busca una disciplina por nombre y devuelve su fee general
  const getDisciplineFee = (discName) => {
    const d = disciplines?.find(
      (disc) => disc.name?.toLowerCase().trim() === discName?.toLowerCase().trim()
    );
    return d?.fee ?? 0;
  };

  // 💵 Calcula la cuota individual
  const getMemberFee = (member) => {
    if (!member || !member.category) return 0;

    const category = getCategory(member.category);
    const baseFee = category?.baseFee ?? 0;
    let total = baseFee;

    // Si es full, suma Pleno-Flag y no suma disciplinas
    if (member.full) {
      const plenoExtra = pleno?.[member.category] ?? 0;
      total += plenoExtra;
      return total;
    }

    // Si no es full y la categoría no incluye todas las disciplinas
    if (!category?.includesAllDisciplines && Array.isArray(member.disciplines)) {
      member.disciplines.forEach((disc) => {
        total += getDisciplineFee(disc);
      });
    }

    return total;
  };

  // 🧍‍♂️ Cuota titular
  const mainUserFee = useMemo(
    () => getMemberFee(loguedUserInformation),
    [loguedUserInformation, categories, disciplines, getMemberFee]
  );

  // 👨‍👩‍👧 Cuotas familiares
  const familyFees = useMemo(() => {
    if (!loguedUserInformation?.familyGroup) return [];
    return loguedUserInformation.familyGroup.map((member) => ({
      member,
      fee: getMemberFee(member),
    }));
  }, [loguedUserInformation, categories, disciplines]);

  // 💰 Total general
  const total = useMemo(() => {
    const familyTotal = familyFees.reduce((acc, f) => acc + f.fee, 0);
    return mainUserFee + familyTotal;
  }, [mainUserFee, familyFees]);

  // 📊 Desglose
  const breakdown = useMemo(
    () => ({
      titular: {
        name: `${loguedUserInformation?.name || ""} ${loguedUserInformation?.lastName || ""}`,
        category: loguedUserInformation?.category,
        disciplines: loguedUserInformation?.disciplines || [],
        full: loguedUserInformation?.full || false,
        fee: mainUserFee,
      },
      familiares: familyFees.map((f) => ({
        name: `${f.member.name} ${f.member.lastName}`,
        category: f.member.category,
        disciplines: f.member.disciplines,
        full: f.member.full || false,
        fee: f.fee,
      })),
      total,
    }),
    [loguedUserInformation, mainUserFee, familyFees, total]
  );
console.log(loguedUserInformation)
  console.log("💵 TITULAR:", mainUserFee);
  console.log("👨‍👩‍👧 FAMILIA:", familyFees);
  console.log("💰 TOTAL:", total);
  console.log("📊 BREAKDOWN:", breakdown);

  return (
    <FeesContext.Provider value={{ mainUserFee, familyFees, total, breakdown }}>
      {children}
    </FeesContext.Provider>
  );
};

export default FeesProvider;


