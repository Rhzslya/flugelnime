import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
export default function DynamicTitle() {
  const location = useLocation();
  const params = useParams();
  useEffect(() => {
    const path = location.pathname;
    let title = "Flugelnime";

    if (path.includes("/ongoing")) {
      title = "Ongoing - Flugelnime";
    } else if (path.includes("/seasons")) {
      title = "Seasons - Flugelnime";
    } else if (path.includes("/movies")) {
      title = "Movies - Flugelnime";
    } else if (path.includes("/genres")) {
      title = "Genres - Flugelnime";
    } else if (params.id) {
      title = `Detail - ${params.id} Flugelnime`;
    }

    document.title = title;
  }, [location, params]);

  return null;
}
