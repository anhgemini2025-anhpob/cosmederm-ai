import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CosmeDerm AI Academy",
    short_name: "CosmeDerm",
    description:
      "Ứng dụng học tập da liễu thẩm mỹ và khoa học mỹ phẩm — tra cứu thành phần, phòng lab công thức ảo và routine chăm sóc cá nhân hóa.",
    start_url: "/",
    display: "standalone",
    background_color: "#FCFCFD",
    theme_color: "#0A3161",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
