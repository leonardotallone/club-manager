    //   {nested.nested_1 ? <>
    //                             <Typography sx={{ fontWeight: 800, fontSize: 16, color: '#616161', textDecoration: 'none', mb: -2 }}>
    //                                 Familiar 1
    //                             </Typography>
    //                             <Grid size={12} sx={{ mt: 2 }}>
    //                                 <Form>
    //                                     <Grid container columnSpacing={2} direction="row">
    //                                         {/* Columna IZQUIERDA */}
    //                                         <Grid container direction="column" size={4}>

    //                                             {/* AVATAR */}

    //                                             <Avatar alt="Avatar" src={avatar1} sx={{ width: 100, height: 100, ml: 0, boxShadow: 1 }} />

    //                                             {/* NAME */}
    //                                             <TextField
    //                                                 // margin="normal"
    //                                                 // autoFocus
    //                                                 // id="standard-basic" 

    //                                                 variant="standard"
    //                                                 fullWidth
    //                                                 name="name_1"
    //                                                 label="Nombre"
    //                                                 type="name_1"
    //                                                 id="name_1"
    //                                                 autoComplete="name_1"
    //                                                 value={values.name_1}
    //                                                 onChange={handleChange}
    //                                                 onBlur={handleBlur}
    //                                                 error={touched.name_1 && Boolean(errors.name_1)}
    //                                                 // helperText={touched.name && errors.name}
    //                                                 helperText={touched.name_1 && errors.name_1 ? errors.name_1 : " "} // 
    //                                                 sx={{ mt: 0 }}
    //                                                 slotProps={{
    //                                                     input: {
    //                                                         sx: {
    //                                                             "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    //                                                                 borderColor: "#b71c1c",
    //                                                             },
    //                                                             "&:hover .MuiOutlinedInput-notchedOutline": {
    //                                                                 borderColor: "#b71c1c",
    //                                                             },
    //                                                         },
    //                                                     },
    //                                                     inputLabel: {
    //                                                         sx: {
    //                                                             "&.Mui-focused": {
    //                                                                 color: "#b71c1c",
    //                                                             },
    //                                                         },
    //                                                     },
    //                                                 }}
    //                                             />
    //                                             {/* LASTNAME */}
    //                                             <TextField
    //                                                 // margin="normal"
    //                                                 fullWidth
    //                                                 variant="standard"
    //                                                 name="lastName_1"
    //                                                 label="Apellido/s"
    //                                                 type="lastName_1"
    //                                                 id="lastName_1"
    //                                                 autoComplete="lastName_!"
    //                                                 value={values.lastName_1}
    //                                                 onChange={handleChange}
    //                                                 onBlur={handleBlur}
    //                                                 error={touched.lastName_1 && Boolean(errors.lastName_1)}
    //                                                 helperText={touched.lastName_1 && errors.lastName_1 ? errors.lastName_1 : " "} // 
    //                                                 sx={{ mt: 0 }}
    //                                                 slotProps={{
    //                                                     input: {
    //                                                         sx: {
    //                                                             "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    //                                                                 borderColor: "#b71c1c",
    //                                                             },
    //                                                             "&:hover .MuiOutlinedInput-notchedOutline": {
    //                                                                 borderColor: "#b71c1c",
    //                                                             },
    //                                                         },
    //                                                     },
    //                                                     inputLabel: {
    //                                                         sx: {
    //                                                             "&.Mui-focused": {
    //                                                                 color: "#b71c1c",
    //                                                             },
    //                                                         },
    //                                                     },
    //                                                 }}
    //                                             />
    //                                         </Grid>
    //                                         {/* Columna CENTRO */}
    //                                         <Grid container direction="column" size={4}>
    //                                             <Grid container  >
    //                                                 {/* BIRTHDATE */}
    //                                                 <Grid size={6} >
    //                                                     <LocalizationProvider dateAdapter={AdapterDayjs} >
    //                                                         <DemoContainer components={['DatePicker']} sx={{ width: '100%' }} >

    //                                                             <DatePicker
    //                                                                 format="DD/MM/YYYY"
    //                                                                 label="Fecha de Nacimiento"
    //                                                                 value={values.birthDate_1} // This should now be a Dayjs object
    //                                                                 onChange={(newValue) => {
    //                                                                     handleChange({ target: { name: 'birthDate_1', value: newValue } }); // Update Formik state
    //                                                                 }}
    //                                                                 slotProps={{
    //                                                                     textField: {
    //                                                                         onBlur: () => handleBlur({ target: { name: 'birthDate_1' } }),
    //                                                                         InputLabelProps: {
    //                                                                             style: {
    //                                                                                 color: touched.birthDate_1 && errors.birthDate_1 ? "#b71c1c" : undefined,
    //                                                                             },
    //                                                                         },
    //                                                                         sx: {
    //                                                                             width: '100%',
    //                                                                             "& .MuiOutlinedInput-notchedOutline": {
    //                                                                                 borderColor: touched.birthDate_1 && errors.birthDate_1 ? "#b71c1c" : undefined,
    //                                                                             },
    //                                                                             "& .MuiInputLabel-root": {
    //                                                                                 "&.Mui-focused": {
    //                                                                                     color: "#b71c1c",
    //                                                                                 },
    //                                                                             },
    //                                                                             "& .MuiOutlinedInput-root": {
    //                                                                                 "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    //                                                                                     borderColor: "#b71c1c",
    //                                                                                 },
    //                                                                                 "&:hover .MuiOutlinedInput-notchedOutline": {
    //                                                                                     borderColor: "#b71c1c",
    //                                                                                 },
    //                                                                             },
    //                                                                         },
    //                                                                     },
    //                                                                 }}
    //                                                             />

    //                                                         </DemoContainer>
    //                                                         {touched.birthDate_1 && errors.birthDate_1 ?
    //                                                             <Typography color="error" variant="caption" sx={{ fontSize: '0.75rem' }} >
    //                                                                 {errors.birthDate_1 as string}
    //                                                             </Typography> : <span> &nbsp; </span>
    //                                                         }
    //                                                     </LocalizationProvider>
    //                                                 </Grid>
    //                                                 {/* GENDER */}
    //                                                 <Grid size={6} >
    //                                                     <FormControl fullWidth sx={{ mb: 0, mt: 1 }}>
    //                                                         <InputLabel
    //                                                             id="demo-simple-select-label"
    //                                                             error={touched.gender_1 && Boolean(errors.gender_1)}
    //                                                             sx={{
    //                                                                 "&.Mui-focused": {
    //                                                                     color: "#b71c1c", // Ensure label color changes when focused

    //                                                                 },
    //                                                             }}>Genero</InputLabel>
    //                                                         <Select
    //                                                             labelId="gender-label"
    //                                                             id="gender_1"
    //                                                             name="gender_1"
    //                                                             value={values.gender_1}
    //                                                             onChange={(event) => {
    //                                                                 handleChange({ target: { name: 'gender_1', value: event.target.value } }); // Correctly update Formik state
    //                                                             }}
    //                                                             onBlur={handleBlur}
    //                                                             label="Género"
    //                                                             sx={{
    //                                                                 "& .MuiOutlinedInput-notchedOutline": {
    //                                                                     borderColor: touched.gender_1 && errors.gender_1 ? "#b71c1c" : undefined,
    //                                                                 },
    //                                                                 "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    //                                                                     borderColor: "#b71c1c", // Change border color when focused
    //                                                                 },
    //                                                                 "&:hover .MuiOutlinedInput-notchedOutline": {
    //                                                                     borderColor: "#b71c1c", // Change border color on hover
    //                                                                 },
    //                                                             }}

    //                                                         >
    //                                                             {genders?.length > 0 ? (
    //                                                                 genders.map((name) => (
    //                                                                     <MenuItem key={name} value={name}>
    //                                                                         {name}
    //                                                                     </MenuItem>
    //                                                                 ))
    //                                                             ) : (
    //                                                                 <p>Cargando Generos...</p>
    //                                                             )}

    //                                                         </Select>
    //                                                         {touched.gender_1 && errors.gender_1 ?
    //                                                             <Typography color="error" variant="caption">
    //                                                                 {errors.gender_1}
    //                                                             </Typography> : <span> &nbsp; </span>
    //                                                         }
    //                                                     </FormControl>
    //                                                 </Grid>
    //                                             </Grid>
    //                                             {/* DNI */}
    //                                             <TextField
    //                                                 // margin="none"
    //                                                 fullWidth
    //                                                 name="dni_1"
    //                                                 label="DNI"
    //                                                 type="dni_1"
    //                                                 id="dni_1"
    //                                                 autoComplete="dni_1"
    //                                                 value={values.dni_1}
    //                                                 onChange={handleChange}
    //                                                 onBlur={handleBlur}
    //                                                 error={touched.dni_1 && Boolean(errors.dni_1)}
    //                                                 helperText={touched.dni_1 && errors.dni_1 ? errors.dni_1 : " "}
    //                                                 sx={{ mt: -2 }}
    //                                                 slotProps={{
    //                                                     input: {
    //                                                         sx: {
    //                                                             "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    //                                                                 borderColor: "#b71c1c",
    //                                                             },
    //                                                             "&:hover .MuiOutlinedInput-notchedOutline": {
    //                                                                 borderColor: "#b71c1c",
    //                                                             },
    //                                                         },
    //                                                     },
    //                                                     inputLabel: {
    //                                                         sx: {
    //                                                             "&.Mui-focused": {
    //                                                                 color: "#b71c1c",
    //                                                             },
    //                                                         },
    //                                                     },
    //                                                 }}
    //                                             />
    //                                             {/* ADDRESS */}
    //                                             <TextField
    //                                                 // margin="none"

    //                                                 fullWidth
    //                                                 name="address_1"
    //                                                 label="Domicilio"
    //                                                 type="address_1"
    //                                                 id="address_1"
    //                                                 autoComplete="address_1"
    //                                                 value={values.address_1}
    //                                                 onChange={handleChange}
    //                                                 onBlur={handleBlur}
    //                                                 error={touched.address_1 && Boolean(errors.address_1)}
    //                                                 helperText={touched.address_1 && errors.address_1 ? errors.address_1 : " "}
    //                                                 sx={{ mt: 1 }}
    //                                                 slotProps={{
    //                                                     input: {
    //                                                         sx: {
    //                                                             "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    //                                                                 borderColor: "#b71c1c",
    //                                                             },
    //                                                             "&:hover .MuiOutlinedInput-notchedOutline": {
    //                                                                 borderColor: "#b71c1c",
    //                                                             },
    //                                                         },
    //                                                     },
    //                                                     inputLabel: {
    //                                                         sx: {
    //                                                             "&.Mui-focused": {
    //                                                                 color: "#b71c1c",
    //                                                             },
    //                                                         },
    //                                                     },
    //                                                 }}
    //                                             />
    //                                             {/* CONTACT NUMBER */}
    //                                             <TextField
    //                                                 // margin="normal"
    //                                                 fullWidth
    //                                                 name="contactNumber_1"
    //                                                 label="Número de Contacto"
    //                                                 type="contactNumber_1"
    //                                                 id="contactNumber_1"
    //                                                 autoComplete="contactNumber_1"
    //                                                 value={values.contactNumber_1}
    //                                                 onChange={handleChange}
    //                                                 onBlur={handleBlur}
    //                                                 error={touched.contactNumber_1 && Boolean(errors.contactNumber_1)}
    //                                                 helperText={touched.contactNumber_1 && errors.contactNumber_1 ? errors.contactNumber_1 : " "}
    //                                                 sx={{ mt: 1 }}
    //                                                 slotProps={{
    //                                                     input: {
    //                                                         sx: {
    //                                                             "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    //                                                                 borderColor: "#b71c1c",
    //                                                             },
    //                                                             "&:hover .MuiOutlinedInput-notchedOutline": {
    //                                                                 borderColor: "#b71c1c",
    //                                                             },
    //                                                         },
    //                                                     },
    //                                                     inputLabel: {
    //                                                         sx: {
    //                                                             "&.Mui-focused": {
    //                                                                 color: "#b71c1c",
    //                                                             },
    //                                                         },
    //                                                     },
    //                                                 }}
    //                                             />
    //                                         </Grid>
    //                                         {/* Columna DERECHA */}
    //                                         <Grid container direction="column" size={4} sx={{ mt: 0 }}>
    //                                             <Grid container size={12} >
    //                                                 {/* DISCIPLINE */}
    //                                                 <FormControl fullWidth sx={{ mb: 0, mt: 1 }}>
    //                                                     <InputLabel
    //                                                         id="demo-multiple-chip-label"
    //                                                         sx={{
    //                                                             "&.Mui-focused": {
    //                                                                 color: "#b71c1c", // Ensure label color changes when focused
    //                                                             },
    //                                                         }}>Disciplinas</InputLabel>
    //                                                     <Select

    //                                                         labelId="demo-multiple-chip-label"
    //                                                         id="demo-multiple-chip"
    //                                                         multiple

    //                                                         value={discipline_1}
    //                                                         onChange={(event) => {
    //                                                             handleDiscipline(event);
    //                                                             handleChange({ target: { name: 'discipline_1', value: event.target.value } });
    //                                                         }}
    //                                                         sx={{
    //                                                             "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    //                                                                 borderColor: "#b71c1c", // Change border color when focused
    //                                                             },
    //                                                             "&:hover .MuiOutlinedInput-notchedOutline": {
    //                                                                 borderColor: "#b71c1c", // Change border color on hover
    //                                                             },
    //                                                             height: '56px',
    //                                                         }}
    //                                                         input={<OutlinedInput id="select-multiple-chip" label="Disciplinas" />}
    //                                                         renderValue={(selected) => (
    //                                                             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
    //                                                                 {selected.map((value) => (
    //                                                                     <Chip key={value} label={value} />
    //                                                                 ))}
    //                                                             </Box>
    //                                                         )}
    //                                                         MenuProps={MenuProps}
    //                                                     >
    //                                                         {disciplines?.length > 0 ? (
    //                                                             disciplines.map((item: any) => (
    //                                                                 <MenuItem
    //                                                                     key={item.id}
    //                                                                     value={item.name}
    //                                                                     style={getStyles(item.name, discipline_1, theme)}
    //                                                                 >
    //                                                                     <Checkbox checked={discipline_1.indexOf(item.name) > -1} />
    //                                                                     <ListItemText primary={item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()} />
    //                                                                 </MenuItem>
    //                                                             ))
    //                                                         ) : (
    //                                                             <p>Cargando disciplinas...</p>
    //                                                         )}

    //                                                     </Select>
    //                                                     {touched.disciplines && errors.disciplines ?
    //                                                         <Typography color="error" variant="caption" >
    //                                                             {/* {errors.disciplines} */}
    //                                                         </Typography> : <span> &nbsp; </span>
    //                                                     }
    //                                                 </FormControl>
    //                                                 {/* CATEGORIES */}
    //                                                 <Grid size={12} >
    //                                                     <FormControl fullWidth sx={{ mb: 0, mt: 0 }}>
    //                                                         <InputLabel
    //                                                             error={touched.category && Boolean(errors.category)}
    //                                                             id="demo-simple-select-label"
    //                                                             sx={{
    //                                                                 "&.Mui-focused": {
    //                                                                     color: "#b71c1c", // Ensure label color changes when focused
    //                                                                 },
    //                                                             }}>Categoria</InputLabel>
    //                                                         <Select


    //                                                             name="category"
    //                                                             onBlur={handleBlur}

    //                                                             sx={{
    //                                                                 "& .MuiOutlinedInput-notchedOutline": {
    //                                                                     borderColor: touched.category_1 && errors.category_1 ? "#b71c1c" : undefined,
    //                                                                 },
    //                                                                 "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    //                                                                     borderColor: "#b71c1c", // Change border color when focused
    //                                                                 },
    //                                                                 "&:hover .MuiOutlinedInput-notchedOutline": {
    //                                                                     borderColor: "#b71c1c", // Change border color on hover
    //                                                                 },
    //                                                             }}


    //                                                             labelId="demo-simple-select-label"
    //                                                             id="demo-simple-select"
    //                                                             value={values.category_1} // Bind Formik value
    //                                                             label="Categoria" // Update label to match the field
    //                                                             onChange={(event) => {
    //                                                                 handleChange({ target: { name: 'category_1', value: event.target.value } }); // Correctly update Formik state
    //                                                             }}

    //                                                         >
    //                                                             {categories?.length > 0 ? (
    //                                                                 categories.map(({ id, name }) => (
    //                                                                     <MenuItem key={id} value={name}>
    //                                                                         {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
    //                                                                     </MenuItem>
    //                                                                 ))
    //                                                             ) : (
    //                                                                 <p>Cargando Categorias...</p>
    //                                                             )}

    //                                                         </Select>
    //                                                         {touched.category && errors.category ?
    //                                                             <Typography color="error" variant="caption">
    //                                                                 {errors.category}
    //                                                             </Typography> : <span> &nbsp; </span>
    //                                                         }
    //                                                     </FormControl>
    //                                                 </Grid>


    //                                             </Grid>
    //                                         </Grid>

    //                                     </Grid>
    //                                 </Form>
    //                             </Grid>
    //                         </>
    //                             : null}
