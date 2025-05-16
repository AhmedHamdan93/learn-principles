import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { Typography, Paper, Box } from "@mui/material";

export default function ItemView() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    supabase.from("items").select("*").eq("id", id).single().then(({ data }) => {
      setItem(data);
    });
  }, [id]);

  if (!item) return <Typography>Loading...</Typography>;

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5">{item.name}</Typography>
      <Box mt={2}>
        <Typography variant="body1">{item.description}</Typography>
        <Typography variant="caption" display="block" mt={1}>
          Created: {new Date(item.created_at).toLocaleString()}
        </Typography>
      </Box>
    </Paper>
  );
}
