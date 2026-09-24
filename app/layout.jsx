import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export const metadata = {
  title: "KIMRAYY — Digital Designer & Full-Stack Developer",
  description: "Premium personal portfolio of Kimrayy — crafting polished digital products, interfaces, and experiences.",
  openGraph: { title: "KIMRAYY — Digital Designer & Full-Stack Developer", description: "Selected work, capabilities, and experiments.", type: "website" }
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
