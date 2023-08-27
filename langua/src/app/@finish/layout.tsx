import { Container } from "@mui/material";



export default function FinishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <main className="flex h-screen ">
        <Container className="!flex items-center justify-center"> 
            {children}
        </Container>
      </main>

  );
}
