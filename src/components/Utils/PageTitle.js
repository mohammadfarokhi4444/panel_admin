import { Box, Button, Typography } from "@mui/material";

const PageTitle = ({
  title,
  handleNavigate,
  titleButton,
  fontSize = "h3",
  color = "primary.dark",
}) => {
  return (
    <Box
      display="flex"
      sx={{
        pb: "2.5%",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography component="h3" variant={fontSize} color={color}>
        {title}
      </Typography>
      {handleNavigate && (
        <Box
          height="50px"
        >
          <Button
            variant="contained"
            sx={{
              height: "100%",
              minWidth: "200px",
              borderRaduis: "10px",
              backgroundColor: "primary.main",
              fontSize: "20px",
              color: "common.white",
              "&:hover": {
                bgcolor: "primary.main",
              },
            }}
            onClick={handleNavigate}
          >
            {titleButton}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default PageTitle;
