import Router from './routes/routes';
import './App.css';
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import Alert from "@mui/material/Alert";

function App() {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <Router />
    </AlertProvider>
  );
}
const options = {
  position: positions.BOTTOM_RIGHT,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

const AlertTemplate = ({ style, options, message, close }) => (
  <div style={style}>
    <Alert severity={options?.type} onClose={close}>
      {message}
    </Alert>
  </div>
);

export default App;
