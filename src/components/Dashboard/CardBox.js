import { Card, CardContent, Typography } from "@mui/material";
import { BarChart, Bar } from "recharts";

const CardBox = ({ label, total, color }) => {
  return (
    <Card>
      <CardContent>
        <Typography component="span" variant="h3">
          {label}
        </Typography>
      </CardContent>
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography component="span" variant="h2">
          {total}
        </Typography>
        <BarChart width={150} height={70} data={getRandomData()}>
          <Bar dataKey="value" fill={color} radius={10} barSize={10} />
        </BarChart>
      </CardContent>
    </Card>
  );
};
function getRandomData() {
  return Array(7)
    .fill()
    .map(() => ({ value: Math.floor(Math.random() * 10) + 1 }));
}
export default CardBox;
