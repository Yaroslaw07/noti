import { Box, Container, Stack, Typography } from "@mui/material";
import { Icons } from "../Icons";
import TextArea from "../ui/TextArea";
import useCurrentNote from "@/hooks/useCurrentNote";

const Note = () => {

  const {note, status} = useCurrentNote();

  return (
    <Container component="main" maxWidth="md" sx={{ height: "90%" }}>
       <Box sx={{height:"80px"}}></Box>
       <Typography variant="h3" sx={{fontWeight:"600",marginBottom:"20px"}}>{note?.title!}</Typography>
       <TextArea></TextArea>
    </Container>
  );
};

export default Note;
