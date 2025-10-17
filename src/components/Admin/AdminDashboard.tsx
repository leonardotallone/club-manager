import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
} from "recharts";

const AdminDashboard = () => {
    const metrics = {
        totalUsers: 120,
        totalApplications: 8,
        males: 75,
        females: 45,
        individual: 75,
        family: 25,
        totalFee: 240000,
        paid: 180000,
        pending: 60000,
    };

    const palette = {
        accent: "#2E7D32",
        grayDark: "rgba(0,0,0,0.75)",
        grayLight: "rgba(0,0,0,0.45)",
        neutralBg: "#F9F9F9",
        black: "#000000",
    };

    const membershipData = [
        { name: "Individuales", value: metrics.individual },
        { name: "Familiares", value: metrics.family },
    ];

    const paymentsData = [
        { name: "Total a cobrar", value: metrics.totalFee, fill: "rgba(46,125,50,0.3)" },
        { name: "Cobrado", value: metrics.paid, fill: "rgba(46,125,50,0.6)" },
        { name: "Pendiente", value: metrics.pending, fill: "rgba(46,125,50,1)" },
    ];

    const kpiData = [
        { label: "Total socios", value: metrics.totalUsers },
        { label: "Solicitudes pendientes", value: metrics.totalApplications },
        { label: "Hombres", value: metrics.males },
        { label: "Mujeres", value: metrics.females },
    ];

    const sportsCategoriesData = [
        { name: "Fútbol", value: 40 },
        { name: "Tenis", value: 30 },
        { name: "Hockey", value: 50 },
    ];

    const memberCategoriesData = [
        { name: "Activo", value: 60 },
        { name: "Menor", value: 20 },
        { name: "Adherente", value: 15 },
        { name: "Plenos", value: 25 },
    ];

    const sportsColors = ["rgba(46,125,50,0.8)", "rgba(198,40,40,0.8)", "rgba(255,167,38,0.8)"];
    const memberColors = ["rgba(46,125,50,0.8)", "rgba(198,40,40,0.8)", "rgba(255,167,38,0.8)", "rgba(76,175,80,0.8)"];




    return (
        <Box sx={{ p: 3, borderRadius: 2, backgroundColor: "white" }}>
            {/* Panel de control alineado izquierda */}
            <Typography
                variant="h6"
                sx={{
                    mb: 3,
                    fontWeight: 600,
                    color: palette.grayDark,
                    letterSpacing: 0.3,
                    textAlign: "left",
                }}
            >
                Panel de control del club
            </Typography>

            {/* KPIs centrados */}
            <Grid container justifyContent="center" spacing={2} sx={{ mb: 4, textAlign: "center" }}>
                {kpiData.map((item, index) => (
                    <Grid size={{ xs: 6, sm: 3, md: 2.5 }} key={index}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 0.5,
                            }}
                        >
                            <Box sx={{ width: 70, height: 70 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie

                                            data={[
                                                { value: item.value, fill: palette.accent },
                                                { value: 100 - item.value, fill: "#E0E0E0" },
                                            ]}
                                            dataKey="value"
                                            innerRadius={25}
                                            outerRadius={32}
                                            startAngle={90}
                                            endAngle={-270}
                                            stroke="none"

                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </Box>
                            <Typography sx={{ color: palette.grayDark, fontSize: 13, fontWeight: 500 }}>
                                {item.label}
                            </Typography>
                            <Typography sx={{ color: palette.grayDark, fontSize: 17, fontWeight: 600 }}>
                                {item.value}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            <Divider sx={{ my: 3, opacity: 0.8 }} />

            {/* Tres gráficos circulares alineados */}
            <Grid container spacing={2} justifyContent="center">
                {/* Tipo de membresía */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{ height: 260 }}>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                mb: 1,
                                fontWeight: 600,
                                color: palette.black,
                                textAlign: "left",
                            }}
                        >
                            Tipo de membresía
                        </Typography>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={membershipData}
                                    dataKey="value"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={70}
                                    label={({ name, value }) => `${name}: ${value}`}
                                    labelLine={{ stroke: palette.black }}
                                    fill={palette.black}

                                >
                                    <Cell fill="rgba(46,125,50,0.7)" />
                                    <Cell fill="rgba(198,40,40,0.8)" />
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Box>
                </Grid>

                {/* Distribución deporte */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{ height: 260 }}>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                mb: 1,
                                fontWeight: 600,
                                color: palette.black,
                                textAlign: "left",
                            }}
                        >
                            Distribución por deporte
                        </Typography>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={sportsCategoriesData}
                                    dataKey="value"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={70}
                                    label={({ name, value }) => `${name}: ${value}`}
                                    labelLine={{ stroke: palette.black }}
                                >
                                    {sportsCategoriesData.map((entry, index) => (
                                        <Cell
                                            key={`cell-sport-${index}`}
                                            fill={sportsColors[index % sportsColors.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Box>
                </Grid>

                {/* Categorías de socios */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{ height: 260 }}>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                mb: 1,
                                fontWeight: 600,
                                color: palette.black,
                                textAlign: "left",
                            }}
                        >
                            Categorías de socios
                        </Typography>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={memberCategoriesData}
                                    dataKey="value"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={70}
                                    label={({ name, value }) => `${name}: ${value}`}
                                    labelLine={{ stroke: palette.black }}
                                >
                                    {memberCategoriesData.map((entry, index) => (
                                        <Cell
                                            key={`cell-member-${index}`}
                                            fill={memberColors[index % memberColors.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Box>
                </Grid>
            </Grid>

            {/* Estado de cuenta (BarChart separado) */}
            <Divider sx={{ my: 5, opacity: 0.8 }} />

            <Box sx={{ height: 300 }}>
                <Typography
                    variant="subtitle2"
                    sx={{
                        mb: 1,
                        fontWeight: 600,
                        color: palette.black,
                        textAlign: "left",
                    }}
                >
                    Estado de cuenta
                </Typography>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={paymentsData}>
                        <XAxis
                            dataKey="name"
                            tick={{ fill: palette.grayLight, fontSize: 12 }}
                            axisLine={false}
                        />
                        <YAxis
                            tick={{ fill: palette.grayLight, fontSize: 12 }}
                            axisLine={false}
                        />
                        <Tooltip />
                        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                            {paymentsData.map((entry, index) => (
                                <Cell key={`bar-${index}`} fill={entry.fill} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
};

export default AdminDashboard;
