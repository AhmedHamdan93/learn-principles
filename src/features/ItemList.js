import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ItemList() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();

    const channel = supabase
      .channel("realtime-items")
      .on("postgres_changes", { event: "*", schema: "public", table: "items" }, () => {
        fetchItems(); // re-fetch when items change
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase.from("items").select("*").order("created_at", { ascending: false });
    if (!error) setItems(data);
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>Item List</Typography>
      <List>
        {items.map(item => (
          <ListItem key={item.id} button onClick={() => navigate(`/view/${item.id}`)}>
            <ListItemText primary={item.name} secondary={item.description} />
          </ListItem>
        ))}
      </List>
    </>
  );
}
