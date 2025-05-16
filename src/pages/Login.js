import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (!error) navigate("/");
    else alert(error.message);
  };

  return (
    <Box maxWidth={400} mx="auto" mt={10}>
      <Typography variant="h5" gutterBottom>Log In</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth margin="normal" label="Email" type="email"
          {...register("email", { required: "Email is required" })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          fullWidth margin="normal" label="Password" type="password"
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
          Log In
        </Button>
      </form>
    </Box>
  );
}
