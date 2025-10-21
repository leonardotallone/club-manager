import React from "react";
import {
  Box,
  Typography,
  Grid,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboardModern = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // 📊 Datos simulados
  const metrics = {
    totalUsers: 120,
    totalApplications: 8,
    males: 70,
    females: 50,
    totalFee: 240000,
    paid: 180000,
    pending: 60000,
    categories: [
      { name: "Activo", value: 60 },
      { name: "Menor", value: 25 },
      { name: "Adherente", value: 20 },
      { name: "Pleno", value: 15 },
    ],
    disciplines: [
      { name: "Fútbol", value: 40 },
      { name: "Tenis", value: 25 },
      { name: "Hockey", value: 30 },
      { name: "Pileta", value: 25 },
    ],
  };

  // 🎨 Paleta moderna
  const palette = {
    text: "#1A1A1A",
    gray: "#666666",
    blue: "#4A90E2",
    pink: "#E57373",
    mint: "#80CBC4",
    lilac: "#B39DDB",
    accent: "#FDD835",
  };

  const colors = [
    palette.blue,
    palette.pink,
    palette.mint,
    palette.lilac,
    palette.accent,
  ];

  // 📈 Totales para cálculos de %
  const genderData = [
    { name: "Hombres", value: metrics.males },
    { name: "Mujeres", value: metrics.females },
  ];
  const totalGender = genderData.reduce((a, b) => a + b.value, 0);
  const categoryTotal = metrics.categories.reduce((a, b) => a + b.value, 0);
  const disciplineTotal = metrics.disciplines.reduce((a, b) => a + b.value, 0);
  const paymentPercent = Math.round((metrics.paid / metrics.totalFee) * 100);

  // 🧩 Reutilizable: render de donut + leyenda
  const DonutWithLegend = ({
    title,
    data,
    total,
  }: {
    title: string;
    data: { name: string; value: number }[];
    total: number;
  }) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: { xs: "column", md: "row" },
        gap: 3,
        width: "100%",
      }}
    >
      {/* 🥧 Donut */}
      <Box sx={{ width: 250, height: 250 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              labelLine={false}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      {/* 🧾 Leyenda personalizada */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 1,
            fontFamily: '"Outfit", sans-serif',
            fontWeight: 600,
            color: palette.text,
          }}
        >
          {title}
        </Typography>
        {data.map((item, i) => {
          const numericValue = Number(item.value) || 0;
          const percent = ((numericValue / total) * 100).toFixed(1);
          return (
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.2,
                fontFamily: '"Outfit", sans-serif',
              }}
            >
              <Box
                sx={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  backgroundColor: colors[i % colors.length],
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#1A1A1A",
                }}
              >
                {`${item.name}: ${numericValue}`}
                <Typography
                  component="span"
                  sx={{
                    ml: 0.8,
                    fontSize: 13,
                    fontWeight: 400,
                    color: "#666",
                  }}
                >
                  ({percent}%)
                </Typography>
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );

  // 🎯 Render principal
  return (
    <Box
      sx={{
        width: "100%",
        px: { xs: 2, md: 8 },
        py: { xs: 4, md: 6 },
        fontFamily: '"Outfit", sans-serif',
        color: palette.text,
      }}
    >
      {/* 🏁 Título */}
      <Typography
        variant={isMobile ? "h5" : "h4"}
        sx={{
          mb: 6,
          fontWeight: 700,
          color: palette.text,
          textAlign: "left",
          letterSpacing: "-0.5px",
        }}
      >
        Panel de Control del Club
      </Typography>

      {/* 🔸 Totales principales mejorados */}
      <Grid
        container
        spacing={isMobile ? 3 : 6}
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ mb: 8 }}
      >
        {[
          { label: "Total de Socios", value: metrics.totalUsers, color: palette.mint },
          { label: "Solicitudes Pendientes", value: metrics.totalApplications, color: palette.pink },
        ].map((kpi, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Box
              sx={{
                transform: "translateY(10px)",
                opacity: 0,
                animation: "fadeUp 0.8s ease forwards",
                "@keyframes fadeUp": {
                  to: { transform: "translateY(0)", opacity: 1 },
                },
              }}
            >
              <Typography
                variant={isMobile ? "h3" : "h2"}
                sx={{
                  fontWeight: 700,
                  mb: 0.3,
                  color: "#1A1A1A",
                  fontFamily: '"Outfit", sans-serif',
                  letterSpacing: "-0.02em",
                }}
              >
                {kpi.value}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: palette.gray,
                  fontWeight: 400,
                  fontFamily: '"Outfit", sans-serif',
                  mb: 1,
                }}
              >
                {kpi.label}
              </Typography>

              {/* línea sutil */}
              <Box
                sx={{
                  width: "45px",
                  height: "3px",
                  backgroundColor: kpi.color,
                  borderRadius: 2,
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* 🔹 Tres donuts alineados */}
      <Grid
        container
        spacing={6}
        justifyContent="center"
        alignItems="flex-start"
        sx={{ mb: 6 }}
      >
        <Grid item xs={12} md={4}>
          <DonutWithLegend
            title="Distribución por Género"
            data={genderData}
            total={totalGender}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <DonutWithLegend
            title="Categorías de Socios"
            data={metrics.categories}
            total={categoryTotal}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <DonutWithLegend
            title="Disciplinas"
            data={metrics.disciplines}
            total={disciplineTotal}
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 6 }} />

      {/* 💰 Estado de cuenta */}
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: 600,
          color: palette.text,
          fontFamily: '"Outfit", sans-serif',
        }}
      >
        Estado de Cuenta General
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: palette.gray,
          mb: 1,
          fontFamily: '"Outfit", sans-serif',
        }}
      >
        Cobrado: ${metrics.paid.toLocaleString()} • Pendiente: $
        {metrics.pending.toLocaleString()}
      </Typography>

      <Box
        sx={{
          position: "relative",
          height: 12,
          borderRadius: 6,
          bgcolor: "#E0E0E0",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            height: "100%",
            width: `${paymentPercent}%`,
            bgcolor: palette.mint,
            borderRadius: 6,
            transition: "width 0.6s ease",
          }}
        />
      </Box>

      <Typography
        variant="body2"
        sx={{
          mt: 0.5,
          color: palette.text,
          fontWeight: 500,
          fontFamily: '"Outfit", sans-serif',
        }}
      >
        {paymentPercent}% Cobrado
      </Typography>
    </Box>
  );
};

export default AdminDashboardModern;
