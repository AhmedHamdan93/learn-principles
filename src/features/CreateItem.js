import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextField, Button, Stack, Typography } from "@mui/material";
import { supabase } from "../supabaseClient";

const schema = z.object({
  name: z.string().min(3, "Name is required and must be at least 3 characters."),
  description: z.string().min(5, "Description must be at least 5 characters."),
});

export default function CreateItem() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    const { error } = await supabase.from("items").insert([data]);
    if (!error) {
      reset();
    } else {
      alert(error.message);
    }
  };

  return (
    <Stack spacing={2} maxWidth={500}>
      <Typography variant="h5">Create New Item</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            label="Name"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
          />
          <TextField
            label="Description"
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
            fullWidth
            multiline
            rows={4}
          />
          <Button variant="contained" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
