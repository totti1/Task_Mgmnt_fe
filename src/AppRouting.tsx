import {
  Routes,
  Route,
} from "react-router-dom";
import { Auth } from "./components";


function AppRouting() {

  return (
    <Routes>
      <Route path="/" element={<Auth />} />
    </Routes>
  );
}
export default AppRouting;
