import React, { createContext, useContext, useMemo } from "react";
import { getAllUsersContext } from "./GetAllUsersContext";
import { getAllCategoriesContext } from "./GetAllCategoriesContext";
import { getAllDisciplinesContext } from "./GetAllDisciplinesContext";

export const FeesContext = createContext(null);

const FeesProvider = ({ children }) => {
  const { loguedUserInformation } = useContext(getAllUsersContext);
  const { categories } = useContext(getAllCategoriesContext);
  const { disciplines } = useContext(getAllDisciplinesContext);

  // 🧭 Buscar categoría por id o nombre (normalizado)
  const getCategory = (identifier) => {
    if (!categories || !identifier) return null;
    const normalized = identifier.toLowerCase().trim();

    return categories.find((c) => {
      const id = c.id?.toLowerCase().trim();
      const name = c.name?.toLowerCase().trim();
      return id === normalized || name === normalized;
    });
  };

  // 🔍 Buscar disciplina y devolver su fee
  const getDisciplineFee = (discName) => {
    if (!disciplines || !discName) return 0;
    const normalized = discName.toLowerCase().trim();
    const d = disciplines.find(
      (disc) => disc.name?.toLowerCase().trim() === normalized
    );
    return d?.fee ?? 0;
  };

  // ⚙️ Buscar la categoría especial "Pleno-Flag"
  const pleno = categories?.find(
    (c) => c.id === "Pleno-Flag" || c.name?.toLowerCase().includes("pleno")
  );

  // 💵 Cálculo individual
  const getMemberFee = (member) => {
    if (!member || !member.category) return 0;

    // Buscar categoría base
    const category = getCategory(member.category);
    const baseFee = category?.baseFee ?? 0;
    let total = baseFee;

    // 🟩 Si es “Pleno” → sumar extra según la categoría
    if (member.full) {
      // Buscar el valor adicional dentro del doc Pleno-Flag
      // Ej: pleno?.["Activo"] o pleno?.["Adherente Adulto"]
      const normalizedCategory = member.category?.trim();
      const plenoExtra =
        pleno?.[normalizedCategory] ??
        pleno?.baseFee ??
        pleno?.fee ??
        0;

      total += plenoExtra;
      return total; // No suma disciplinas
    }

    // 🟨 Si NO es pleno → sumar disciplinas
    if (Array.isArray(member.disciplines)) {
      member.disciplines.forEach((disc) => {
        total += getDisciplineFee(disc);
      });
    }

    return total;
  };

  // 🧍‍♂️ Cuota titular
  const mainUserFee = useMemo(() => {
    return getMemberFee(loguedUserInformation);
  }, [loguedUserInformation, categories, disciplines]);

  // 👨‍👩‍👧 Cuotas familiares
  // const familyFees = useMemo(() => {
  //   if (!loguedUserInformation?.familyGroup) return [];
  //   return loguedUserInformation.familyGroup.map((member) => ({
  //     member,
  //     fee: getMemberFee(member),
  //   }));
  // }, [loguedUserInformation, categories, disciplines]);


  const familyFees = useMemo(() => {
    const group = loguedUserInformation?.familyGroup;

    if (!Array.isArray(group)) return [];

    return group.map((member) => ({
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
        name: `${loguedUserInformation?.name || ""} ${loguedUserInformation?.lastName || ""
          }`,
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

  // 🧾 Logs para depurar
  // console.group("💰 FEES CONTEXT DEBUG");
  // console.log("🧍 TITULAR:", loguedUserInformation);
  // console.log("💵 TITULAR FEE:", mainUserFee);
  // console.log("👨‍👩‍👧 FAMILIA:", familyFees);
  // console.log("💰 TOTAL:", total);
  // console.log("📊 BREAKDOWN:", breakdown);
  // console.groupEnd();

  return (
    <FeesContext.Provider value={{ mainUserFee, familyFees, total, breakdown }}>
      {children}
    </FeesContext.Provider>
  );
};

export default FeesProvider;
