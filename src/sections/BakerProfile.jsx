import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/button.jsx";
export default function BakerProfile() {
  const { bakerId } = useParams();
  const navigate = useNavigate();

  return (
    <div style={{ padding: 40 }}>
      
      <h1>🍰 Pâtisserie Profile</h1>

      <p>ID: {bakerId}</p>

      <Button
        variant="primary"
        onClick={() =>
          navigate(`/cake-builder/${bakerId}?skip=true`)
        }
      >
        Commencer mon gâteau
      </Button>

    </div>
  );
}